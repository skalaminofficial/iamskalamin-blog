import { BASE_HEADERS, parseCookies, randomToken } from '../../_lib/security.js';

function resultPage(status, content) {
  const nonce = randomToken();
  const message = `authorization:github:${status}:${JSON.stringify(content)}`;
  const messageJs = JSON.stringify(message).replace(/</g, '\\u003c');

  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Authorizing…</title></head><body><p>Authorizing…</p><script nonce="${nonce}">
(function () {
  function receiveMessage(e) {
    window.opener.postMessage(${messageJs}, e.origin);
    window.removeEventListener('message', receiveMessage, false);
    window.close();
  }
  window.addEventListener('message', receiveMessage, false);
  window.opener.postMessage('authorizing:github', '*');
})();
</script></body></html>`;

  return new Response(html, {
    status: status === 'success' ? 200 : 400,
    headers: {
      ...BASE_HEADERS,
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Security-Policy': `default-src 'none'; script-src 'nonce-${nonce}'; base-uri 'none'; frame-ancestors 'none'`,
      // ব্যবহার শেষ, state কুকি মুছে ফেলা
      'Set-Cookie': 'oauth_state=; HttpOnly; Secure; SameSite=Lax; Path=/api/auth; Max-Age=0',
    },
  });
}

const fail = (message) => resultPage('error', { message });

export async function onRequestGet({ request, env }) {
  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
    return fail('Server is not configured: missing GitHub credentials.');
  }

  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const savedState = parseCookies(request.headers.get('Cookie')).oauth_state;

  // CSRF সুরক্ষা: state না মিললে বাতিল
  if (!code || !state || !savedState || state !== savedState) {
    return fail('Invalid or expired login request. Please try again.');
  }

  let token;
  try {
    const res = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'iamskalamin-blog-cms',
      },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: `${url.origin}/api/auth/callback`,
      }),
    });
    const data = await res.json();
    token = data.access_token;
    if (!token) return fail('GitHub did not return an access token.');
  } catch {
    return fail('Could not reach GitHub. Please try again.');
  }

  // ঐচ্ছিক দ্বিতীয় স্তর: শুধু তালিকার GitHub ইউজার ঢুকতে পারবে
  if (env.ALLOWED_GITHUB_USERS) {
    try {
      const res = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
          'User-Agent': 'iamskalamin-blog-cms',
        },
      });
      const user = await res.json();
      const allowed = env.ALLOWED_GITHUB_USERS.split(',')
        .map((u) => u.trim().toLowerCase())
        .filter(Boolean);
      if (!user.login || !allowed.includes(user.login.toLowerCase())) {
        return fail('This GitHub account is not allowed to use the admin panel.');
      }
    } catch {
      return fail('Could not verify your GitHub account.');
    }
  }

  return resultPage('success', { token, provider: 'github' });
}

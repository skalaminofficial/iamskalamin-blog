import { BASE_HEADERS, randomToken } from '../_lib/security.js';

export async function onRequestGet({ request, env }) {
  if (!env.GITHUB_CLIENT_ID) {
    return new Response('Server is not configured: GITHUB_CLIENT_ID is missing.', {
      status: 500,
      headers: BASE_HEADERS,
    });
  }

  const url = new URL(request.url);
  const state = randomToken();

  const authorize = new URL('https://github.com/login/oauth/authorize');
  authorize.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
  authorize.searchParams.set('redirect_uri', `${url.origin}/api/auth/callback`);
  authorize.searchParams.set('scope', env.GITHUB_SCOPE || 'repo');
  authorize.searchParams.set('state', state);

  return new Response(null, {
    status: 302,
    headers: {
      ...BASE_HEADERS,
      Location: authorize.toString(),
      'Set-Cookie': `oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/api; Max-Age=600`,
    },
  });
      }

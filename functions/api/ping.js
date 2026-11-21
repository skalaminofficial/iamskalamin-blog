export function onRequest({ env }) {
  return new Response(
    JSON.stringify({
      ok: true,
      hasClientId: Boolean(env.GITHUB_CLIENT_ID),
      hasClientSecret: Boolean(env.GITHUB_CLIENT_SECRET),
      hasAllowedUsers: Boolean(env.ALLOWED_GITHUB_USERS),
    }),
    { headers: { 'Content-Type': 'application/json' } },
  );
}

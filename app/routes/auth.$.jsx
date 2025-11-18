// app/routes/auth.$.jsx
export const loader = async () => {
  return new Response(JSON.stringify({ error: "Auth disabled in standalone mode" }), {
    status: 404,
    headers: { "Content-Type": "application/json" },
  });
};
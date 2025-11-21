// app/routes/auth.callback.jsx
export const loader = async () => {
	return new Response(JSON.stringify({ error: "OAuth disabled" }), {
	  status: 404,
	  headers: { "Content-Type": "application/json" },
	});
  };
export const loader = async () => {
	return new Response(null, { status: 404 });
};

export default function AuthLoginDisabled() {
	return (
		<div className="max-w-xl mx-auto p-6 rounded-lg border border-gray-200 bg-white">
			<h1 className="text-2xl font-semibold mb-2">Login Disabled</h1>
			<p className="text-gray-700">
				The Shopify login route is disabled in standalone mode. Go to
				{" "}
				<a className="text-blue-600 underline" href="/app/products">/app/products</a>
				{" "}to view products.
			</p>
		</div>
	);
}

// app/routes/app.testApi.jsx
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAuth } from "@clerk/remix/ssr.server";
import { getShopifyContext } from "../shopify.server";

export async function loader(args) {
  // Clerk authentication
  const { userId } = await getAuth(args);
  if (!userId) {
    return redirect("/sign-in");
  }

  const { request } = args;

  try {
    // Get Shopify context
    const { admin } = await getShopifyContext(request);

    // Function to fetch all products with pagination
    async function fetchAllProducts() {
      let products = [];
      let cursor = null;
      do {
        const response = await admin.query({
          data: {
            query: `#graphql
              query getProducts($first: Int, $after: String) {
                products(first: $first, after: $after) {
                  edges {
                    node {
                      id
                      title
                      handle
                      description
                      priceRange {
                        minVariantPrice {
                          amount
                          currencyCode
                        }
                      }
                      images(first: 1) {
                        edges {
                          node {
                            url
                          }
                        }
                      }
                    }
                  }
                  pageInfo {
                    hasNextPage
                    endCursor
                  }
                }
              }`,
            variables: { first: 250, after: cursor }
          }
        });

        const data = response.body.data.products;
        products = products.concat(data.edges.map(edge => edge.node));
        cursor = data.pageInfo.hasNextPage ? data.pageInfo.endCursor : null;
      } while (cursor);

      return products;
    }

    const products = await fetchAllProducts();

    return json({ products, error: null });
  } catch (error) {
    console.error("Loader error:", error);
    return json({ products: [], error: "Failed to fetch products from Shopify." });
  }
}

export default function TestApi() {
  const { products, error } = useLoaderData();

  return (
    <div className="container mx-auto px-4 py-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Test API: All Shopify Products</h1>
      
      {error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error: {error}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              {product.images.edges?.[0]?.node?.url && (
                <img 
                  src={product.images.edges[0].node.url} 
                  alt={product.title} 
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.title}</h2>
                <p className="text-gray-600 mb-2">{product.description.substring(0, 100)}...</p>
                <p className="text-indigo-600 font-bold">
                  {product.priceRange.minVariantPrice.amount} {product.priceRange.minVariantPrice.currencyCode}
                </p>
                <a 
                  href={`https://${process.env.SHOPIFY_STORE}/products/${product.handle}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
                >
                  View in Store
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No products found in your Shopify store.</p>
      )}
    </div>
  );
}
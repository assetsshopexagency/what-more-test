// // File: app/components/ProductCarousel.jsx
// import { Box, Text, Icon, Button, Thumbnail, BlockStack } from "@shopify/polaris";

// export default function ProductCarousel({ products, videoId, onDelete, type }) {
//   if (!products || products.length === 0) return null;

//   return (
//     <Box
//       padding="200"
//       background="bg-surface-secondary"
//       borderRadius="200"
//       marginTop="200"
//     >
//       <Text variant="bodySm" fontWeight="medium" marginBottom="200">
//         {type === 'collection' ? 'Products from Collections' : 'Effective Products'} ({products.length})
//       </Text>
//       <div style={{
//         display: 'flex',
//         gap: '12px',
//         overflowX: 'auto',
//         padding: '8px 4px',
//         scrollbarWidth: 'thin',
//       }}>
//         {products.map((product) => (
//           <Box
//             key={product.id || Math.random()}
//             position="relative"
//             padding="150"
//             background="bg-surface"
//             borderRadius="150"
//             minWidth="100px"
//             maxWidth="120px"
//             style={{
//               boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//               border: '1px solid #e1e3e5',
//             }}
//           >
//             {onDelete && (
//               <Box position="absolute" top="4px" right="4px">
//                 <Button
//                   size="slim"
//                   icon={<Icon source="CancelSmallMinor" />}
//                   onClick={() => onDelete(videoId, product.id)}
//                   destructive
//                   plain
//                 />
//               </Box>
//             )}
//             <BlockStack gap="100" align="center">
//               {product.image_url ? (
//                 <Thumbnail
//                   source={product.image_url}
//                   alt={product.title}
//                   size="small"
//                 />
//               ) : (
//                 <Box
//                   background="bg-surface-secondary"
//                   padding="200"
//                   borderRadius="100"
//                   minHeight="50px"
//                   minWidth="50px"
//                   display="flex"
//                   alignItems="center"
//                   justifyContent="center"
//                 >
//                   <Icon source="ProductMajor" tone="subdued" />
//                 </Box>
//               )}
//               <Text variant="bodySm" alignment="center" truncate>
//                 {product.title || 'Untitled Product'}
//               </Text>
//               <Text variant="bodySm" fontWeight="bold" tone="success">
//                 {product.price || '0.00'} {product.currency_code || ''}
//               </Text>
//             </BlockStack>
//           </Box>
//         ))}
//       </div>
//     </Box>
//   );
// }




// app/components/ProductCarousel.jsx

export default function ProductCarousel({ products, videoId, onDelete, type }) {
  if (!products || products.length === 0) return null;

  return (
    <div className="p-2 bg-gray-100 rounded mt-2">
      <p className="text-sm font-medium mb-2">
        {type === 'collection' ? 'Products from Collections' : 'Effective Products'} ({products.length})
      </p>
      <div className="flex gap-3 overflow-x-auto p-2 scrollbar-thin">
        {products.map((product) => (
          <div
            key={product.id || Math.random()}
            className="relative p-1.5 bg-white rounded shadow min-w-[100px] max-w-[120px] border border-gray-200"
          >
            {onDelete && (
              <div className="absolute top-1 right-1">
                <button
                  onClick={() => onDelete(videoId, product.id)}
                  className="text-red-500 text-xs hover:text-red-700"
                >
                  ×
                </button>
              </div>
            )}
            <div className="flex flex-col gap-1 items-center">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="w-10 h-10 object-cover rounded"
                />
              ) : (
                <div className="bg-gray-200 w-10 h-10 flex items-center justify-center rounded">
                  {/* Placeholder */}
                </div>
              )}
              <p className="text-sm text-center truncate">{product.title || 'Untitled Product'}</p>
              <p className="text-sm font-bold text-green-600">
                {product.price || '0.00'} {product.currency_code || ''}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
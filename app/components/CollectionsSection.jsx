// // // File: app/components/CollectionsSection.jsx
// // import { Box, Text, InlineStack, Card, Thumbnail, Icon, Button, BlockStack } from "@shopify/polaris";
// // import ProductCarousel from "./ProductCarousel";

// // export default function CollectionsSection({ collections, videoId, onDeleteCollection, onExcludeProduct }) {
// //   if (!collections || collections.length === 0) return null;

// //   return (
// //     <Box
// //       padding="200"
// //       background="bg-surface-secondary"
// //       borderRadius="200"
// //       marginTop="200"
// //     >
// //       <Text variant="bodySm" fontWeight="medium" marginBottom="200">
// //         Associated Collections ({collections.length})
// //       </Text>
// //       <BlockStack gap="200">
// //         {collections.map((collection) => {
// //           const prods = collection.products ? collection.products.filter(
// //             p => !(excludedMap.get(videoId)?.has(p.id) || false)
// //           ) : [];
// //           return (
// //             <Card key={collection.id} padding="200">
// //               <InlineStack align="space-between" blockAlign="center">
// //                 <InlineStack gap="200" blockAlign="center">
// //                   {collection.image_url ? (
// //                     <Thumbnail source={collection.image_url} alt={collection.title} size="small" />
// //                   ) : (
// //                     <Icon source="CollectionMajor" tone="subdued" />
// //                   )}
// //                   <Text variant="bodyMd" fontWeight="medium">
// //                     {collection.title}
// //                   </Text>
// //                 </InlineStack>
// //                 {onDeleteCollection && (
// //                   <Button
// //                     destructive
// //                     plain
// //                     icon={<Icon source="DeleteMinor" />}
// //                     onClick={() => onDeleteCollection(videoId, collection.id)}
// //                   >
// //                     Remove Collection
// //                   </Button>
// //                 )}
// //               </InlineStack>
// //               <ProductCarousel
// //                 products={prods}
// //                 videoId={videoId}
// //                 onDelete={onExcludeProduct}
// //                 type="collection"
// //               />
// //             </Card>
// //           );
// //         })}
// //       </BlockStack>
// //     </Box>
// //   );
// // }






// // app/components/CollectionsSection.jsx

// import ProductCarousel from "./ProductCarousel";

// export default function CollectionsSection({ collections, videoId, onDeleteCollection, onExcludeProduct }) {
//   if (!collections || collections.length === 0) return null;

//   return (
//     <div className="p-2 bg-gray-100 rounded mb-2">
//       <p className="text-sm font-medium mb-2">
//         Associated Collections ({collections.length})
//       </p>
//       <div className="flex flex-col gap-2">
//         {collections.map((collection) => {
//           const prods = collection.products ? collection.products.filter(
//             p => !(excludedMap.get(videoId)?.has(p.id) || false)
//           ) : [];
//           return (
//             <div key={collection.id} className="p-2 bg-white rounded">
//               <div className="flex justify-between items-center">
//                 <div className="flex gap-2 items-center">
//                   {collection.image_url ? (
//                     <img src={collection.image_url} alt={collection.title} className="w-8 h-8 object-cover rounded" />
//                   ) : (
//                     <div className="text-gray-500"> {/* Placeholder */} </div>
//                   )}
//                   <p className="text-md font-medium">{collection.title}</p>
//                 </div>
//                 {onDeleteCollection && (
//                   <button
//                     onClick={() => onDeleteCollection(videoId, collection.id)}
//                     className="text-red-500 hover:text-red-700 flex items-center"
//                   >
//                     Remove Collection
//                   </button>
//                 )}
//               </div>
//               <ProductCarousel
//                 products={prods}
//                 videoId={videoId}
//                 onDelete={onExcludeProduct}
//                 type="collection"
//               />
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }




// app/components/CollectionsSection.jsx
import ProductCarousel from "./ProductCarousel";

export default function CollectionsSection({ collections, videoId, onDeleteCollection, onExcludeProduct }) {
  if (!collections || collections.length === 0) return null;

  return (
    <div className="p-2 bg-gray-100 rounded mb-2">
      <p className="text-sm font-medium mb-2">
        Associated Collections ({collections.length})
      </p>
      <div className="flex flex-col gap-2">
        {collections.map((collection) => {
          const prods = collection.products ? collection.products.filter(
            p => !(excludedMap.get(videoId)?.has(p.id) || false)
          ) : [];
          return (
            <div key={collection.id} className="p-2 bg-white rounded">
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  {collection.image_url ? (
                    <img src={collection.image_url} alt={collection.title} className="w-8 h-8 object-cover rounded" />
                  ) : (
                    <div className="text-gray-500"> {/* Placeholder */} </div>
                  )}
                  <p className="text-md font-medium">{collection.title}</p>
                </div>
                {onDeleteCollection && (
                  <button
                    onClick={() => onDeleteCollection(videoId, collection.id)}
                    className="text-red-500 hover:text-red-700 flex items-center"
                  >
                    Remove Collection
                  </button>
                )}
              </div>
              <ProductCarousel
                products={prods}
                videoId={videoId}
                onDelete={onExcludeProduct}
                type="collection"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
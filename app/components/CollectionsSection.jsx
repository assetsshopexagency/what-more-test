// File: app/components/CollectionsSection.jsx
import { Box, Text, InlineStack, Card, Thumbnail, Icon, Button, BlockStack } from "@shopify/polaris";
import ProductCarousel from "./ProductCarousel";

export default function CollectionsSection({ collections, videoId, onDeleteCollection, onExcludeProduct }) {
  if (!collections || collections.length === 0) return null;

  return (
    <Box
      padding="200"
      background="bg-surface-secondary"
      borderRadius="200"
      marginTop="200"
    >
      <Text variant="bodySm" fontWeight="medium" marginBottom="200">
        Associated Collections ({collections.length})
      </Text>
      <BlockStack gap="200">
        {collections.map((collection) => {
          const prods = collection.products ? collection.products.filter(
            p => !(excludedMap.get(videoId)?.has(p.id) || false)
          ) : [];
          return (
            <Card key={collection.id} padding="200">
              <InlineStack align="space-between" blockAlign="center">
                <InlineStack gap="200" blockAlign="center">
                  {collection.image_url ? (
                    <Thumbnail source={collection.image_url} alt={collection.title} size="small" />
                  ) : (
                    <Icon source="CollectionMajor" tone="subdued" />
                  )}
                  <Text variant="bodyMd" fontWeight="medium">
                    {collection.title}
                  </Text>
                </InlineStack>
                {onDeleteCollection && (
                  <Button
                    destructive
                    plain
                    icon={<Icon source="DeleteMinor" />}
                    onClick={() => onDeleteCollection(videoId, collection.id)}
                  >
                    Remove Collection
                  </Button>
                )}
              </InlineStack>
              <ProductCarousel
                products={prods}
                videoId={videoId}
                onDelete={onExcludeProduct}
                type="collection"
              />
            </Card>
          );
        })}
      </BlockStack>
    </Box>
  );
}
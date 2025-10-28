// File: app/components/CollectionSelectionModal.jsx
import { Modal, BlockStack, Text, Box, Spinner, EmptyState, Card, InlineStack, Checkbox, Thumbnail, Icon } from "@shopify/polaris";

export default function CollectionSelectionModal({
  open,
  onClose,
  title,
  collections,
  collectionsLoading,
  tempSelectedCollections,
  onTempCollectionSelect,
  primaryAction,
  secondaryActions,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      primaryAction={primaryAction}
      secondaryActions={secondaryActions}
      size="large"
    >
      <Modal.Section>
        <BlockStack gap="400">
          <Text variant="bodyMd" tone="subdued">
            Choose collections from your store to associate with this video.
          </Text>
          
          {collectionsLoading ? (
            <Box padding="400" alignment="center">
              <Spinner size="small" />
              <Text variant="bodySm" tone="subdued">Loading collections...</Text>
            </Box>
          ) : collections.length === 0 ? (
            <EmptyState heading="No collections available">
              <Text variant="bodyMd" as="p">
                No collections found in your store.
              </Text>
            </EmptyState>
          ) : (
            <Box>
              <Text variant="bodySm" fontWeight="medium" marginBottom="200">
                All Collections ({collections.length}):
              </Text>
              <div style={{
                maxHeight: '400px',
                overflowY: 'auto',
                border: '1px solid var(--p-border-subdued)',
                borderRadius: '8px',
                padding: '12px'
              }}>
                <BlockStack gap="200">
                  {collections.map((collection) => (
                    <Card
                      key={collection.id}
                      padding="200"
                      style={{
                        border: tempSelectedCollections.includes(String(collection.id))
                          ? '2px solid var(--p-border-success)'
                          : '1px solid var(--p-border-subdued)',
                        background: tempSelectedCollections.includes(String(collection.id))
                          ? 'var(--p-surface-success-subdued)'
                          : 'var(--p-surface)',
                      }}
                    >
                      <InlineStack gap="200" blockAlign="center">
                        <Checkbox
                          label=""
                          labelHidden
                          checked={tempSelectedCollections.includes(String(collection.id))}
                          onChange={(checked) => {
                            const collectionId = String(collection.id);
                            onTempCollectionSelect(
                              checked
                                ? [...tempSelectedCollections, collectionId]
                                : tempSelectedCollections.filter((id) => id !== collectionId)
                            );
                          }}
                          disabled={primaryAction.loading}
                        />
                        {collection.image_url ? (
                          <Thumbnail
                            source={collection.image_url}
                            alt={collection.title}
                            size="small"
                          />
                        ) : (
                          <Box
                            background="bg-surface-secondary"
                            padding="200"
                            borderRadius="100"
                            minHeight="40px"
                            minWidth="40px"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Icon source="CollectionMajor" tone="subdued" />
                          </Box>
                        )}
                        <Text variant="bodySm" fontWeight="medium" truncate>
                          {collection.title || 'Untitled Collection'}
                        </Text>
                      </InlineStack>
                    </Card>
                  ))}
                </BlockStack>
              </div>
              <Text variant="bodySm" tone="subdued" marginTop="200">
                {tempSelectedCollections.length} collection(s) selected
              </Text>
            </Box>
          )}
        </BlockStack>
      </Modal.Section>
    </Modal>
  );
}
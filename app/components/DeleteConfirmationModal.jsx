// File: app/components/DeleteConfirmationModal.jsx
import { Modal, BlockStack, Text } from "@shopify/polaris";

export default function DeleteConfirmationModal({
  open,
  onClose,
  title,
  primaryAction,
  secondaryActions,
  selectedCount,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      primaryAction={primaryAction}
      secondaryActions={secondaryActions}
    >
      <Modal.Section>
        <BlockStack gap="400">
          <Text variant="bodyMd" as="p">
            Are you sure you want to delete {selectedCount} selected video(s)? This action cannot be undone.
          </Text>
          <Text variant="bodySm" tone="subdued">
            All associated product and collection links will also be removed.
          </Text>
        </BlockStack>
      </Modal.Section>
    </Modal>
  );
}
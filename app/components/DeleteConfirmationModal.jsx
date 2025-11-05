// // // File: app/components/DeleteConfirmationModal.jsx
// // import { Modal, BlockStack, Text } from "@shopify/polaris";

// // export default function DeleteConfirmationModal({
// //   open,
// //   onClose,
// //   title,
// //   primaryAction,
// //   secondaryActions,
// //   selectedCount,
// // }) {
// //   return (
// //     <Modal
// //       open={open}
// //       onClose={onClose}
// //       title={title}
// //       primaryAction={primaryAction}
// //       secondaryActions={secondaryActions}
// //     >
// //       <Modal.Section>
// //         <BlockStack gap="400">
// //           <Text variant="bodyMd" as="p">
// //             Are you sure you want to delete {selectedCount} selected video(s)? This action cannot be undone.
// //           </Text>
// //           <Text variant="bodySm" tone="subdued">
// //             All associated product and collection links will also be removed.
// //           </Text>
// //         </BlockStack>
// //       </Modal.Section>
// //     </Modal>
// //   );
// // }




// // app/components/DeleteConfirmationModal.jsx

// export default function DeleteConfirmationModal({
//   open,
//   onClose,
//   title,
//   primaryAction,
//   secondaryActions,
//   selectedCount,
// }) {
//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//       <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
//         <div className="flex justify-between items-center p-4 border-b">
//           <h2 className="text-lg font-semibold">{title}</h2>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//             ×
//           </button>
//         </div>
//         <div className="p-4 flex flex-col gap-4">
//           <p className="text-md">
//             Are you sure you want to delete {selectedCount} selected video(s)? This action cannot be undone.
//           </p>
//           <p className="text-sm text-gray-500">
//             All associated product and collection links will also be removed.
//           </p>
//         </div>
//         <div className="flex justify-end gap-2 p-4 border-t">
//           {secondaryActions.map((action, idx) => (
//             <button key={idx} onClick={action.onAction} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
//               {action.content}
//             </button>
//           ))}
//           <button onClick={primaryAction.onAction} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
//             {primaryAction.content}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



// app/components/DeleteConfirmationModal.jsx

export default function DeleteConfirmationModal({
  open,
  onClose,
  title,
  primaryAction,
  secondaryActions,
  selectedCount,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>
        <div className="p-4 flex flex-col gap-4">
          <p className="text-md">
            Are you sure you want to delete {selectedCount} selected video(s)? This action cannot be undone.
          </p>
          <p className="text-sm text-gray-500">
            All associated product and collection links will also be removed.
          </p>
        </div>
        <div className="flex justify-end gap-2 p-4 border-t">
          {secondaryActions.map((action, idx) => (
            <button key={idx} onClick={action.onAction} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              {action.content}
            </button>
          ))}
          <button onClick={primaryAction.onAction} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            {primaryAction.content}
          </button>
        </div>
      </div>
    </div>
  );
}
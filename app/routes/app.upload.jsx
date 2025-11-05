// // // app/routes/app.upload.jsx
// // import { useState, useRef, useCallback } from "react";

// // export const loader = async () => null;

// // export default function Upload() {
// //   const [files, setFiles] = useState([]);
// //   const [isDragging, setIsDragging] = useState(false);
// //   const [isUploading, setIsUploading] = useState(false);
// //   const [message, setMessage] = useState({ text: "", type: "" });
// //   const fileInputRef = useRef(null);

// //   // ────────────────────── FILE VALIDATION ──────────────────────
// //   const isValidFile = (file) => {
// //     const maxSize = 100 * 1024 * 1024; // 100 MB
// //     const allowed = [
// //       "image/jpeg",
// //       "image/png",
// //       "image/gif",
// //       "image/webp",
// //       "video/mp4",
// //       "video/quicktime",
// //       "video/x-m4v",
// //       "video/avi",
// //     ];
// //     return file.size <= maxSize && allowed.includes(file.type);
// //   };

// //   // ────────────────────── DRAG & DROP ──────────────────────
// //   const handleDrag = (e) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     if (e.type === "dragenter" || e.type === "dragover") {
// //       setIsDragging(true);
// //     } else if (e.type === "dragleave") {
// //       setIsDragging(false);
// //     }
// //   };

// //   const handleDrop = useCallback((e) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     setIsDragging(false);

// //     const droppedFiles = Array.from(e.dataTransfer.files);
// //     processFiles(droppedFiles);
// //   }, []);

// //   const handleChange = (e) => {
// //     const selectedFiles = Array.from(e.target.files);
// //     processFiles(selectedFiles);
// //   };

// //   const processFiles = (newFiles) => {
// //     const valid = newFiles.filter(isValidFile);
// //     const invalid = newFiles.length - valid.length;

// //     if (invalid > 0) {
// //       setMessage({ text: `${invalid} file(s) skipped (size/type)`, type: "warning" });
// //     }

// //     setFiles((prev) => [
// //       ...prev,
// //       ...valid.map((f) => ({
// //         id: Math.random().toString(36),
// //         file: f,
// //         title: f.name.replace(/\.[^/.]+$/, ""),
// //         status: "pending",
// //         progress: 0,
// //       })),
// //     ]);
// //   };

// //   // ────────────────────── UPLOAD LOGIC ──────────────────────
// //   const startUpload = async () => {
// //     const pending = files.filter((f) => f.status === "pending");
// //     if (!pending.length) return;

// //     setIsUploading(true);
// //     setMessage({ text: "", type: "" });

// //     for (const item of pending) {
// //       try {
// //         setFiles((prev) =>
// //           prev.map((f) => (f.id === item.id ? { ...f, status: "uploading", progress: 20 } : f))
// //         );

// //         const initRes = await fetch("/api/upload/init", {
// //           method: "POST",
// //           headers: { "Content-Type": "application/json" },
// //           body: JSON.stringify({
// //             fileName: item.file.name,
// //             fileSize: item.file.size,
// //             fileType: item.file.type,
// //             title: item.title,
// //           }),
// //         });
// //         const init = await initRes.json();
// //         if (!init.success) throw new Error(init.error);
// //         const { url, resourceUrl, params } = init;

// //         setFiles((prev) =>
// //           prev.map((f) => (f.id === item.id ? { ...f, progress: 50 } : f))
// //         );

// //         const form = new FormData();
// //         Object.entries(params).forEach(([k, v]) => form.append(k, v));
// //         form.append("file", item.file);
// //         await fetch(url, { method: "POST", body: form });

// //         setFiles((prev) =>
// //           prev.map((f) => (f.id === item.id ? { ...f, progress: 80 } : f))
// //         );

// //         const compRes = await fetch("/api/upload/complete", {
// //           method: "POST",
// //           headers: { "Content-Type": "application/json" },
// //           body: JSON.stringify({ resourceUrl, title: item.title }),
// //         });
// //         const comp = await compRes.json();
// //         if (!comp.success) throw new Error(comp.error);

// //         setFiles((prev) =>
// //           prev.map((f) => (f.id === item.id ? { ...f, status: "completed", progress: 100 } : f))
// //         );
// //       } catch (err) {
// //         setFiles((prev) =>
// //           prev.map((f) =>
// //             f.id === item.id ? { ...f, status: "failed", error: err.message } : f
// //           )
// //         );
// //       }
// //     }

// //     setIsUploading(false);
// //     setMessage({ text: "All uploads finished!", type: "success" });
// //   };

// //   const removeFile = (id) => {
// //     setFiles((prev) => prev.filter((f) => f.id !== id));
// //   };

// //   const openPicker = () => fileInputRef.current?.click();

// //   // ────────────────────── PREVIEW COMPONENT ──────────────────────
// //   const Thumb = ({ file }) => {
// //     const url = URL.createObjectURL(file);
// //     const isVideo = file.type.startsWith("video/");
// //     return (
// //       <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-200 shadow-sm">
// //         {isVideo ? (
// //           <video src={url} className="w-full h-full object-cover" autoPlay loop muted />
// //         ) : (
// //           <img src={url} alt="" className="w-full h-full object-cover" />
// //         )}
// //       </div>
// //     );
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
// //       <div className="max-w-5xl mx-auto">
// //         <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
// //           Upload Media to Shopify
// //         </h1>

// //         {/* ───── MESSAGE ───── */}
// //         {message.text && (
// //           <div
// //             className={`mb-6 p-4 rounded-xl text-center font-semibold text-white shadow-md ${
// //               message.type === "error"
// //                 ? "bg-red-500"
// //                 : message.type === "success"
// //                 ? "bg-green-500"
// //                 : message.type === "warning"
// //                 ? "bg-yellow-500"
// //                 : "bg-blue-500"
// //             }`}
// //           >
// //             {message.text}
// //           </div>
// //         )}

// //         {/* ───── DROP ZONE ───── */}
// //         <div
// //           onDragEnter={handleDrag}
// //           onDragLeave={handleDrag}
// //           onDragOver={handleDrag}
// //           onDrop={handleDrop}
// //           onClick={openPicker}
// //           className={`
// //             relative border-4 border-dashed rounded-2xl p-16 text-center cursor-pointer transition-all duration-300
// //             ${isDragging ? "border-indigo-500 bg-indigo-50/70" : "border-gray-300 bg-white"}
// //             hover:border-indigo-400 hover:bg-indigo-50/50 shadow-xl
// //           `}
// //         >
// //           <input
// //             ref={fileInputRef}
// //             type="file"
// //             multiple
// //             accept="image/*,video/*"
// //             onChange={handleChange}
// //             className="hidden"
// //           />

// //           <div className="space-y-4">
// //             <div className="mx-auto w-24 h-24 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
// //               <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 <path
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   strokeWidth={2}
// //                   d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
// //                 />
// //               </svg>
// //             </div>
// //             <p className="text-2xl font-bold text-gray-700">
// //               {isDragging ? "Drop files here" : "Drag & drop or click to upload"}
// //             </p>
// //             <p className="text-sm text-gray-500">
// //               Supports: JPEG, PNG, GIF, WebP, MP4, MOV · Max 100 MB
// //             </p>
// //           </div>
// //         </div>

// //         {/* ───── FILE LIST ───── */}
// //         {files.length > 0 && (
// //           <div className="mt-10 bg-white rounded-2xl shadow-xl p-6">
// //             <h2 className="text-xl font-bold text-gray-800 mb-4">
// //               {files.length} file(s) ready
// //             </h2>
// //             <div className="space-y-3 max-h-96 overflow-y-auto">
// //               {files.map((item) => (
// //                 <div
// //                   key={item.id}
// //                   className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border"
// //                 >
// //                   <Thumb file={item.file} />
// //                   <div className="flex-1">
// //                     <input
// //                       type="text"
// //                       value={item.title}
// //                       onChange={(e) => {
// //                         const newTitle = e.target.value;
// //                         setFiles((prev) =>
// //                           prev.map((f) => (f.id === item.id ? { ...f, title: newTitle } : f))
// //                         );
// //                       }}
// //                       className="w-full px-3 py-1 text-sm font-medium border-b border-transparent focus:border-indigo-500 focus:outline-none"
// //                       placeholder="Enter title"
// //                     />
// //                     {item.status === "uploading" && (
// //                       <div className="mt-2 bg-gray-200 rounded-full h-2 overflow-hidden">
// //                         <div
// //                           className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all"
// //                           style={{ width: `${item.progress}%` }}
// //                         />
// //                       </div>
// //                     )}
// //                     {item.status === "failed" && (
// //                       <p className="mt-1 text-xs text-red-600">{item.error}</p>
// //                     )}
// //                   </div>
// //                   <div className="flex items-center gap-2">
// //                     <span
// //                       className={`px-3 py-1 text-xs font-medium rounded-full ${
// //                         item.status === "completed"
// //                           ? "bg-green-100 text-green-700"
// //                           : item.status === "uploading"
// //                           ? "bg-blue-100 text-blue-700"
// //                           : item.status === "failed"
// //                           ? "bg-red-100 text-red-700"
// //                           : "bg-gray-100 text-gray-600"
// //                       }`}
// //                     >
// //                       {item.status}
// //                     </span>
// //                     {item.status === "pending" && (
// //                       <button
// //                         onClick={() => removeFile(item.id)}
// //                         className="text-red-500 hover:text-red-700"
// //                       >
// //                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// //                         </svg>
// //                       </button>
// //                     )}
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>

// //             {/* ───── UPLOAD BUTTON ───── */}
// //             {files.some((f) => f.status === "pending") && (
// //               <button
// //                 onClick={startUpload}
// //                 disabled={isUploading}
// //                 className="mt-6 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 transition-all shadow-lg text-lg"
// //               >
// //                 {isUploading
// //                   ? `Uploading… (${files.filter((f) => f.status === "completed").length}/${files.length})`
// //                   : `Upload ${files.filter((f) => f.status === "pending").length} file(s)`}
// //               </button>
// //             )}
// //           </div>
// //         )}

// //         {/* ───── TIPS ───── */}
// //         <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 text-center">
// //           <h3 className="text-lg font-bold text-gray-700 mb-3">Pro Tips</h3>
// //           <p className="text-sm text-gray-600">
// //             Drag multiple files · Edit titles before upload · Progress shown in real-time
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }





// // app/routes/app.upload.jsx
// import { useState, useRef, useCallback } from "react";

// export const loader = async () => null;

// export default function Upload() {
//   const [files, setFiles] = useState([]);
//   const [isDragging, setIsDragging] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);
//   const [message, setMessage] = useState({ text: "", type: "" });
//   const fileInputRef = useRef(null);

//   // ────────────────────── FILE VALIDATION ──────────────────────
//   const isValidFile = (file) => {
//     const maxSize = 100 * 1024 * 1024; // 100 MB
//     const allowed = [
//       "image/jpeg",
//       "image/png",
//       "image/gif",
//       "image/webp",
//       "video/mp4",
//       "video/quicktime",
//       "video/x-m4v",
//       "video/avi",
//     ];
//     return file.size <= maxSize && allowed.includes(file.type);
//   };

//   // ────────────────────── DRAG & DROP ──────────────────────
//   const handleDrag = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setIsDragging(true);
//     } else if (e.type === "dragleave") {
//       setIsDragging(false);
//     }
//   };

//   const handleDrop = useCallback((e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);

//     const droppedFiles = Array.from(e.dataTransfer.files);
//     processFiles(droppedFiles);
//   }, []);

//   const handleChange = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     processFiles(selectedFiles);
//   };

//   const processFiles = (newFiles) => {
//     const valid = newFiles.filter(isValidFile);
//     const invalid = newFiles.length - valid.length;

//     if (invalid > 0) {
//       setMessage({ text: `${invalid} file(s) skipped (size/type)`, type: "warning" });
//     }

//     setFiles((prev) => [
//       ...prev,
//       ...valid.map((f) => ({
//         id: Math.random().toString(36),
//         file: f,
//         title: f.name.replace(/\.[^/.]+$/, ""),
//         status: "pending",
//         progress: 0,
//       })),
//     ]);
//   };

//   // ────────────────────── UPLOAD LOGIC ──────────────────────
//   const startUpload = async () => {
//     const pending = files.filter((f) => f.status === "pending");
//     if (!pending.length) return;

//     setIsUploading(true);
//     setMessage({ text: "", type: "" });

//     for (const item of pending) {
//       try {
//         setFiles((prev) =>
//           prev.map((f) => (f.id === item.id ? { ...f, status: "uploading", progress: 20 } : f))
//         );

//         const initRes = await fetch("/api/upload/init", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             fileName: item.file.name,
//             fileSize: item.file.size,
//             fileType: item.file.type,
//             title: item.title,
//           }),
//         });
//         const init = await initRes.json();
//         if (!init.success) throw new Error(init.error);
//         const { url, resourceUrl, params } = init;

//         setFiles((prev) =>
//           prev.map((f) => (f.id === item.id ? { ...f, progress: 50 } : f))
//         );

//         const form = new FormData();
//         Object.entries(params).forEach(([k, v]) => form.append(k, v));
//         form.append("file", item.file);
//         await fetch(url, { method: "POST", body: form });

//         setFiles((prev) =>
//           prev.map((f) => (f.id === item.id ? { ...f, progress: 80 } : f))
//         );

//         const compRes = await fetch("/api/upload/complete", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ resourceUrl, title: item.title, fileType: item.file.type }),
//         });
//         const comp = await compRes.json();
//         if (!comp.success) throw new Error(comp.error);

//         setFiles((prev) =>
//           prev.map((f) => (f.id === item.id ? { ...f, status: "completed", progress: 100 } : f))
//         );
//       } catch (err) {
//         setFiles((prev) =>
//           prev.map((f) =>
//             f.id === item.id ? { ...f, status: "failed", error: err.message } : f
//           )
//         );
//       }
//     }

//     setIsUploading(false);
//     setMessage({ text: "All uploads finished!", type: "success" });
//   };

//   const removeFile = (id) => {
//     setFiles((prev) => prev.filter((f) => f.id !== id));
//   };

//   const openPicker = () => fileInputRef.current?.click();

//   // ────────────────────── PREVIEW COMPONENT ──────────────────────
//   const Thumb = ({ file }) => {
//     const url = URL.createObjectURL(file);
//     const isVideo = file.type.startsWith("video/");
//     return (
//       <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-200 shadow-sm">
//         {isVideo ? (
//           <video src={url} className="w-full h-full object-cover" autoPlay loop muted />
//         ) : (
//           <img src={url} alt="" className="w-full h-full object-cover" />
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
//       <div className="max-w-5xl mx-auto">
//         <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
//           Upload Media to Shopify
//         </h1>

//         {/* ───── MESSAGE ───── */}
//         {message.text && (
//           <div
//             className={`mb-6 p-4 rounded-xl text-center font-semibold text-white shadow-md ${
//               message.type === "error"
//                 ? "bg-red-500"
//                 : message.type === "success"
//                 ? "bg-green-500"
//                 : message.type === "warning"
//                 ? "bg-yellow-500"
//                 : "bg-blue-500"
//             }`}
//           >
//             {message.text}
//           </div>
//         )}

//         {/* ───── DROP ZONE ───── */}
//         <div
//           onDragEnter={handleDrag}
//           onDragLeave={handleDrag}
//           onDragOver={handleDrag}
//           onDrop={handleDrop}
//           onClick={openPicker}
//           className={`
//             relative border-4 border-dashed rounded-2xl p-16 text-center cursor-pointer transition-all duration-300
//             ${isDragging ? "border-indigo-500 bg-indigo-50/70" : "border-gray-300 bg-white"}
//             hover:border-indigo-400 hover:bg-indigo-50/50 shadow-xl
//           `}
//         >
//           <input
//             ref={fileInputRef}
//             type="file"
//             multiple
//             accept="image/*,video/*"
//             onChange={handleChange}
//             className="hidden"
//           />

//           <div className="space-y-4">
//             <div className="mx-auto w-24 h-24 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
//               <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
//                 />
//               </svg>
//             </div>
//             <p className="text-2xl font-bold text-gray-700">
//               {isDragging ? "Drop files here" : "Drag & drop or click to upload"}
//             </p>
//             <p className="text-sm text-gray-500">
//               Supports: JPEG, PNG, GIF, WebP, MP4, MOV · Max 100 MB
//             </p>
//           </div>
//         </div>

//         {/* ───── FILE LIST ───── */}
//         {files.length > 0 && (
//           <div className="mt-10 bg-white rounded-2xl shadow-xl p-6">
//             <h2 className="text-xl font-bold text-gray-800 mb-4">
//               {files.length} file(s) ready
//             </h2>
//             <div className="space-y-3 max-h-96 overflow-y-auto">
//               {files.map((item) => (
//                 <div
//                   key={item.id}
//                   className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border"
//                 >
//                   <Thumb file={item.file} />
//                   <div className="flex-1">
//                     <input
//                       type="text"
//                       value={item.title}
//                       onChange={(e) => {
//                         const newTitle = e.target.value;
//                         setFiles((prev) =>
//                           prev.map((f) => (f.id === item.id ? { ...f, title: newTitle } : f))
//                         );
//                       }}
//                       className="w-full px-3 py-1 text-sm font-medium border-b border-transparent focus:border-indigo-500 focus:outline-none"
//                       placeholder="Enter title"
//                     />
//                     {item.status === "uploading" && (
//                       <div className="mt-2 bg-gray-200 rounded-full h-2 overflow-hidden">
//                         <div
//                           className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all"
//                           style={{ width: `${item.progress}%` }}
//                         />
//                       </div>
//                     )}
//                     {item.status === "failed" && (
//                       <p className="mt-1 text-xs text-red-600">{item.error}</p>
//                     )}
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <span
//                       className={`px-3 py-1 text-xs font-medium rounded-full ${
//                         item.status === "completed"
//                           ? "bg-green-100 text-green-700"
//                           : item.status === "uploading"
//                           ? "bg-blue-100 text-blue-700"
//                           : item.status === "failed"
//                           ? "bg-red-100 text-red-700"
//                           : "bg-gray-100 text-gray-600"
//                       }`}
//                     >
//                       {item.status}
//                     </span>
//                     {item.status === "pending" && (
//                       <button
//                         onClick={() => removeFile(item.id)}
//                         className="text-red-500 hover:text-red-700"
//                       >
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* ───── UPLOAD BUTTON ───── */}
//             {files.some((f) => f.status === "pending") && (
//               <button
//                 onClick={startUpload}
//                 disabled={isUploading}
//                 className="mt-6 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 transition-all shadow-lg text-lg"
//               >
//                 {isUploading
//                   ? `Uploading… (${files.filter((f) => f.status === "completed").length}/${files.length})`
//                   : `Upload ${files.filter((f) => f.status === "pending").length} file(s)`}
//               </button>
//             )}
//           </div>
//         )}

//         {/* ───── TIPS ───── */}
//         <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 text-center">
//           <h3 className="text-lg font-bold text-gray-700 mb-3">Pro Tips</h3>
//           <p className="text-sm text-gray-600">
//             Drag multiple files · Edit titles before upload · Progress shown in real-time
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }




// app/routes/app.upload.jsx
import { useState, useRef, useCallback } from "react";

export const loader = async () => null;

export default function Upload() {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const fileInputRef = useRef(null);

  // ────────────────────── FILE VALIDATION ──────────────────────
  const isValidFile = (file) => {
    const maxSize = 100 * 1024 * 1024; // 100 MB
    const allowed = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "video/mp4",
      "video/quicktime",
      "video/x-m4v",
      "video/avi",
    ];
    return file.size <= maxSize && allowed.includes(file.type);
  };

  // ────────────────────── DRAG & DROP ──────────────────────
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  }, []);

  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    processFiles(selectedFiles);
  };

  const processFiles = (newFiles) => {
    const valid = newFiles.filter(isValidFile);
    const invalid = newFiles.length - valid.length;

    if (invalid > 0) {
      setMessage({ text: `${invalid} file(s) skipped (size/type)`, type: "warning" });
    }

    setFiles((prev) => [
      ...prev,
      ...valid.map((f) => ({
        id: Math.random().toString(36),
        file: f,
        title: f.name.replace(/\.[^/.]+$/, ""),
        status: "pending",
        progress: 0,
      })),
    ]);
  };

  // ────────────────────── UPLOAD LOGIC ──────────────────────
  const startUpload = async () => {
    const pending = files.filter((f) => f.status === "pending");
    if (!pending.length) return;

    setIsUploading(true);
    setMessage({ text: "", type: "" });

    let completedCount = 0;
    let failedCount = 0;

    for (const item of pending) {
      try {
        setFiles((prev) =>
          prev.map((f) => (f.id === item.id ? { ...f, status: "uploading", progress: 20 } : f))
        );

        // Step 1: Initialize upload
        const initRes = await fetch("/api/upload/init", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileName: item.file.name,
            fileSize: item.file.size,
            fileType: item.file.type,
            title: item.title,
          }),
        });

        if (!initRes.ok) {
          throw new Error(`HTTP error! status: ${initRes.status}`);
        }

        const init = await initRes.json();
        if (!init.success) throw new Error(init.error);
        const { url, resourceUrl, params } = init;

        setFiles((prev) =>
          prev.map((f) => (f.id === item.id ? { ...f, progress: 40 } : f))
        );

        // Step 2: Upload to staged URL
        const form = new FormData();
        Object.entries(params).forEach(([k, v]) => form.append(k, v));
        form.append("file", item.file);
        
        const uploadRes = await fetch(url, { 
          method: "POST", 
          body: form 
        });

        if (!uploadRes.ok) {
          throw new Error(`Upload failed with status: ${uploadRes.status}`);
        }

        setFiles((prev) =>
          prev.map((f) => (f.id === item.id ? { ...f, progress: 70 } : f))
        );

        // Step 3: Complete upload in Shopify
        const compRes = await fetch("/api/upload/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            resourceUrl, 
            title: item.title, 
            fileType: item.file.type 
          }),
        });

        if (!compRes.ok) {
          throw new Error(`HTTP error! status: ${compRes.status}`);
        }

        const comp = await compRes.json();
        if (!comp.success) throw new Error(comp.error);

        setFiles((prev) =>
          prev.map((f) => (f.id === item.id ? { ...f, status: "completed", progress: 100 } : f))
        );
        completedCount++;

      } catch (err) {
        console.error(`Upload failed for ${item.file.name}:`, err);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === item.id ? { ...f, status: "failed", error: err.message } : f
          )
        );
        failedCount++;
      }
    }

    setIsUploading(false);
    
    if (failedCount === 0) {
      setMessage({ text: `All ${completedCount} files uploaded successfully!`, type: "success" });
    } else if (completedCount === 0) {
      setMessage({ text: `All ${failedCount} files failed to upload`, type: "error" });
    } else {
      setMessage({ 
        text: `${completedCount} files uploaded, ${failedCount} failed`, 
        type: "warning" 
      });
    }
  };

  const removeFile = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const openPicker = () => fileInputRef.current?.click();

  // ────────────────────── PREVIEW COMPONENT ──────────────────────
  const Thumb = ({ file }) => {
    const url = URL.createObjectURL(file);
    const isVideo = file.type.startsWith("video/");
    return (
      <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-200 shadow-sm">
        {isVideo ? (
          <video src={url} className="w-full h-full object-cover" autoPlay loop muted />
        ) : (
          <img src={url} alt="" className="w-full h-full object-cover" />
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
          Upload Media to Shopify
        </h1>

        {/* ───── MESSAGE ───── */}
        {message.text && (
          <div
            className={`mb-6 p-4 rounded-xl text-center font-semibold text-white shadow-md ${
              message.type === "error"
                ? "bg-red-500"
                : message.type === "success"
                ? "bg-green-500"
                : message.type === "warning"
                ? "bg-yellow-500"
                : "bg-blue-500"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* ───── DROP ZONE ───── */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={openPicker}
          className={`
            relative border-4 border-dashed rounded-2xl p-16 text-center cursor-pointer transition-all duration-300
            ${isDragging ? "border-indigo-500 bg-indigo-50/70" : "border-gray-300 bg-white"}
            hover:border-indigo-400 hover:bg-indigo-50/50 shadow-xl
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleChange}
            className="hidden"
          />

          <div className="space-y-4">
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <p className="text-2xl font-bold text-gray-700">
              {isDragging ? "Drop files here" : "Drag & drop or click to upload"}
            </p>
            <p className="text-sm text-gray-500">
              Supports: JPEG, PNG, GIF, WebP, MP4, MOV · Max 100 MB
            </p>
          </div>
        </div>

        {/* ───── FILE LIST ───── */}
        {files.length > 0 && (
          <div className="mt-10 bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {files.length} file(s) ready
            </h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {files.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border"
                >
                  <Thumb file={item.file} />
                  <div className="flex-1">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const newTitle = e.target.value;
                        setFiles((prev) =>
                          prev.map((f) => (f.id === item.id ? { ...f, title: newTitle } : f))
                        );
                      }}
                      className="w-full px-3 py-1 text-sm font-medium border-b border-transparent focus:border-indigo-500 focus:outline-none"
                      placeholder="Enter title"
                    />
                    {item.status === "uploading" && (
                      <div className="mt-2 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    )}
                    {item.status === "failed" && (
                      <p className="mt-1 text-xs text-red-600">{item.error}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        item.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : item.status === "uploading"
                          ? "bg-blue-100 text-blue-700"
                          : item.status === "failed"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {item.status}
                    </span>
                    {(item.status === "pending" || item.status === "failed") && (
                      <button
                        onClick={() => removeFile(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* ───── UPLOAD BUTTON ───── */}
            {files.some((f) => f.status === "pending") && (
              <button
                onClick={startUpload}
                disabled={isUploading}
                className="mt-6 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 transition-all shadow-lg text-lg"
              >
                {isUploading
                  ? `Uploading… (${files.filter((f) => f.status === "completed" || f.status === "failed").length}/${files.length})`
                  : `Upload ${files.filter((f) => f.status === "pending").length} file(s)`}
              </button>
            )}
          </div>
        )}

        {/* ───── TIPS ───── */}
        <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 text-center">
          <h3 className="text-lg font-bold text-gray-700 mb-3">Pro Tips</h3>
          <p className="text-sm text-gray-600">
            Drag multiple files · Edit titles before upload · Progress shown in real-time
          </p>
        </div>
      </div>
    </div>
  );
}
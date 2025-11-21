// app/routes/media.jsx  ← NO lucide-react needed!
import { useState, useEffect, useRef } from "react";

export default function MediaPage() {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fullViewVideo, setFullViewVideo] = useState(null);
  const [showTagModal, setShowTagModal] = useState(false);
  const [currentVideoForTagging, setCurrentVideoForTagging] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [fetchingProducts, setFetchingProducts] = useState(false);

  const videoRefs = useRef({});

  useEffect(() => {
    fetchMediaFiles();
  }, []);

  const fetchMediaFiles = async () => {
    try {
      const res = await fetch("/api/media-files");
      const data = await res.json();
      if (data.success) setMediaFiles(data.mediaFiles || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = (url) => {
    navigator.clipboard.writeText(window.location.origin + url);
    alert("Link copied!");
  };

  const openFullView = (video) => setFullViewVideo(video);
  const closeFullView = () => setFullViewVideo(null);

  const toggleMute = () => {
    if (videoRefs.current["full"]) videoRefs.current["full"].muted = !videoRefs.current["full"].muted;
  };

  const enterFullscreen = () => {
    if (videoRefs.current["full"]?.requestFullscreen) videoRefs.current["full"].requestFullscreen();
  };

  const enterPip = () => {
    if (videoRefs.current["full"]) videoRefs.current["full"].requestPictureInPicture();
  };

  const openTagProductsModal = async (video) => {
    setCurrentVideoForTagging(video);
    setShowTagModal(true);

    const res = await fetch(`/api/video-products/${video.id}`);
    const data = await res.json();
    setSelectedProducts(data.success ? data.products || [] : []);

    setFetchingProducts(true);
    const prodRes = await fetch("/api/products");
    const prodData = await prodRes.json();
    setProducts(prodData.success ? prodData.products : []);
    setFetchingProducts(false);
  };

  const toggleProduct = (p) => {
    setSelectedProducts(prev =>
      prev.some(x => x.id === p.id) ? prev.filter(x => x.id !== p.id) : [...prev, p]
    );
  };

  const saveTaggedProducts = async () => {
    const res = await fetch(`/api/video-products/${currentVideoForTagging.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productIds: selectedProducts.map(p => p.id) }),
    });
    const result = await res.json();
    alert(result.success ? "Saved!" : "Failed");
    if (result.success) setShowTagModal(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this video?")) return;
    await fetch(`/api/media-files/${id}`, { method: "DELETE" });
    setMediaFiles(prev => prev.filter(v => v.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-10">My Videos</h1>

        {loading ? <p className="text-center text-2xl">Loading...</p> :
         mediaFiles.length === 0 ? <p className="text-center text-2xl text-gray-500">No videos yet</p> :
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
           {mediaFiles.map(video => (
             <div key={video.id} className="bg-white rounded-2xl shadow-xl overflow-hidden">
               <div onClick={() => openFullView(video)} className="cursor-pointer bg-black">
                 <video src={video.videoUrl} className="w-full h-64 object-cover" muted loop />
                 <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-50 transition">
                   <span className="text-white text-5xl opacity-0 hover:opacity-100">Play</span>
                 </div>
               </div>
               <div className="p-6">
                 <h3 className="font-bold text-xl mb-4">{video.title || "Untitled"}</h3>
                 <div className="flex flex-wrap gap-3">
                   <button onClick={() => handleCopyLink(video.videoUrl)} className="bg-blue-600 text-white px-5 py-3 rounded-lg text-sm">
                     Copy Link
                   </button>
                   <button onClick={() => openTagProductsModal(video)} className="bg-purple-600 text-white px-5 py-3 rounded-lg text-sm">
                     Tag Products
                   </button>
                   <button onClick={() => handleDelete(video.id)} className="bg-red-600 text-white px-5 py-3 rounded-lg text-sm">
                     Delete
                   </button>
                 </div>
               </div>
             </div>
           ))}
         </div>
        }
      </div>

      {/* Full View Modal */}
      {fullViewVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-10" onClick={closeFullView}>
          <div className="relative max-w-6xl w-full" onClick={e => e.stopPropagation()}>
            <button onClick={closeFullView} className="absolute top-4 right-4 text-white text-5xl z-10">×</button>
            <video
              src={fullViewVideo.videoUrl}
              controls
              autoPlay
              className="w-full rounded-2xl"
              ref={el => el && (videoRefs.current["full"] = el)}
            />
            <div className="absolute bottom-8 right-8 flex gap-4">
              <button onClick={toggleMute} className="bg-white bg-opacity-30 hover:bg-opacity-50 text-white px-6 py-4 rounded-full text-2xl">Volume</button>
              <button onClick={enterFullscreen} className="bg-white bg-opacity-30 hover:bg-opacity-50 text-white px-6 py-4 rounded-full text-2xl">Full Screen</button>
              <button onClick={enterPip} className="bg-white bg-opacity-30 hover:bg-opacity-50 text-white px-6 py-4 rounded-full text-2xl">PiP</button>
            </div>
          </div>
        </div>
      )}

      {/* Tag Products Modal */}
      {showTagModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-5xl w-full max-h-screen overflow-y-auto p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">Tag Products</h2>
              <button onClick={() => setShowTagModal(false)} className="text-4xl">×</button>
            </div>

            <div className="mb-6">
              <strong>Selected ({selectedProducts.length}):</strong>
              <div className="flex flex-wrap gap-3 mt-3">
                {selectedProducts.map(p => (
                  <span key={p.id} className="bg-green-100 text-green-800 px-4 py-2 rounded-full flex items-center gap-2">
                    {p.title}
                    <button onClick={() => setSelectedProducts(prev => prev.filter(x => x.id !== p.id))} className="ml-2">×</button>
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {products.map(p => {
                const selected = selectedProducts.some(x => x.id === p.id);
                return (
                  <div
                    key={p.id}
                    onClick={() => toggleProduct(p)}
                    className={`border-4 rounded-xl p-4 cursor-pointer ${selected ? "border-blue-600 bg-blue-50" : "border-gray-300"}`}
                  >
                    {p.image && <img src={p.image.src} className="w-full h-40 object-cover rounded mb-3" />}
                    <p className="font-bold">{p.title}</p>
                    <p>${p.variants?.[0]?.price || "0"}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex justify-end gap-4">
              <button onClick={() => setShowTagModal(false)} className="px-8 py-4 border border-gray-400 rounded-lg">Cancel</button>
              <button onClick={saveTaggedProducts} className="px-10 py-4 bg-blue-600 text-white rounded-lg">Save Products</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
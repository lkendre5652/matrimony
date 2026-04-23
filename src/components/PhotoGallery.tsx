import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Trash2, Plus, X, Maximize2 } from 'lucide-react';

interface PhotoGalleryProps {
  photos: string[];
  onAddPhoto: (url: string) => void;
  onRemovePhoto: (index: number) => void;
}

export default function PhotoGallery({ photos, onAddPhoto, onRemovePhoto }: PhotoGalleryProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const handleAdd = () => {
    if (newUrl.trim()) {
      onAddPhoto(newUrl);
      setNewUrl('');
      setIsAdding(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Photo Gallery</h2>
          <p className="text-sm text-slate-500">Manage your profile pictures ({photos.length}/10)</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="p-6 overflow-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <motion.div
              layoutId={`photo-${index}`}
              key={index}
              className="relative aspect-square group rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm"
            >
              <img 
                src={photo} 
                alt={`Profile ${index + 1}`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button 
                  onClick={() => setSelectedPhoto(index)}
                  className="p-2 bg-white/20 backdrop-blur-md text-white rounded-lg hover:bg-white/40 transition-colors"
                >
                  <Maximize2 size={18} />
                </button>
                <button 
                  onClick={() => onRemovePhoto(index)}
                  className="p-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              {index === 0 && (
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-indigo-600 text-white text-[9px] font-bold uppercase rounded shadow-sm">
                  Primary
                </div>
              )}
            </motion.div>
          ))}

          {photos.length < 10 && (
             <button 
               onClick={() => setIsAdding(true)}
               className="aspect-square border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-indigo-400 hover:text-indigo-400 transition-all bg-slate-50/50"
             >
                <Camera size={24} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Add Photo</span>
             </button>
          )}
        </div>
      </div>

      {/* Add Photo Modal */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-800">Add New Photo</h3>
                <button onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Photo URL</label>
                  <input 
                    type="text" 
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                    placeholder="https://images.unsplash.com/..."
                    autoFocus
                  />
                  <p className="text-[10px] text-slate-400">Please provide a direct link to an image file.</p>
                </div>
                <div className="flex gap-3 pt-2">
                  <button 
                    onClick={() => setIsAdding(false)}
                    className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all uppercase tracking-widest"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleAdd}
                    className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition-all uppercase tracking-widest shadow-lg shadow-indigo-600/20"
                  >
                    Add Photo
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Fullscreen Photo View */}
      <AnimatePresence>
        {selectedPhoto !== null && (
           <div 
             className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex items-center justify-center p-8"
             onClick={() => setSelectedPhoto(null)}
           >
              <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
                 <X size={32} />
              </button>
              <motion.img 
                layoutId={`photo-${selectedPhoto}`}
                src={photos[selectedPhoto]} 
                className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
                alt=""
              />
           </div>
        )}
      </AnimatePresence>
    </div>
  );
}

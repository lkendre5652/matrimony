import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Bell, Lock, Trash2, AlertTriangle, EyeOff, UserX } from 'lucide-react';

interface SettingsProps {
  onDeleteProfile: () => void;
  onHideProfile: (hidden: boolean) => void;
  isProfileHidden: boolean;
}

export default function Settings({ onDeleteProfile, onHideProfile, isProfileHidden }: SettingsProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-800">Account Settings</h2>
        <p className="text-sm text-slate-500">Manage your privacy, notifications, and account status.</p>
      </div>

      <div className="p-8 space-y-8 overflow-auto">
        {/* Privacy Section */}
        <section className="space-y-4">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Lock size={12} /> Privacy & Visibility
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 transition-colors hover:border-indigo-200">
              <div className="flex gap-3 items-center">
                <div className={`p-2 rounded-lg ${isProfileHidden ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}>
                  {isProfileHidden ? <EyeOff size={18} /> : <Shield size={18} />}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Profile Visibility</h4>
                  <p className="text-xs text-slate-500">Hide your profile from search results temporarily.</p>
                </div>
              </div>
              <button 
                onClick={() => onHideProfile(!isProfileHidden)}
                className={`relative w-12 h-6 rounded-full transition-colors ${isProfileHidden ? 'bg-amber-500' : 'bg-slate-200'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isProfileHidden ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="space-y-4 pt-12">
          <h3 className="text-[10px] font-bold text-rose-400 uppercase tracking-widest flex items-center gap-2">
            <AlertTriangle size={12} /> Danger Zone
          </h3>
          <div className="p-6 border border-rose-100 bg-rose-50/50 rounded-xl space-y-4">
            <div>
              <h4 className="text-sm font-bold text-rose-800">Delete Profile</h4>
              <p className="text-xs text-rose-600 mt-1">
                Once you delete your profile, all your data, messages, and matches will be permanently removed. This action cannot be undone.
              </p>
            </div>
            <button 
              onClick={() => setShowDeleteConfirm(true)}
              className="px-6 py-2 bg-rose-600 text-white rounded-lg text-sm font-bold hover:bg-rose-700 transition-colors flex items-center gap-2 shadow-sm shadow-rose-600/20"
            >
              <Trash2 size={16} />
              Permanently Delete Profile
            </button>
          </div>
        </section>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6 border border-rose-100"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-rose-100 text-rose-600 rounded-full">
                  <UserX size={32} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Are you absolutely sure?</h3>
                  <p className="text-sm text-slate-500 mt-2">
                    This will delete your profile "Milan Matrimony" permanently. You will not be able to recover your data.
                  </p>
                </div>
                <div className="w-full space-y-3 pt-4">
                  <button 
                    onClick={onDeleteProfile}
                    className="w-full py-3 bg-rose-600 text-white rounded-xl font-bold text-sm hover:bg-rose-700 transition-all uppercase tracking-widest shadow-lg shadow-rose-600/20"
                  >
                    Yes, Delete Everything
                  </button>
                  <button 
                    onClick={() => setShowDeleteConfirm(false)}
                    className="w-full py-3 bg-white border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all uppercase tracking-widest"
                  >
                    No, Keep My Profile
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

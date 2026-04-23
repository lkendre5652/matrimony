import React from 'react';
import { motion } from 'motion/react';
import { UserProfile } from '../types';
import { MapPin, Briefcase, GraduationCap, Heart, Eye, EyeOff, Trash2, ArrowRight } from 'lucide-react';

interface ProfileListProps {
  title: string;
  description: string;
  profiles: UserProfile[];
  onViewProfile: (id: string) => void;
  onAction?: (id: string, action: string) => void;
  emptyMessage?: string;
}

export default function ProfileList({ title, description, profiles, onViewProfile, onAction, emptyMessage }: ProfileListProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-800">{title}</h2>
        <p className="text-sm text-slate-500">{description}</p>
      </div>

      <div className="flex-1 overflow-auto p-6 scrollbar-hide">
        {profiles.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400">
            <Eye size={48} className="mb-4 opacity-20" />
            <p className="text-sm font-medium">{emptyMessage || 'No profiles found in this list.'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profiles.map((profile) => (
              <motion.div
                key={profile.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex gap-4 group hover:border-indigo-200 transition-all shadow-sm hover:shadow-md"
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-slate-200 border border-slate-200">
                  <img 
                    src={profile.photos[0]} 
                    alt={profile.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-slate-800 truncate">{profile.name}, {profile.age}</h3>
                    <div className="flex gap-1">
                       {profile.isShortlisted && <Heart size={14} className="text-rose-500 fill-rose-500" />}
                       {profile.isHidden && <EyeOff size={14} className="text-slate-400" />}
                    </div>
                  </div>
                  
                  <div className="space-y-1 mt-1 text-[11px] text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Briefcase size={12} className="text-indigo-400" />
                      <span className="truncate">{profile.profession}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={12} className="text-indigo-400" />
                      <span className="truncate">{profile.location}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <button 
                      onClick={() => onViewProfile(profile.id)}
                      className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all flex items-center gap-1"
                    >
                      View Profile <ArrowRight size={10} />
                    </button>
                    {onAction && title.includes('Hidden') && (
                       <button 
                         onClick={() => onAction(profile.id, 'unhide')}
                         className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                       >
                         Unhide
                       </button>
                    )}
                    {onAction && title.includes('Shortlisted') && (
                       <button 
                         onClick={() => onAction(profile.id, 'remove-shortlist')}
                         className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                       >
                         Remove
                       </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

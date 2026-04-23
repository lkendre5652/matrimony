import React from 'react';
import { motion } from 'motion/react';
import { UserProfile } from '../types';
import { MapPin, Briefcase, GraduationCap, Star, Trash2, Eye, ExternalLink } from 'lucide-react';

interface ProfileListProps {
  title: string;
  description: string;
  profiles: UserProfile[];
  onViewProfile: (id: string) => void;
  onAction?: (id: string, action: 'remove-shortlist' | 'unhide') => void;
}

export default function ProfileList({ title, description, profiles, onViewProfile, onAction }: ProfileListProps) {
  return (
    <div className="flex flex-col gap-6">
      <header className="mb-4">
        <h1 className="text-2xl font-display font-bold text-slate-800 tracking-tight">{title}</h1>
        <p className="text-sm text-slate-500 font-medium">{description}</p>
      </header>

      {profiles.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-slate-200">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Star className="text-slate-300" size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">No Active Profiles Here</h3>
          <p className="text-sm text-slate-500 max-w-xs mx-auto">
            Try refining your search or expanding your preferences to see more matches.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {profiles.map((profile, index) => (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-indigo-600/5 hover:-translate-y-1 transition-all"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img 
                  src={profile.photos[0]} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  alt={profile.name} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                {/* Visual Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                   <div className="glass px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-widest border-white/40">
                      Top Match
                   </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-display font-bold leading-none">{profile.name}, {profile.age}</h3>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" title="Online" />
                  </div>
                  <p className="text-xs text-white/70 font-medium flex items-center gap-1">
                    <MapPin size={12} className="text-rose-400" />
                    {profile.location}
                  </p>
                </div>
              </div>

              <div className="p-5">
                <div className="space-y-3 mb-6">
                  <ProfileInfoItem icon={Briefcase} text={profile.profession} />
                  <ProfileInfoItem icon={GraduationCap} text={profile.education.split(' ').slice(0, 3).join(' ')} />
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => onViewProfile(profile.id)}
                    className="flex-1 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-600 transition-all flex items-center justify-center gap-2"
                  >
                    <Eye size={14} /> Full Profile
                  </button>
                  {onAction && (
                    <button 
                      onClick={() => onAction(profile.id, profile.isHidden ? 'unhide' : 'remove-shortlist')}
                      className="w-12 h-12 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-100 hover:bg-rose-50 transition-all"
                      title={profile.isHidden ? 'Unhide' : 'Remove'}
                    >
                      {profile.isHidden ? <ExternalLink size={18} /> : <Trash2 size={18} />}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProfileInfoItem({ icon: Icon, text }: { icon: any, text: string }) {
  return (
    <div className="flex items-center gap-2 text-slate-500">
      <div className="p-1.5 bg-slate-50 rounded-lg">
         <Icon size={12} className="text-indigo-400" />
      </div>
      <span className="text-[11px] font-bold truncate leading-none">{text}</span>
    </div>
  );
}

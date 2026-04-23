import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile } from '../types';
import { 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  User, 
  Heart, 
  ChevronLeft, 
  ChevronRight,
  Send,
  MoreVertical,
  CheckCircle2,
  Clock,
  Settings
} from 'lucide-react';

interface ProfileViewProps {
  profile: UserProfile;
  onSendProposal: () => void;
  isOwnProfile?: boolean;
  onEdit?: () => void;
}

export default function ProfileView({ profile, onSendProposal, isOwnProfile, onEdit }: ProfileViewProps) {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [proposalSent, setProposalSent] = useState(false);

  const nextPhoto = () => {
    setActivePhotoIndex((prev) => (prev + 1) % profile.photos.length);
  };

  const prevPhoto = () => {
    setActivePhotoIndex((prev) => (prev - 1 + profile.photos.length) % profile.photos.length);
  };

  const handleSendProposal = () => {
    setProposalSent(true);
    onSendProposal();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
      {/* Top Profile Header */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
        {/* Photo Section */}
        <div className="md:col-span-5 relative aspect-square md:aspect-auto h-full overflow-hidden bg-slate-100 min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.img
              key={activePhotoIndex}
              src={profile.photos[activePhotoIndex]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full object-cover"
              alt={profile.name}
            />
          </AnimatePresence>

          {/* Photo Navigation Overlay */}
          {profile.photos.length > 1 && (
            <>
              <div className="absolute inset-y-0 left-0 flex items-center p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={prevPhoto} className="p-1 px-2 bg-black/20 text-white rounded-full hover:bg-black/40"><ChevronLeft size={16} /></button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={nextPhoto} className="p-1 px-2 bg-black/20 text-white rounded-full hover:bg-black/40"><ChevronRight size={16} /></button>
              </div>
              <div className="absolute inset-x-0 bottom-4 flex justify-center gap-1.5 z-10">
                {profile.photos.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setActivePhotoIndex(i); }}
                    className={`h-1 rounded-full transition-all ${i === activePhotoIndex ? 'w-6 bg-white' : 'w-2 bg-white/50'}`}
                  />
                ))}
              </div>
            </>
          )}
          
          <div className="absolute top-4 left-4 bg-white/30 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-widest">
            ID: MAT-{profile.id}
          </div>
        </div>

        {/* Basic Info & Actions */}
        <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-slate-800">{profile.name}, {profile.age}</h1>
                <div className="flex items-center text-slate-500 text-xs mt-1 mb-6">
                  <MapPin size={14} className="mr-1" />
                  {profile.location}
                </div>
              </div>
              <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                <MoreVertical size={20} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8">
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Profession</p>
                <p className="text-sm font-semibold text-slate-700">{profile.profession}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Education</p>
                <p className="text-sm font-semibold text-slate-700 truncate">{profile.education}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Height</p>
                <p className="text-sm font-semibold text-slate-700">{profile.height}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Community</p>
                <p className="text-sm font-semibold text-slate-700">{profile.religion}, {profile.caste}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-auto">
            {isOwnProfile ? (
              <button 
                onClick={onEdit}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 transition-all"
              >
                <Settings size={18} />
                Edit Profile
              </button>
            ) : (
              <>
                <button 
                  onClick={handleSendProposal}
                  disabled={proposalSent}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${
                    proposalSent 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : 'bg-rose-600 text-white hover:bg-rose-700 shadow-sm'
                  }`}
                >
                  {proposalSent ? <CheckCircle2 size={18} /> : <Send size={18} />}
                  {proposalSent ? 'Proposal Sent' : 'Send Proposal'}
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all">
                  <Heart size={18} />
                  Shortlist
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Details Sections */}
      <div className="p-8 border-t border-slate-100 bg-slate-50/50 space-y-8">
        <section className="space-y-3">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
            <div className="w-1 h-4 bg-indigo-600 rounded-full" />
            Background & Bio
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {profile.bio}
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <section className="space-y-4">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
              <div className="w-1 h-4 bg-indigo-600 rounded-full" />
              Family Details
            </h2>
            <div className="space-y-3">
              {[
                { label: "Father's Profession", value: profile.familyDetails.fatherProfession },
                { label: "Mother's Profession", value: profile.familyDetails.motherProfession },
                { label: "Family Values", value: profile.familyDetails.familyValues },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                  <span className="text-slate-500 font-medium">{item.label}</span>
                  <span className="font-bold text-slate-700">{item.value}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
              <div className="w-1 h-4 bg-indigo-600 rounded-full" />
              Partner Preferences
            </h2>
            <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-xl">
              <p className="text-sm text-slate-600 leading-relaxed italic italic">
                "{profile.expectations}"
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

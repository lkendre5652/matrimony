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
  Settings,
  ShieldCheck,
  Star,
  Zap,
  Quote
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
    <div className="flex flex-col gap-6 h-full pb-20 md:pb-0">
      {/* Premium Hero Section */}
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden relative">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Immersive Photo Gallery */}
          <div className="lg:col-span-5 relative aspect-[4/5] lg:aspect-auto h-full group bg-slate-900 border-r border-slate-100">
            <AnimatePresence mode="wait">
              <motion.img
                key={activePhotoIndex}
                src={profile.photos[activePhotoIndex]}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full object-cover"
                alt={profile.name}
              />
            </AnimatePresence>
            
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />

            {profile.photos.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={prevPhoto} className="p-2 glass text-white rounded-full hover:bg-white/40 transition-all">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={nextPhoto} className="p-2 glass text-white rounded-full hover:bg-white/40 transition-all">
                   <ChevronRight size={20} />
                </button>
              </div>
            )}

            <div className="absolute bottom-6 left-6 z-10 text-white">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-display font-bold tracking-tight">{profile.name}, {profile.age}</h1>
                <div className="p-1 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/50">
                  <CheckCircle2 size={16} />
                </div>
              </div>
              <p className="text-white/80 font-medium flex items-center gap-1.5 text-sm">
                <MapPin size={14} className="text-rose-400" />
                {profile.location}
              </p>
            </div>

            <div className="absolute top-6 left-6 z-10">
               <div className="glass px-3 py-1.5 rounded-full flex items-center gap-2 text-white">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest leading-none">Online Now</span>
               </div>
            </div>
          </div>

          <div className="lg:col-span-7 p-8 md:p-10 flex flex-col">
            <div className="flex justify-between items-start mb-8">
               <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Compatibility Score</span>
                  <div className="flex items-center gap-3">
                     <div className="text-3xl font-display font-bold text-indigo-600">92%</div>
                     <div className="h-2 w-32 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: '92%' }}
                           transition={{ duration: 1, delay: 0.2 }}
                           className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600" 
                        />
                     </div>
                  </div>
               </div>
               <div className="flex gap-2">
                 <button className="p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all">
                    <Star size={20} />
                 </button>
                 <button className="p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 transition-all">
                    <MoreVertical size={20} />
                 </button>
               </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/60 mb-8">
               <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                  <Zap size={14} className="text-amber-500 fill-amber-500" /> Key Similarities
               </h3>
               <div className="flex flex-wrap gap-2">
                  <Tag label="Same Community" color="indigo" />
                  <Tag label="Education Level" color="green" />
                  <Tag label="Both Techies" color="amber" />
                  <Tag label="City Match" color="rose" />
               </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
               <StatItem label="Height" value={profile.height} />
               <StatItem label="Status" value="Never Married" />
               <StatItem label="Caste" value={profile.caste} />
               <StatItem label="Income" value="₹ 15L - 25L" />
            </div>

            <div className="mt-auto flex gap-4">
              {isOwnProfile ? (
                <button 
                  onClick={onEdit}
                  className="flex-1 py-4 rounded-xl bg-indigo-600 text-white font-bold text-sm uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
                >
                  <Settings size={18} />
                  Manage My Profile
                </button>
              ) : (
                <>
                  <button 
                    onClick={handleSendProposal}
                    disabled={proposalSent}
                    className={`flex-[2] py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                      proposalSent 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-600/20'
                    }`}
                  >
                    {proposalSent ? <CheckCircle2 size={18} /> : <Send size={18} />}
                    {proposalSent ? 'Interest Sent' : 'Send Interest'}
                  </button>
                  <button className="flex-1 py-4 rounded-xl border-2 border-slate-200 text-slate-700 font-bold text-sm uppercase tracking-widest hover:bg-slate-50 transition-all">
                    Shortlist
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <SectionCard title="Personal Background" icon={User}>
            <p className="text-slate-600 leading-relaxed font-medium mb-6 italic border-l-4 border-indigo-100 pl-4">
               "{profile.bio}"
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <DataItem label="Born" value="12 June, 1994" />
               <StatItem label="Time of Birth" value="10:45 AM" />
               <StatItem label="Place of Birth" value={profile.location} />
               <StatItem label="Mangalik" value="No" />
            </div>
          </SectionCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <SectionCard title="Education & Career" icon={Briefcase}>
                <DataItem label="Profession" value={profile.profession} />
                <DataItem label="Employer" value="Fortune 500 Co." />
                <DataItem label="Education" value={profile.education} />
             </SectionCard>

             <SectionCard title="Family Values" icon={Heart}>
                <DataItem label="Father" value={profile.familyDetails.fatherProfession} />
                <DataItem label="Mother" value={profile.familyDetails.motherProfession} />
                <DataItem label="Siblings" value={`${profile.familyDetails.siblings} Sister(s)`} />
             </SectionCard>
          </div>

          <SectionCard title="Ideal Partner Expectations" icon={Star}>
             <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {profile.expectations}
             </p>
          </SectionCard>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
           <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm overflow-hidden relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-full -mr-12 -mt-12" />
              <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
                 <ShieldCheck size={18} className="text-indigo-600" /> Trust Verification
              </h3>
              <div className="space-y-4">
                 <VerificationItem label="Photo Verified" status="verified" />
                 <VerificationItem label="Govt ID Checked" status="verified" />
                 <VerificationItem label="Workplace Verified" status="pending" />
                 <VerificationItem label="Reference Check" status="none" />
              </div>
           </div>

           <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4 text-slate-400">
                 <Heart size={32} className="opacity-20" />
              </div>
              <h3 className="text-sm font-bold text-slate-800 mb-2">Member Since 2024</h3>
              <p className="text-xs text-slate-500 mb-6">Last active: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              <button className="w-full py-3 rounded-xl border border-slate-200 text-slate-700 text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-all">
                 Request More Details
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}

function StatItem({ label, value }: { label: string, value: string }) {
   return (
      <div className="flex flex-col">
         <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</span>
         <span className="text-sm font-bold text-slate-800 truncate">{value}</span>
      </div>
   );
}

function Tag({ label, color }: any) {
  const colors: any = {
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    rose: 'bg-rose-50 text-rose-700 border-rose-100',
    green: 'bg-green-50 text-green-700 border-green-100',
    amber: 'bg-amber-50 text-amber-700 border-amber-100',
  };
  return (
    <span className={`px-2.5 py-1 rounded-lg border text-[10px] font-bold transition-transform hover:scale-105 cursor-default ${colors[color]}`}>
      {label}
    </span>
  );
}

function SectionCard({ title, icon: Icon, children }: any) {
  return (
    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-6">
        <Icon size={14} className="text-indigo-600" /> {title}
      </h3>
      <div>{children}</div>
    </div>
  );
}

function DataItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex flex-col mb-4 last:mb-0">
      <span className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">{label}</span>
      <span className="text-sm font-bold text-slate-700">{value}</span>
    </div>
  );
}

function VerificationItem({ label, status }: any) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs font-medium text-slate-600">{label}</span>
      {status === 'verified' && <CheckCircle2 size={16} className="text-green-500" />}
      {status === 'pending' && <Clock size={16} className="text-amber-500" />}
      {status === 'none' && <div className="w-4 h-4 rounded-full border border-slate-200" />}
    </div>
  );
}

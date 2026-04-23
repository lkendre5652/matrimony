import React, { useState } from 'react';
import { User, Heart, Settings, Bell, Search, LayoutGrid, Camera, Eye, EyeOff, Trash2, Clock, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ProfileView from './components/ProfileView';
import EditProfileForm from './components/EditProfileForm';
import ProposalManager from './components/ProposalManager';
import ProfileList from './components/ProfileList';
import PhotoGallery from './components/PhotoGallery';
import SettingsView from './components/Settings';
import { MOCK_PROFILE, MOCK_PROFILES } from './mockData';
import { UserProfile } from './types';

type ViewState = 
  | 'browse' 
  | 'profile' 
  | 'edit-profile' 
  | 'proposals' 
  | 'photos' 
  | 'shortlisted' 
  | 'viewed-me' 
  | 'viewed-by-me' 
  | 'hidden' 
  | 'settings';

const SAMPLE_RECEIVED_PROPOSALS = [
  {
    id: 'p1',
    senderId: 'u2',
    receiverId: '1',
    status: 'pending' as const,
    timestamp: new Date().toISOString(),
    sender: {
      name: 'Rahul Varma',
      age: 28,
      location: 'Bangalore, India',
      profession: 'Product Designer',
      photos: ['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop'],
    }
  }
];

const SAMPLE_SENT_PROPOSALS = [
  {
    id: 'p2',
    senderId: '1',
    receiverId: 'u3',
    status: 'pending' as const,
    timestamp: new Date().toISOString(),
    receiver: {
      name: 'Siddharth Mehta',
      photos: ['https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop'],
    }
  }
];

export default function App() {
  const [view, setView] = useState<ViewState>('profile');
  const [profile, setProfile] = useState<UserProfile>(MOCK_PROFILE);
  const [isProfileHidden, setIsProfileHidden] = useState(false);

  const renderContent = () => {
    switch (view) {
      case 'profile':
        return (
          <ProfileView 
            profile={profile} 
            isOwnProfile={true}
            onEdit={() => setView('edit-profile')}
            onSendProposal={() => console.log('Proposal sent')} 
          />
        );
      case 'edit-profile':
        return (
          <EditProfileForm 
            initialData={profile}
            onSave={(newData) => {
              setProfile(newData);
              setView('profile');
            }}
            onCancel={() => setView('profile')}
          />
        );
      case 'proposals':
        return (
          <ProposalManager 
            receivedProposals={SAMPLE_RECEIVED_PROPOSALS}
            sentProposals={SAMPLE_SENT_PROPOSALS}
            onAccept={(id) => console.log('Accepted', id)}
            onDecline={(id) => console.log('Declined', id)}
          />
        );
      case 'photos':
        return (
          <PhotoGallery 
            photos={profile.photos}
            onAddPhoto={(url) => setProfile(prev => ({ ...prev, photos: [...prev.photos, url] }))}
            onRemovePhoto={(index) => setProfile(prev => ({ ...prev, photos: prev.photos.filter((_, i) => i !== index) }))}
          />
        );
      case 'shortlisted':
        return (
          <ProfileList 
            title="Shortlisted Profiles"
            description="Matches you've saved to look at later"
            profiles={MOCK_PROFILES.filter(p => p.isShortlisted)}
            onViewProfile={(id) => setView('profile')}
            onAction={(id, action) => console.log(action, id)}
          />
        );
      case 'viewed-by-me':
        return (
          <ProfileList 
            title="Profiles Viewed By Me"
            description="Profiles you have visited recently"
            profiles={MOCK_PROFILES.filter(p => p.viewedAt)}
            onViewProfile={(id) => setView('profile')}
          />
        );
      case 'viewed-me':
        return (
          <ProfileList 
            title="Who Viewed My Profile"
            description="Recent visitors who looked at your profile"
            profiles={MOCK_PROFILES.slice(0, 2)}
            onViewProfile={(id) => setView('profile')}
          />
        );
      case 'hidden':
        return (
          <ProfileList 
            title="Profiles Hidden By Me"
            description="Hidden profiles will not appear in your search results"
            profiles={MOCK_PROFILES.filter(p => p.isHidden)}
            onViewProfile={(id) => setView('profile')}
            onAction={(id, action) => console.log(action, id)}
          />
        );
      case 'settings':
        return (
          <SettingsView 
            isProfileHidden={isProfileHidden}
            onHideProfile={(hidden) => setIsProfileHidden(hidden)}
            onDeleteProfile={() => {
              alert('Profile deleted successfully');
              setView('browse');
            }}
          />
        );
      default:
        return (
           <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl shadow-indigo-100 mb-8">
                 <Search size={32} className="text-indigo-600" />
              </div>
              <h2 className="text-xl font-display font-bold text-slate-800">No Premium Matches Ready</h2>
              <p className="text-sm text-slate-500 mt-2 max-w-xs text-center">We are curating your daily recommendations. Check back in a few hours.</p>
              <button 
                onClick={() => setView('profile')}
                className="mt-8 px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/30 hover:bg-indigo-700 transition-all"
              >
                View My Profile
              </button>
           </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Premium Top Bar */}
      <header className="sticky top-0 z-40 glass border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
           <div className="flex items-center gap-8">
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('profile')}>
                <div className="w-9 h-9 bg-gradient-to-tr from-indigo-600 to-indigo-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
                  <Heart size={20} className="fill-white" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-lg font-display font-bold text-slate-800 leading-none">Milan</h1>
                  <span className="text-[9px] font-bold text-slate-400 tracking-[0.2em] uppercase">Premium Matrimony</span>
                </div>
              </div>

              <div className="hidden lg:flex items-center bg-slate-100 rounded-xl px-4 py-2 w-96 border border-slate-200 focus-within:border-indigo-400 focus-within:bg-white transition-all group">
                 <Search size={16} className="text-slate-400 mr-3 group-focus-within:text-indigo-500" />
                 <input type="text" placeholder="Search by name, ID or profession..." className="bg-transparent border-none outline-none text-sm w-full font-medium" />
              </div>
           </div>

           <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-1.5 bg-slate-100/50 rounded-xl p-1.5 mr-2">
                 <button className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:bg-white hover:shadow-sm transition-all">Support</button>
                 <button className="px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-600 bg-white shadow-sm">Help Center</button>
              </div>

              <button className="p-2.5 text-slate-400 hover:text-indigo-600 transition-colors relative">
                 <Bell size={20} />
                 <div className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
              </button>
              
              <div className="h-8 w-[1px] bg-slate-200 mx-2" />

              <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setView('profile')}>
                 <div className="text-right hidden sm:block">
                    <p className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{profile.name}</p>
                    <p className="text-[10px] font-medium text-slate-400">Personalized Plan</p>
                 </div>
                 <img src={profile.photos[0]} className="w-9 h-9 rounded-full object-cover border-2 border-indigo-600 ring-4 ring-indigo-50" alt="" />
              </div>
           </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto w-full flex-1 md:flex gap-8 p-4 md:p-8 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col gap-6 w-72 flex-shrink-0 sticky top-24 h-[calc(100vh-8rem)]">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-3 overflow-y-auto no-scrollbar">
            <NavGroup title="Discovery">
              <NavButton active={view === 'browse'} onClick={() => setView('browse')} icon={LayoutGrid} label="Premium Recommendations" />
              <NavButton active={view === 'proposals'} onClick={() => setView('proposals')} icon={Bell} label="Interest Board" badge="2" />
            </NavGroup>

            <NavGroup title="Profile Health">
              <div className="px-4 py-3 mb-2 bg-slate-50 rounded-xl border border-slate-100">
                 <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Profile Quality</span>
                    <span className="text-[10px] font-bold text-indigo-600">85%</span>
                 </div>
                 <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 w-[85%]" />
                 </div>
              </div>
              <NavButton active={view === 'viewed-me'} onClick={() => setView('viewed-me')} icon={Eye} label="Who Viewed Me" />
              <NavButton active={view === 'viewed-by-me'} onClick={() => setView('viewed-by-me')} icon={Clock} label="View History" />
              <NavButton active={view === 'shortlisted'} onClick={() => setView('shortlisted')} icon={Heart} label="Saved Profiles" />
            </NavGroup>

            <NavGroup title="Control Panel">
              <NavButton active={view === 'profile'} onClick={() => setView('profile')} icon={User} label="Public Identity" />
              <NavButton active={view === 'edit-profile'} onClick={() => setView('edit-profile')} icon={Settings} label="Edit Data" />
              <NavButton active={view === 'photos'} onClick={() => setView('photos')} icon={Camera} label="Photo Vault" badge={profile.photos.length.toString()} />
              <NavButton active={view === 'hidden'} onClick={() => setView('hidden')} icon={EyeOff} label="Hidden Matches" />
              <NavButton active={view === 'settings'} onClick={() => setView('settings')} icon={Trash2} label="Security Panel" />
            </NavGroup>
          </div>

          {/* Premium Banner */}
          <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/20 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
             <Star className="text-white fill-white mb-4" size={24} />
             <h3 className="text-sm font-display font-bold mb-1 tracking-tight">Milan Premium</h3>
             <p className="text-[11px] text-slate-400 mb-6 font-medium leading-relaxed">Unlock advanced search filters and priority listing.</p>
             <button className="w-full bg-white text-slate-900 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-all shadow-xl shadow-white/5">
                Go Premium
             </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 pb-24 md:pb-0 overflow-y-auto no-scrollbar scroll-smooth">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Sticky Navbar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-slate-200 px-6 py-2 flex justify-between items-center z-50 rounded-t-3xl shadow-2xl">
        <MobileNavButton active={view === 'browse'} onClick={() => setView('browse')} icon={LayoutGrid} label="Explore" />
        <MobileNavButton active={view === 'proposals'} onClick={() => setView('proposals')} icon={Bell} label="Interests" />
        <div className="relative -mt-10">
           <button 
             onClick={() => setView('profile')}
             className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl transition-all ${
               view === 'profile' ? 'bg-indigo-600 text-white scale-110 shadow-indigo-600/20' : 'bg-white text-slate-400'
             }`}
           >
             <User size={28} />
           </button>
        </div>
        <MobileNavButton active={view === 'shortlisted'} onClick={() => setView('shortlisted')} icon={Heart} label="Saved" />
        <MobileNavButton active={view === 'settings'} onClick={() => setView('settings')} icon={Settings} label="More" />
      </nav>
    </div>
  );
}

function NavGroup({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="mb-4 last:mb-0">
      <h3 className="px-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
         <div className="w-1 h-3 bg-slate-200 rounded-full" /> {title}
      </h3>
      <div className="space-y-0.5">
        {children}
      </div>
    </div>
  );
}

function NavButton({ active, icon: Icon, onClick, label, badge }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all relative ${
        active 
        ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10' 
        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
      }`}
    >
      <Icon size={16} className={active ? 'text-indigo-400' : ''} />
      <span className="truncate">{label}</span>
      {badge && (
         <span className={`ml-auto min-w-[20px] h-5 px-1.5 flex items-center justify-center rounded-lg text-[10px] font-bold ${active ? 'bg-indigo-500 text-white' : 'bg-indigo-50 text-indigo-600'}`}>
            {badge}
         </span>
      )}
    </button>
  );
}

function MobileNavButton({ active, icon: Icon, onClick, label }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-all ${
        active ? 'text-indigo-600' : 'text-slate-400'
      }`}
    >
      <Icon size={20} />
      <span className="text-[10px] font-bold uppercase tracking-widest scale-90">{label}</span>
    </button>
  );
}

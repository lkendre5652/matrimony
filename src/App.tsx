import React, { useState } from 'react';
import { User, Heart, Settings, Bell, Search, LayoutGrid, Camera, Eye, EyeOff, Trash2, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ProfileView from './components/ProfileView';
import EditProfileForm from './components/EditProfileForm';
import ProposalManager from './components/ProposalManager';
import ProfileList from './components/ProfileList';
import PhotoGallery from './components/PhotoGallery';
import SettingsView from './components/Settings';
import { MOCK_PROFILE, MOCK_PROFILES } from './mockData';
import { UserProfile, Proposal } from './types';

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
           <div className="flex flex-col items-center justify-center min-h-[80vh] text-slate-400">
              <Search size={48} className="mb-4 opacity-20" />
              <p className="font-bold text-slate-800">Search Results</p>
              <p className="text-sm mt-1">Discover millions of verified profiles</p>
              <button 
                onClick={() => setView('profile')}
                className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold text-xs uppercase tracking-widest shadow-lg shadow-indigo-600/20"
              >
                Go to My Profile
              </button>
           </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto h-full grid grid-cols-12 gap-6 pb-20 md:pb-0">
        {/* Desktop Navigation Column */}
        <nav className="hidden md:flex col-span-3 flex-col gap-4 sticky top-6 h-[calc(100vh-3rem)]">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col gap-1 overflow-y-auto no-scrollbar">
            <div className="flex items-center gap-3 mb-6 px-2">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                <Heart size={20} className="fill-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800 leading-tight">Milan</h1>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Matrimony</p>
              </div>
            </div>
            
            <NavGroup title="Explore">
              <NavButton active={view === 'browse'} onClick={() => setView('browse')} icon={LayoutGrid} label="Browse Matches" />
              <NavButton active={view === 'proposals'} onClick={() => setView('proposals')} icon={Bell} label="Interests" />
            </NavGroup>

            <NavGroup title="Activity">
              <NavButton active={view === 'shortlisted'} onClick={() => setView('shortlisted')} icon={Heart} label="Shortlisted" />
              <NavButton active={view === 'viewed-me'} onClick={() => setView('viewed-me')} icon={Eye} label="Who Viewed Me" />
              <NavButton active={view === 'viewed-by-me'} onClick={() => setView('viewed-by-me')} icon={Clock} label="Viewed By Me" />
            </NavGroup>

            <NavGroup title="Account">
              <NavButton active={view === 'profile'} onClick={() => setView('profile')} icon={User} label="My Profile" />
              <NavButton active={view === 'edit-profile'} onClick={() => setView('edit-profile')} icon={Settings} label="Edit Profile" />
              <NavButton active={view === 'photos'} onClick={() => setView('photos')} icon={Camera} label="Photo Gallery" />
              <NavButton active={view === 'hidden'} onClick={() => setView('hidden')} icon={EyeOff} label="Hidden Profiles" />
              <NavButton active={view === 'settings'} onClick={() => setView('settings')} icon={Trash2} label="Settings" />
            </NavGroup>
          </div>

          <div className="bg-indigo-600 rounded-xl shadow-xl p-4 text-white">
            <h3 className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest mb-3">Premium Status</h3>
            <p className="text-xs font-medium leading-relaxed mb-4">Upgrade to send unlimited messages and view hidden photos.</p>
            <button className="w-full bg-white text-indigo-600 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-indigo-50 transition-colors">
              Upgrade Now
            </button>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="col-span-12 md:col-span-9 flex flex-col gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 py-2 px-6 flex justify-between items-center z-40">
        <MobileNavButton active={view === 'browse'} onClick={() => setView('browse')} icon={LayoutGrid} />
        <MobileNavButton active={view === 'proposals'} onClick={() => setView('proposals')} icon={Bell} />
        <MobileNavButton active={view === 'shortlisted'} onClick={() => setView('shortlisted')} icon={Heart} />
        <MobileNavButton active={view === 'profile'} onClick={() => setView('profile')} icon={User} />
        <MobileNavButton active={view === 'settings'} onClick={() => setView('settings')} icon={Settings} />
      </nav>
    </div>
  );
}

function NavGroup({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="py-2">
      <h3 className="px-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">{title}</h3>
      {children}
    </div>
  );
}

function NavButton({ active, icon: Icon, onClick, label }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
        active ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
      }`}
    >
      <Icon size={16} />
      <span>{label}</span>
      {active && (
        <div className="ml-auto w-1 h-3 bg-indigo-600 rounded-full" />
      )}
    </button>
  );
}

function MobileNavButton({ active, icon: Icon, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`p-3 rounded-xl transition-all ${
        active ? 'text-indigo-600 bg-indigo-50' : 'text-slate-400'
      }`}
    >
      <Icon size={20} />
    </button>
  );
}

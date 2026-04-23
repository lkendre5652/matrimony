/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { User, Heart, Settings, Bell, Search, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ProfileView from './components/ProfileView';
import EditProfileForm from './components/EditProfileForm';
import ProposalManager from './components/ProposalManager';
import { MOCK_PROFILE } from './mockData';
import { UserProfile, Proposal } from './types';

type ViewState = 'browse' | 'profile' | 'edit-profile' | 'proposals';

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

  const renderContent = () => {
    switch (view) {
      case 'profile':
        return (
          <ProfileView 
            profile={profile} 
            onSendProposal={() => {
              console.log('Proposal sent (demo)');
            }} 
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
      default:
        return (
           <div className="flex flex-col items-center justify-center min-h-[80vh] text-[#8E8E8E]">
              <Search size={48} className="mb-4 opacity-20" />
              <p>Explore matches coming soon...</p>
              <button 
                onClick={() => setView('profile')}
                className="mt-4 text-[#5A5A40] font-medium underline"
              >
                Go to Profile
              </button>
           </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto h-full grid grid-cols-12 gap-6">
        {/* Desktop Navigation Column */}
        <nav className="hidden md:flex col-span-3 flex-col gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col gap-2">
            <div className="flex items-center gap-3 mb-6 px-2">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                <Heart size={20} className="fill-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800 leading-tight">Milan</h1>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Matrimony</p>
              </div>
            </div>
            
            <NavButton active={view === 'browse'} onClick={() => setView('browse')} icon={LayoutGrid} label="Browse Matches" />
            <NavButton active={view === 'proposals'} onClick={() => setView('proposals')} icon={Bell} label="Interests" />
            <NavButton active={view === 'profile'} onClick={() => setView('profile')} icon={User} label="My Profile" />
            <NavButton active={view === 'edit-profile'} onClick={() => setView('edit-profile')} icon={Settings} label="Edit Account" />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Quick Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Profile Strength</span>
                <span className="font-bold text-green-600">85%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[85%]"></div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="col-span-12 md:col-span-9 flex flex-col gap-6">
          {/* Top Mobile/Small Screen Navigation Tabs */}
          <div className="md:hidden bg-white rounded-xl shadow-sm border border-slate-200 p-1 flex">
            <button 
              onClick={() => setView('browse')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${view === 'browse' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500'}`}
            >
              Browse
            </button>
            <button 
              onClick={() => setView('proposals')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${view === 'proposals' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500'}`}
            >
              Interests
            </button>
            <button 
              onClick={() => setView('profile')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${view === 'profile' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500'}`}
            >
              Profile
            </button>
          </div>

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

      {/* Mobile Navigation Bar - Fixed at bottom for extra accessibility */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 py-2 px-6 flex justify-between items-center z-50">
        <MobileNavButton active={view === 'browse'} onClick={() => setView('browse')} icon={LayoutGrid} />
        <MobileNavButton active={view === 'proposals'} onClick={() => setView('proposals')} icon={Bell} />
        <MobileNavButton active={view === 'profile'} onClick={() => setView('profile')} icon={User} />
        <button 
          onClick={() => setView('edit-profile')}
          className={`p-3 rounded-xl transition-all ${view === 'edit-profile' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
        >
          <Settings size={20} />
        </button>
      </nav>
    </div>
  );
}

function NavButton({ active, icon: Icon, onClick, label }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
        active ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
      }`}
    >
      <Icon size={18} />
      <span>{label}</span>
      {active && (
        <div className="ml-auto w-1 h-4 bg-indigo-600 rounded-full" />
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

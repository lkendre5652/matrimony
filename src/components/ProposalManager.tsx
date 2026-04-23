import React from 'react';
import { motion } from 'motion/react';
import { Proposal, UserProfile } from '../types';
import { Check, X, ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react';

interface ProposalManagerProps {
  receivedProposals: (Proposal & { sender: Partial<UserProfile> })[];
  sentProposals: (Proposal & { receiver: Partial<UserProfile> })[];
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
}

export default function ProposalManager({ receivedProposals, sentProposals, onAccept, onDecline }: ProposalManagerProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full pb-20 md:pb-0">
      {/* Received Interests */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-full min-h-[400px]">
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
            <ArrowDownLeft size={20} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800">Incoming Requests</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Received recently</p>
          </div>
        </div>

        <div className="p-4 space-y-3 flex-1 overflow-auto">
          {receivedProposals.length === 0 ? (
            <div className="h-full flex items-center justify-center p-12 text-center">
              <p className="text-xs text-slate-400 font-medium">No new requests</p>
            </div>
          ) : (
            receivedProposals.map((proposal) => (
              <motion.div 
                key={proposal.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-50 border border-slate-100 p-3 rounded-lg flex items-center justify-between group hover:border-indigo-200 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img 
                    src={proposal.sender.photos?.[0]} 
                    alt={proposal.sender.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="text-xs font-bold text-slate-800 truncate">{proposal.sender.name}</h3>
                    <p className="text-[10px] text-slate-500 truncate">{proposal.sender.profession}</p>
                    <div className="flex items-center gap-1.5 mt-1 text-[9px] text-slate-400 font-bold uppercase tracking-tighter">
                       <Clock size={10} />
                       <span>{new Date(proposal.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-1 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => onDecline(proposal.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Decline"
                  >
                    <X size={16} />
                  </button>
                  <button 
                    onClick={() => onAccept(proposal.id)}
                    className="p-1.5 text-indigo-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                    title="Accept"
                  >
                    <Check size={16} />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </section>

      {/* Sent Proposals */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-full min-h-[400px]">
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <div className="p-2 bg-slate-50 text-slate-600 rounded-lg">
            <ArrowUpRight size={20} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800">Sent Proposals</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Awaiting response</p>
          </div>
        </div>

        <div className="p-4 space-y-3 flex-1 overflow-auto">
           {sentProposals.map((proposal) => (
             <div 
               key={proposal.id}
               className="bg-slate-50/50 border border-slate-100 p-3 rounded-lg flex items-center justify-between transition-all hover:bg-slate-50"
             >
                <div className="flex items-center gap-3 min-w-0">
                   <img src={proposal.receiver.photos?.[0]} className="w-10 h-10 rounded-lg object-cover" alt="" />
                   <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-800 truncate">{proposal.receiver.name}</h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                        <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">{proposal.status}</span>
                      </div>
                   </div>
                </div>
                <button className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 uppercase tracking-widest">View Profile</button>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
}

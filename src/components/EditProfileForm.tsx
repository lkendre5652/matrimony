import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  User, 
  Briefcase, 
  Users, 
  Heart,
  Camera
} from 'lucide-react';
import { UserProfile } from '../types';

interface EditProfileFormProps {
  initialData: UserProfile;
  onSave: (data: UserProfile) => void;
  onCancel: () => void;
}

const STEPS = [
  { id: 'basic', title: 'Basic Info', icon: User },
  { id: 'pro', title: 'Career & Education', icon: Briefcase },
  { id: 'family', title: 'Family Details', icon: Users },
  { id: 'about', title: 'About & Desires', icon: Heart },
];

export default function EditProfileForm({ initialData, onSave, onCancel }: EditProfileFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<UserProfile>(initialData);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onSave(formData);
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateFamilyField = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      familyDetails: { ...prev.familyDetails, [field]: value }
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#8E8E8E]">Full Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#EAE2D6] focus:ring-2 focus:ring-[#5A5A40] focus:border-transparent outline-none transition-all"
                  placeholder="Priya Sharma"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#8E8E8E]">Age</label>
                <input 
                  type="number" 
                  value={formData.age}
                  onChange={(e) => updateField('age', parseInt(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#EAE2D6] focus:ring-2 focus:ring-[#5A5A40] focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#8E8E8E]">Location</label>
              <input 
                type="text" 
                value={formData.location}
                onChange={(e) => updateField('location', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-[#EAE2D6] focus:ring-2 focus:ring-[#5A5A40] focus:border-transparent outline-none transition-all"
                placeholder="Mumbai, India"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#8E8E8E]">Religion</label>
                  <select 
                    value={formData.religion}
                    onChange={(e) => updateField('religion', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#EAE2D6] outline-none"
                  >
                    <option>Hindu</option>
                    <option>Sikh</option>
                    <option>Jain</option>
                    <option>Christian</option>
                    <option>Muslim</option>
                  </select>
               </div>
               <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#8E8E8E]">Mother Tongue</label>
                  <input 
                    type="text" 
                    value={formData.motherTongue}
                    onChange={(e) => updateField('motherTongue', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#EAE2D6] outline-none"
                    placeholder="Hindi"
                  />
               </div>
            </div>
          </motion.div>
        );
      case 1:
        return (
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className="space-y-6"
          >
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#8E8E8E]">Profession</label>
              <input 
                type="text" 
                value={formData.profession}
                onChange={(e) => updateField('profession', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-[#EAE2D6] focus:ring-2 focus:ring-[#5A5A40] outline-none transition-all"
                placeholder="Senior Product Manager"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#8E8E8E]">Highest Education</label>
              <input 
                type="text" 
                value={formData.education}
                onChange={(e) => updateField('education', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-[#EAE2D6] focus:ring-2 focus:ring-[#5A5A40] outline-none transition-all"
                placeholder="MBA from Ivy League"
              />
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#8E8E8E]">Father's Profession</label>
                <input 
                  type="text" 
                  value={formData.familyDetails.fatherProfession}
                  onChange={(e) => updateFamilyField('fatherProfession', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#EAE2D6] outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#8E8E8E]">Mother's Profession</label>
                <input 
                  type="text" 
                  value={formData.familyDetails.motherProfession}
                  onChange={(e) => updateFamilyField('motherProfession', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#EAE2D6] outline-none"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#8E8E8E]">Family Values</label>
              <div className="flex gap-2">
                {['Traditional', 'Moderate', 'Liberal'].map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => updateFamilyField('familyValues', val)}
                    className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-all ${
                      formData.familyDetails.familyValues === val 
                      ? 'bg-[#5A5A40] text-white border-[#5A5A40]' 
                      : 'bg-white text-[#555] border-[#EAE2D6] hover:bg-[#F5F5F0]'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className="space-y-6"
          >
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#8E8E8E]">Short Bio</label>
              <textarea 
                rows={4}
                value={formData.bio}
                onChange={(e) => updateField('bio', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-[#EAE2D6] outline-none resize-none focus:ring-2 focus:ring-[#5A5A40]"
                placeholder="Tell others about yourself..."
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#8E8E8E]">Partner Expectations</label>
              <textarea 
                rows={4}
                value={formData.expectations}
                onChange={(e) => updateField('expectations', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-[#EAE2D6] outline-none resize-none focus:ring-2 focus:ring-[#5A5A40]"
                placeholder="What are you looking for in a partner?"
              />
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-full overflow-hidden">
      {/* Form Header */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-slate-100">
        <button onClick={onCancel} className="text-slate-400 hover:text-slate-600 transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div className="flex flex-col items-center">
          <h1 className="text-base font-bold text-slate-800">Edit Profile</h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Step {currentStep + 1} of {STEPS.length}</p>
        </div>
        <div className="w-5" />
      </header>

      {/* Progress Stepper */}
      <div className="px-8 pt-6 pb-4 bg-slate-50 border-b border-slate-100">
        <div className="flex items-center w-full relative">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center flex-1 z-10">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive ? 'bg-indigo-600 text-white shadow-md' : 
                      isCompleted ? 'bg-green-500 text-white' : 
                      'bg-slate-200 text-slate-500'
                    } text-xs font-bold mb-1.5`}
                  >
                    {isCompleted ? <Check size={14} /> : <span>{index + 1}</span>}
                  </div>
                  <span className={`text-[9px] font-bold uppercase tracking-wider ${
                    isActive ? 'text-indigo-600' : 'text-slate-400'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div className={`h-[1px] flex-1 -mt-4 transition-colors duration-300 ${
                    index < currentStep ? 'bg-green-500' : 'bg-slate-200'
                  }`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <main className="flex-1 px-8 py-8 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-800">{STEPS[currentStep].title}</h2>
          <p className="text-sm text-slate-500">Please provide accurate information for better matching.</p>
        </div>
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </main>

      {/* Footer Navigation */}
      <footer className="px-8 py-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
        {currentStep > 0 ? (
          <button 
            onClick={handlePrev}
            className="px-6 py-2 text-sm font-bold text-slate-600 hover:text-slate-800 flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Previous
          </button>
        ) : <div />}
        
        <div className="flex gap-3">
          <button 
            onClick={onCancel}
            className="px-6 py-2 text-sm font-bold text-slate-500 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
          >
            Cancel
          </button>
          <button 
            onClick={handleNext}
            className="px-8 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm flex items-center gap-2"
          >
            {currentStep === STEPS.length - 1 ? 'Save Changes' : 'Continue'}
            <ArrowRight size={16} />
          </button>
        </div>
      </footer>
    </div>
  );
}

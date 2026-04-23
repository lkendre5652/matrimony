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
  Camera,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { UserProfile } from '../types';

interface EditProfileFormProps {
  initialData: UserProfile;
  onSave: (data: UserProfile) => void;
  onCancel: () => void;
}

const STEPS = [
  { id: 'basic', title: 'Identity', description: 'Core personal details', icon: User },
  { id: 'pro', title: 'Career', description: 'Professional background', icon: Briefcase },
  { id: 'family', title: 'Heritage', description: 'Family and values', icon: Users },
  { id: 'about', title: 'Lifestyle', description: 'Personal bio & desires', icon: Sparkles },
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
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput 
                label="Full Name" 
                value={formData.name} 
                onChange={(v) => updateField('name', v)} 
                placeholder="e.g. Priya Sharma"
              />
              <FormInput 
                label="Age" 
                type="number"
                value={formData.age} 
                onChange={(v) => updateField('age', parseInt(v))} 
              />
            </div>
            
            <FormInput 
              label="Current Location" 
              value={formData.location} 
              onChange={(v) => updateField('location', v)} 
              placeholder="Mumbai, Maharashtra"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <FormSelect 
                label="Religion" 
                value={formData.religion} 
                options={['Hindu', 'Sikh', 'Jain', 'Christian', 'Muslim']}
                onChange={(v) => updateField('religion', v)} 
               />
               <FormInput 
                label="Caste / Community" 
                value={formData.caste} 
                onChange={(v) => updateField('caste', v)} 
                placeholder="Optional"
               />
               <FormInput 
                label="Mother Tongue" 
                value={formData.motherTongue} 
                onChange={(v) => updateField('motherTongue', v)} 
                placeholder="e.g. Hindi"
               />
            </div>
          </motion.div>
        );
      case 1:
        return (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <FormInput 
                label="Current Profession" 
                value={formData.profession} 
                onChange={(v) => updateField('profession', v)} 
                placeholder="Senior Software Engineer"
                icon={Briefcase}
              />
              <FormInput 
                label="Highest Educational Degree" 
                value={formData.education} 
                onChange={(v) => updateField('education', v)} 
                placeholder="B.Tech from NIT Nagpur"
                icon={GraduationCap}
              />
              <div className="grid grid-cols-2 gap-6">
                 <FormInput label="College / University" value="IIT Bombay" onChange={() => {}} />
                 <FormSelect label="Annual Income" value="₹ 15L - 25L" options={['< 5L', '5L-10L', '10L-20L', '20L-30L', '30L+']} onChange={() => {}} />
              </div>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput 
                label="Father's Profession" 
                value={formData.familyDetails.fatherProfession} 
                onChange={(v) => updateFamilyField('fatherProfession', v)} 
              />
              <FormInput 
                label="Mother's Profession" 
                value={formData.familyDetails.motherProfession} 
                onChange={(v) => updateFamilyField('motherProfession', v)} 
              />
            </div>
            
            <div className="space-y-4">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Family Values</label>
              <div className="flex gap-3">
                {['Traditional', 'Moderate', 'Liberal'].map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => updateFamilyField('familyValues', val)}
                    className={`flex-1 py-3.5 px-4 rounded-xl border-2 font-bold text-xs transition-all ${
                      formData.familyDetails.familyValues === val 
                      ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/10' 
                      : 'bg-white text-slate-500 border-slate-100 hover:border-indigo-200'
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
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">About Me</label>
                <textarea 
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => updateField('bio', e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-sm font-medium leading-relaxed resize-none"
                  placeholder="Tell your potential life partner about your personality, hobbies, and outlook on life..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">What I'm Looking For</label>
                <textarea 
                  rows={4}
                  value={formData.expectations}
                  onChange={(e) => updateField('expectations', e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-sm font-medium leading-relaxed resize-none"
                  placeholder="Describe your ideal partner's qualities, education, and family background..."
                />
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 flex flex-col h-full overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-12 h-full">
        {/* Left Sidebar Info */}
        <aside className="md:col-span-4 bg-slate-900 p-8 text-white flex flex-col">
           <button onClick={onCancel} className="mb-12 flex items-center gap-2 text-white/50 hover:text-white transition-colors group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest">Back to Profile</span>
           </button>

           <div className="mb-12">
              <h2 className="text-2xl font-display font-bold mb-2">Refine Your Brand</h2>
              <p className="text-sm text-slate-400 leading-relaxed font-medium">Your profile is the first impression you make. Keep it updated and detailed for 5x better matches.</p>
           </div>

           <nav className="space-y-2">
              {STEPS.map((step, index) => (
                 <div 
                  key={step.id}
                  className={`flex items-start gap-4 p-4 rounded-2xl transition-all ${
                    index === currentStep ? 'bg-white/10 shadow-xl' : 'opacity-40'
                  }`}
                 >
                    <div className={`p-2 rounded-lg ${index === currentStep ? 'bg-indigo-500 text-white' : 'bg-white/10'}`}>
                       <step.icon size={18} />
                    </div>
                    <div>
                       <h3 className="text-sm font-bold tracking-tight">{step.title}</h3>
                       <p className="text-[10px] text-slate-400 font-medium">{step.description}</p>
                    </div>
                    {index < currentStep && (
                       <Check size={16} className="ml-auto text-green-400 mt-1" />
                    )}
                 </div>
              ))}
           </nav>

           <div className="mt-auto pt-8">
              <div className="flex justify-between items-center mb-2">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total Completion</span>
                 <span className="text-[10px] font-bold text-indigo-400">85%</span>
              </div>
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                 <div className="h-full bg-indigo-500 w-[85%]" />
              </div>
           </div>
        </aside>

        {/* Form Content */}
        <div className="md:col-span-8 flex flex-col bg-white">
           <header className="px-10 py-8 border-b border-slate-100 flex justify-between items-center">
              <div>
                 <h1 className="text-xl font-display font-bold text-slate-800">{STEPS[currentStep].title}</h1>
                 <p className="text-xs text-slate-500 font-medium">{STEPS[currentStep].description}</p>
              </div>
              <div className="flex items-center gap-1">
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-2">Step</span>
                 {STEPS.map((_, i) => (
                    <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentStep ? 'w-6 bg-indigo-600' : 'bg-slate-200'}`} />
                 ))}
              </div>
           </header>

           <main className="flex-1 px-10 py-10 overflow-y-auto no-scrollbar">
              <AnimatePresence mode="wait">
                 {renderStep()}
              </AnimatePresence>
           </main>

           <footer className="px-10 py-8 bg-slate-50/80 backdrop-blur-md border-t border-slate-100 flex justify-between items-center sticky bottom-0">
              <button 
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-800 disabled:opacity-0 transition-all"
              >
                 <ArrowLeft size={16} /> Previous
              </button>
              
              <div className="flex gap-4">
                 <button onClick={onCancel} className="hidden sm:block text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest">
                    Cancel Changes
                 </button>
                 <button 
                  onClick={handleNext}
                  className="px-8 py-3.5 bg-indigo-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2"
                 >
                    {currentStep === STEPS.length - 1 ? 'Save Profile' : 'Continue'}
                    <ArrowRight size={16} />
                 </button>
              </div>
           </footer>
        </div>
      </div>
    </div>
  );
}

function FormInput({ label, value, onChange, type = 'text', placeholder, icon: Icon }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
         {Icon && <Icon size={12} className="text-indigo-400" />} {label}
      </label>
      <input 
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-sm font-bold text-slate-700"
        placeholder={placeholder}
      />
    </div>
  );
}

function FormSelect({ label, value, onChange, options }: any) {
   return (
      <div className="space-y-2">
         <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</label>
         <select 
            value={value} 
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-sm font-bold text-slate-700 appearance-none"
         >
            {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
         </select>
      </div>
   );
}

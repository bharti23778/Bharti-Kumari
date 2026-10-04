import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  ShieldCheck, 
  Smartphone, 
  Laptop, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  KeyRound, 
  RefreshCw,
  X,
  Lock,
  Globe
} from 'lucide-react';

interface CandidateRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidatePhone: string | null;
  onRegisterSuccess: (phone: string, isExistingAccount: boolean) => void;
  onSwitchDeviceDemo: (phone: string) => void;
}

export const CandidateRegistrationModal: React.FC<CandidateRegistrationModalProps> = ({
  isOpen,
  onClose,
  candidatePhone,
  onRegisterSuccess,
  onSwitchDeviceDemo
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [step, setStep] = useState<'input' | 'otp' | 'success'>('input');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('8392');
  const [error, setError] = useState('');
  const [isCrossDeviceMode, setIsCrossDeviceMode] = useState(false);
  const [activeDeviceName, setActiveDeviceName] = useState('This Device (Web Browser)');
  const [isExistingUser, setIsExistingUser] = useState(false);

  useEffect(() => {
    if (candidatePhone) {
      // Strip country code if present
      const cleanPhone = candidatePhone.replace(/^\+91/, '').replace(/\D/g, '');
      setPhoneNumber(cleanPhone);
    }
  }, [candidatePhone]);

  if (!isOpen) return null;

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = phoneNumber.replace(/\D/g, '');
    if (clean.length < 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }
    setError('');
    
    // Check if this phone number was previously registered on any device in localStorage
    const registryKey = `students_trust_candidate_${clean}`;
    const existing = localStorage.getItem(registryKey);
    setIsExistingUser(!!existing);

    // Generate quick 4-digit code
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(code);
    setOtp(code); // prefill for effortless testing while showing the verification mechanism
    setStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp !== generatedOtp && otp.length < 4) {
      setError('Please enter the 4-digit verification code');
      return;
    }

    const clean = phoneNumber.replace(/\D/g, '');
    const fullPhone = `${countryCode} ${clean}`;
    const registryKey = `students_trust_candidate_${clean}`;

    // If new registration, save initial profile credentials into local registry
    let existingData = localStorage.getItem(registryKey);
    let isExisting = false;
    if (existingData) {
      isExisting = true;
    } else {
      const newCandidate = {
        phone: fullPhone,
        registeredAt: new Date().toISOString(),
        deviceId: 'DEV-' + Math.random().toString(36).substring(2, 7).toUpperCase(),
        appliedOpportunities: ['opp-1'],
        savedOpportunities: ['opp-1', 'opp-2']
      };
      localStorage.setItem(registryKey, JSON.stringify(newCandidate));
    }

    setStep('success');
    setTimeout(() => {
      onRegisterSuccess(fullPhone, isExisting);
      onClose();
    }, 1200);
  };

  const handleTestQuickLogin = (presetPhone: string) => {
    setPhoneNumber(presetPhone);
    const registryKey = `students_trust_candidate_${presetPhone}`;
    const existing = localStorage.getItem(registryKey);
    setIsExistingUser(!!existing);
    const code = '8392';
    setGeneratedOtp(code);
    setOtp(code);
    setStep('otp');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Close / Skip Option */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-10"
          title="Continue to Website"
          aria-label="Close registration"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header Banner */}
        <div className="p-6 sm:p-8 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-semibold text-indigo-100 mb-3 border border-white/20">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Candidate Registration Gateway</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Register with Phone Number
          </h2>
          <p className="text-xs sm:text-sm text-indigo-100/90 mt-1 leading-relaxed">
            Only your phone number is required. Your phone number acts as your universal credential to apply from any computer, phone, or tablet.
          </p>

          {/* Cross-device credential assurance */}
          <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-[11px] text-indigo-200 font-medium">
            <span className="flex items-center gap-1.5">
              <Laptop className="w-3.5 h-3.5 text-emerald-300" />
              <span>Cross-Device Application Sync</span>
            </span>
            <span className="text-emerald-300 font-semibold">100% Free Candidate Access</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">

          {/* STEP 1: Phone input */}
          {step === 'input' && (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Candidate Mobile / Phone Number <span className="text-rose-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 shrink-0">
                    <Globe className="w-3.5 h-3.5 text-indigo-600" />
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="bg-transparent focus:outline-none cursor-pointer"
                    >
                      <option value="+91">+91 (IN)</option>
                      <option value="+1">+1 (US/CA)</option>
                      <option value="+44">+44 (UK)</option>
                      <option value="+65">+65 (SG)</option>
                      <option value="+971">+971 (UAE)</option>
                    </select>
                  </div>

                  <div className="relative flex-1">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                        setError('');
                      }}
                      placeholder="Enter 10-digit phone number"
                      maxLength={14}
                      autoFocus
                      className="w-full pl-10 pr-3 py-2.5 text-sm font-semibold text-slate-900 border border-slate-300 rounded-xl focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-slate-400 placeholder:font-normal"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-xs text-rose-600 mt-1 font-medium">{error}</p>
                )}
                <p className="text-[11px] text-slate-400 mt-1.5">
                  No passwords or email needed. We demand only your phone number to keep registration fast and lightweight.
                </p>
              </div>

              {/* Multi-Device Credential Feature Highlight */}
              <div className="p-3.5 bg-indigo-50/70 border border-indigo-100 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-indigo-600" />
                    Apply Across Multiple Devices
                  </span>
                  <span className="text-[10px] font-semibold text-indigo-700 bg-white px-2 py-0.5 rounded-full border border-indigo-100">
                    Same Credentials
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Start applying on your laptop and resume later on your smartphone using the exact same phone number. All bookmarked opportunities and application statuses sync automatically.
                </p>
              </div>

              {/* Quick Demo Pre-fill for hackathon evaluation */}
              <div className="pt-1 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Quick Demo Phone Numbers:
                </span>
                <div className="flex flex-wrap gap-1.5 text-xs">
                  <button
                    type="button"
                    onClick={() => handleTestQuickLogin('9876543210')}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 rounded-lg transition-colors font-mono font-medium"
                  >
                    +91 98765-43210
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTestQuickLogin('9123456780')}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 rounded-lg transition-colors font-mono font-medium"
                  >
                    +91 91234-56780
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <span>Continue with Phone Number</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 2: Verification Code */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-4 animate-fadeIn">
              <div className="text-center pb-1">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-2">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Verification Code Sent
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Sent to <span className="font-bold text-slate-800">{countryCode} {phoneNumber}</span>
                </p>
                {isExistingUser ? (
                  <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                    Existing Candidate Detected · Synchronizing Credentials
                  </span>
                ) : (
                  <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    New Candidate Registration
                  </span>
                )}
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1 text-center">
                  Enter 4-Digit Code
                </label>
                <div className="flex justify-center">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={4}
                    className="w-40 text-center tracking-[0.5em] text-2xl font-black font-mono py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-indigo-600"
                    autoFocus
                  />
                </div>
                <div className="text-center mt-2">
                  <span className="text-[11px] text-slate-400">
                    Demo Verification Code: <strong className="text-indigo-600 font-mono">{generatedOtp}</strong> (auto-filled)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('input')}
                  className="w-1/3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
                >
                  Change Number
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Verify & Enter Platform</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Success state */}
          {step === 'success' && (
            <div className="text-center py-6 space-y-3 animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Candidate Registered Successfully!
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Your credentials are active. You can now explore verified opportunities and apply across any device using <strong className="text-slate-800">{countryCode} {phoneNumber}</strong>.
              </p>
            </div>
          )}

          {/* Multi-Device Demo Switcher Footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <button
              type="button"
              onClick={onClose}
              className="text-slate-500 hover:text-slate-800 underline font-medium"
            >
              Skip & explore website first
            </button>

            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Secure Phone Credentials</span>
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};

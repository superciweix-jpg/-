
// Singleton AudioContext to manage browser resources efficiently
let audioCtx: AudioContext | null = null;

// Initialize or recover AudioContext
const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;

  if (!audioCtx) {
    const Ctx = window.AudioContext || (window as any).webkitAudioContext;
    if (Ctx) {
      audioCtx = new Ctx();
    }
  }

  // Auto-resume logic for modern browsers (Chrome/iOS) that suspend audio until interaction
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }

  return audioCtx;
};

export type FeedbackType = 'light' | 'success';

export const triggerFeedback = (type: FeedbackType = 'light') => {
  // --- 1. Haptic Feedback (Physical Vibration) ---
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    if (type === 'success') {
      // Sharp, crisp mechanical click vibration
      navigator.vibrate(15); 
    } else {
      // Extremely subtle tap for navigation
      navigator.vibrate(5);
    }
  }

  // --- 2. Audio Synthesis (Industrial Sound Design) ---
  const ctx = getAudioContext();
  if (!ctx) return;

  const t = ctx.currentTime;
  const masterGain = ctx.createGain();
  masterGain.connect(ctx.destination);

  if (type === 'light') {
    // === SOUND A: "The Tap" (Navigation) ===
    // Physics: Simulating a finger tapping a solid surface.
    // Spec: 150Hz Sine wave, extremely short envelope.
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(masterGain);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, t); // Low frequency thud

    // Envelope: Fast Attack -> Fast Decay (Total 0.03s)
    // This creates the "physical" sensation rather than a "tone"
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.4, t + 0.005); // Attack (5ms)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03); // Decay to silence

    osc.start(t);
    osc.stop(t + 0.04); // Cleanup

  } else {
    // === SOUND B: "The Mechanical Lock" (Success) ===
    // Physics: Simulating a metal spring hitting a latch.
    // Composite Sound: High Frequency Impact + Lower Body Resonance

    // Layer 1: The "Click" (Metal Impact)
    const oscMetal = ctx.createOscillator();
    const gainMetal = ctx.createGain();
    oscMetal.connect(gainMetal);
    gainMetal.connect(masterGain);

    oscMetal.type = 'triangle'; // Triangle wave has odd harmonics, sounding "sharper"/metallic
    oscMetal.frequency.setValueAtTime(1200, t); // High pitch impact

    gainMetal.gain.setValueAtTime(0, t);
    gainMetal.gain.linearRampToValueAtTime(0.25, t + 0.002); // Immediate attack
    gainMetal.gain.exponentialRampToValueAtTime(0.001, t + 0.03); // Instant decay
    
    oscMetal.start(t);
    oscMetal.stop(t + 0.04);

    // Layer 2: The "Clack" (Mechanism Resonance)
    const oscBody = ctx.createOscillator();
    const gainBody = ctx.createGain();
    oscBody.connect(gainBody);
    gainBody.connect(masterGain);

    oscBody.type = 'sine'; // Sine for body weight
    oscBody.frequency.setValueAtTime(400, t);
    // Slight pitch decay to simulate energy loss
    oscBody.frequency.exponentialRampToValueAtTime(100, t + 0.06); 

    gainBody.gain.setValueAtTime(0, t);
    gainBody.gain.linearRampToValueAtTime(0.3, t + 0.005);
    gainBody.gain.exponentialRampToValueAtTime(0.001, t + 0.08); // Slightly longer tail

    oscBody.start(t);
    oscBody.stop(t + 0.1);
  }
};

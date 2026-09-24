import { useState, useEffect, useRef } from 'react';
import SlbBank from './SlbBank.jsx';

const categoryColors = {
  finances: { bg: '#EEEDFE', text: '#3C3489', border: '#AFA9EC' },
  body: { bg: '#FBEAF0', text: '#72243E', border: '#ED93B1' },
  relationship: { bg: '#E1F5EE', text: '#085041', border: '#5DCAA5' },
  purpose: { bg: '#FAEEDA', text: '#633806', border: '#EF9F27' },
  'life in general': { bg: '#EAF3DE', text: '#27500A', border: '#97C459' },
  'something else': { bg: '#FAECE7', text: '#712B13', border: '#F0997B' },
  world: { bg: '#E6F4F1', text: '#154D4F', border: '#8BC3C1' },
  career: { bg: '#E9EFF5', text: '#243E56', border: '#92ADC6' },
};

function PlayIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

function StopIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="6" y="6" width="12" height="12" rx="1" />
    </svg>
  );
}

function LoveBombCard({ bomb, trackingId, speakingId, onSpeak, onStop }) {
  const cleanKey = bomb?.key?.toLowerCase()?.trim() || '';
  const colors = categoryColors[cleanKey] || categoryColors.finances;
  const isSpeaking = speakingId === trackingId;
  const displayMessage = bomb.text || bomb.message || bomb.quote || "Empty message";

  return (
    <div
      style={{
        backgroundColor: colors.bg,
        border: `1px solid ${isSpeaking ? colors.border : 'rgba(0,0,0,0.1)'}`,
        borderRadius: '12px',
        padding: '1rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        color: colors.text,
        transition: 'all 0.2s ease',
        boxShadow: isSpeaking ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
      }}
    >
      <p style={{ margin: 0, fontSize: '1rem', lineHeight: 1.4, fontWeight: 500, color: colors.text }}>
        {displayMessage}
      </p>
      <div>
        <button
          onClick={(e) => {
            e.stopPropagation(); 
            console.log("Button clicked for ID:", trackingId); //put this in as a debug to find out where the button was breaking down
            if (isSpeaking) {
              onStop();
            } else {
              onSpeak(trackingId, displayMessage);
            }
          }}
          style={{
            background: 'rgba(255, 255, 255, 0.7)',
            border: `1px solid ${colors.border}`,
            borderRadius: '6px',
            padding: '0.4rem 0.75rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            cursor: 'pointer',
            color: colors.text,
            fontWeight: 600,
            fontSize: '0.85rem'
          }}
        >
          {isSpeaking ? <StopIcon /> : <PlayIcon />}
          <span>{isSpeaking ? 'Stop' : 'Listen'}</span>
        </button>
      </div>
    </div>
  );
}

function DisplayBank() {
  const [showBank, setShowBank] = useState(false);
  const [speakingId, setSpeakingId] = useState(null);
  const activeBank = SlbBank?.SlbBank || SlbBank || [];
  //upon a LOT of googling...there needs to be basically a placeholder of choosing all of the voices and utteranecs
  const activeUtteranceRef = useRef(null);
  const processingRef = useRef(false);

  const systemVoiceRef = useRef(null);

  useEffect(() => { //checks for various types of operating systems
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    const initializeSystemVoices = () => {
      const standardVoices = window.speechSynthesis.getVoices() || [];
      console.log("System Voice Engine Registered. Voices Found:", standardVoices.length);
      
      //find a basic voice
      const targetProfile = standardVoices.find(v => 
        (v.lang.startsWith('en-') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Premium'))) || 
        v.lang === 'en-US' || v.lang.startsWith('en')
      );

      if (targetProfile) {
        systemVoiceRef.current = targetProfile;
        console.log("Selected voice target profile:", targetProfile.name);
      }
    };

    initializeSystemVoices();

    //again...dealing with chrome meh
    window.speechSynthesis.onvoiceschanged = initializeSystemVoices;

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSpeak = (targetId, textToSpeak) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (processingRef.current) return;
    processingRef.current = true;

    setSpeakingId(targetId);
    window.speechSynthesis.cancel();

    setTimeout(() => {
      try {
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.rate = 1.0; //this can be changed if i want
        utterance.pitch = 1.0;

        if (systemVoiceRef.current) {
          utterance.voice = systemVoiceRef.current;
          utterance.lang = systemVoiceRef.current.lang;
        } else {
          utterance.lang = 'en-US';
        }

        //starting the speech
        utterance.onstart = () => {
          processingRef.current = false;
        };

        //on stop 
        utterance.onend = () => {
          setSpeakingId(null);
          activeUtteranceRef.current = null;
          processingRef.current = false;
        };

        utterance.onerror = (event) => {
          if (event.error === 'interrupted' || event.error === 'canceled') {
            return; 
          } //used google to help me come up with check points for play button click
          console.warn("Real hardware error encountered:", event.error);
          setSpeakingId(null);
          activeUtteranceRef.current = null;
          processingRef.current = false;
        };

        activeUtteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.error("Critical bug! Throw your hands in the ERROR ERROR", err);
        setSpeakingId(null);
        processingRef.current = false;
      }
    }, 150); 
  };

  const handleStop = () => {
    processingRef.current = false;
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setSpeakingId(null);
    activeUtteranceRef.current = null;
  };

  return (
    <div style={{ padding: '1rem 0', maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      
      <div>
        <button className = "button1"
          onClick={(e) => {
            e.stopPropagation();
            if (showBank) handleStop(); 
            setShowBank(!showBank);
          }}
        >
          {showBank ? 'Hide Love Bombs' : 'Show Love Bombs'}
        </button>
      </div>

      {showBank && (
        <div >
          <h2>
            Your Love Bombs
          </h2>
          {activeBank.map((bomb, index) => {
            const safeIdToken = bomb.id !== undefined && bomb.id !== null ? bomb.id : index;

            return (
              <LoveBombCard
                key={safeIdToken}
                bomb={bomb}
                trackingId={safeIdToken} 
                speakingId={speakingId}
                onSpeak={handleSpeak}
                onStop={handleStop}
              />
            );
          })}
        </div>
      )}
      
    </div>
  );
}

export default DisplayBank;

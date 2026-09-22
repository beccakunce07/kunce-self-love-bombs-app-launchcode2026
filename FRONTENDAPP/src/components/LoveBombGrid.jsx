import {useState} from "react";
import SlbBank from "./SlbBank.jsx";


const categoryColors = {
    "finances": {bg: "#EEEDFE", text: "#3C3489", border: "#AFA9EC"},
    "body": {bg: "#FBEAF0", text: "#72243E", border: "#ED93B1"},
    "relationship": {bg: "#E1F5EE", text: "#085041", border: "#5DCAA5"},
    "purpose": {bg: "#FAEEDA", text: "#633806", border: "#EF9F27"},
    "life in general": {bg: "#EAF3DE", text: "#27500A", border: "#97C459"},
    "something else": {bg: "#FAECE7", text: "#712B13", border: "#F0997B"},
}

function PlayIcon() {
    return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="5 3 19 12 5 21 5 3"/>
        </svg>
    );
}

function StopIcon() {
    return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="6" y="6" width="12" height="12" rx="1"/>
        </svg>
    );
}
//function LoveBombCar takes inthe bomb message, what voice they chose, the start and the stop button as parameters
function LoveBombCard({bomb, speakingId, onSpeak, onStop}) {
    const colors = categoryColors[bomb.key] || categoryColors["finances"];
    const isSpeaking = speakingId === bomb.id;

    return (
        <div style={{
            background: "var(--color-background-primary, #fff)",
            border: `0.5px solid ${isSpeaking ? colors.border : "rgba(0,0,0,0.1)"}`,
            borderRadius: 12,
            padding: "1rem 1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            transition: "border-color 0.2s",
        }}>
      <span style={{
          fontSize: 11,
          fontWeight: 500,
          color: colors.text,
          background: colors.bg,
          padding: "2px 10px",
          borderRadius: 20,
          alignSelf: "flex-start",
          letterSpacing: "0.02em",
      }}>
        {bomb.key}
      </span>

            <p style={{
                fontSize: 14,
                color: "var(--color-text-primary, #111)",
                lineHeight: 1.6,
                margin: 0,
                flex: 1,
            }}>
                {bomb.message}
            </p>

            <button
                onClick={() => isSpeaking ? onStop() : onSpeak(bomb)}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "6px 12px",
                    border: `0.5px solid ${colors.border}`,
                    borderRadius: 8,
                    background: isSpeaking ? colors.bg : "transparent",
                    color: colors.text,
                    fontSize: 12,
                    cursor: "pointer",
                    alignSelf: "flex-start",
                    transition: "background 0.15s",
                }}
            >
                {isSpeaking ? <StopIcon/> : <PlayIcon/>}
                {isSpeaking ? "Stop" : "Read aloud"}
            </button>
        </div>
    );
}

export default function LoveBombGrid({onSpeak}) {
    const [speakingId, setSpeakingId] = useState(null);

const handleSpeak = (bomb) => {
  if (!("speechSynthesis" in window)) return;

  // 1. Cancel any current speech
  window.speechSynthesis.cancel();

  // 2. Create the utterance object
  const utterance = new SpeechSynthesisUtterance(bomb.message);

  // 3. Set the state when speech ends
  utterance.onend = () => {
    setSpeakingId(null);
  };

  // 4. Handle errors (like user manually stopping)
  utterance.onerror = () => {
    setSpeakingId(null);
  };

  // 5. START THE SPEECH
  setSpeakingId(bomb.id);
  window.speechSynthesis.speak(utterance);

  // Optional: Keep your original onSpeak prop if the parent needs to know
  if (onSpeak) onSpeak(bomb.message);
};

    const handleStop = () => {
        window.speechSynthesis.cancel();
        setSpeakingId(null);
    };

    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 12,
            padding: "1rem 0",
        }}>
            {SlbBank.map((bomb) => (
                <LoveBombCard
                    key={bomb.id}
                    bomb={bomb}
                    speakingId={speakingId}
                    onSpeak={handleSpeak}
                    onStop={handleStop}
                />
            ))}
        </div>
    );
}



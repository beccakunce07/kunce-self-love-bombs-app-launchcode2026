// not using this file - updated using LoveBombGrid.jsx
import {useState, useEffect} from 'react';
import LoveBombGrid from "./LoveBombGrid.jsx";

function DisplayBank() {
    const [voices, setVoices] = useState([]);
    const [selectedVoiceName, setSelectedVoiceName] = useState("");

    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);
            if (availableVoices.length > 0 && !selectedVoiceName) {
                setSelectedVoiceName(availableVoices[0].name);
            }
        };

        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }, [selectedVoiceName]);

    const handlePlay = (text) => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        const voice = voices.find((v) => v.name === selectedVoiceName);
        if (voice) {
            utterance.voice = voice;
        }
        window.speechSynthesis.speak(utterance);
    };

    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1rem" }}>
                <label htmlFor="voice-select">Voice:</label>
                <select
                    id="voice-select"
                    value={selectedVoiceName}
                    onChange={(e) => setSelectedVoiceName(e.target.value)}
                >
                    {voices.map((v) => (
                        <option key={v.name} value={v.name}>{v.name}</option>
                    ))}
                </select>
            </div>
            <LoveBombGrid onSpeak={handlePlay} />
        </div>
    );
}

export default DisplayBank;

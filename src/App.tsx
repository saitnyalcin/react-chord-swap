// Import necessary modules and components from React and other libraries
import { useEffect, useRef, useState } from "react";
import { PitchDetector } from "pitchy";
import GuitarChord from "react-guitar-chord";

function App() {
  // Create references to various elements and objects using useRef
  const pitchRef = useRef<HTMLSpanElement>(null);
  const clarityRef = useRef<HTMLSpanElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserNodeRef = useRef<AnalyserNode | null>(null);
  const inputRef = useRef<Float32Array | null>(null);
  const detectorRef = useRef<PitchDetector<Float32Array> | null>(null);

  // State to store the currently detected chord
  const [currentChord, setCurrentChord] = useState<string | null>(null);

  // Function to update the pitch and perform chord detection
  const updatePitch = () => {
    if (!analyserNodeRef.current || !detectorRef.current || !inputRef.current) {
      return; // If necessary elements are not available, return early
    }

    const input = inputRef.current;
    analyserNodeRef.current.getFloatTimeDomainData(input);

    // Detect pitch and clarity using the PitchDetector
    const [pitch, clarity] = detectorRef.current.findPitch(
      input,
      audioContextRef.current!.sampleRate
    );

    // Perform chord detection using the detected pitch
    const detectedChord = detectChord(pitch);
    setCurrentChord(detectedChord);

    // Update the displayed pitch and clarity values
    if (pitchRef.current && clarityRef.current) {
      pitchRef.current.textContent = `${Math.round(pitch * 10) / 10} Hz`;
      clarityRef.current.textContent = `${Math.round(clarity * 100)} %`;
    }

    // Schedule the updatePitch function to run again after a delay
    window.setTimeout(updatePitch, 100);
  };

  // Function to handle clicking the "Start Pitch Detector" button
  const onDetectPitchClick = () => {
    if (
      audioContextRef.current &&
      audioContextRef.current.state === "suspended"
    ) {
      audioContextRef.current.resume(); // Resume audio context if it's suspended
    }
  };

  // Function to detect the closest chord based on the detected frequency
  const detectChord = (frequency: number) => {
    // Your chord detection logic here
    // Example implementation using a predefined set of chord frequencies
    const frequencies: { [key: string]: number[] } = {
      E: [82.2],
      A: [110],
      D: [146.5],
      G: [196],
      B: [247],
      e: [330],
    };

    // Find the chord with the closest frequency match
    let closestChord: string | null = null;
    let minDistance = Infinity;

    for (const chord in frequencies) {
      for (const harmonic of frequencies[chord]) {
        const distance = Math.abs(frequency - harmonic);
        if (distance < minDistance) {
          minDistance = distance;
          closestChord = chord;
        }
      }
    }

    return closestChord;
  };

  // Set up audio context, analyser node, and start pitch detection when component mounts
  useEffect(() => {
    audioContextRef.current = new AudioContext();
    analyserNodeRef.current = audioContextRef.current.createAnalyser();
    inputRef.current = new Float32Array(analyserNodeRef.current.fftSize);
    detectorRef.current = PitchDetector.forFloat32Array(
      analyserNodeRef.current.fftSize
    );

    // Request user permission to access microphone and start pitch detection
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      audioContextRef
        .current!.createMediaStreamSource(stream)
        .connect(analyserNodeRef.current!);
      updatePitch(); // Start the pitch detection process
    });

    // Clean up: close the audio context when the component unmounts
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch((err) => {
          console.error("Error while closing AudioContext:", err);
        });
      }
    };
  }, []); // Run this effect only on component mount

  // Render the pitch detection UI
  return (
    <>
      <p>
        Pitch: <span ref={pitchRef}>-- Hz</span>
        <br />
        Clarity: <span ref={clarityRef}>-- %</span>
      </p>
      {currentChord && (
        <div>
          <GuitarChord chord={currentChord} />{" "}
          {/* Display guitar chord diagram */}
          <p>Detected Chord: {currentChord}</p>
        </div>
      )}
      <button onClick={onDetectPitchClick}>Start Pitch Detector</button>
    </>
  );
}

export default App;

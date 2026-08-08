import { icons } from "./icons.js";

export function MusicController(content) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "music-controller";
  button.setAttribute("aria-pressed", "false");
  button.setAttribute("aria-label", `Play ${content.music.label}`);
  button.innerHTML = `${icons.play}<span>Sound</span>`;

  let audio = null;
  let audioContext = null;
  let oscillator = null;
  let gain = null;
  let playing = false;

  function setState(nextPlaying) {
    playing = nextPlaying;
    button.setAttribute("aria-pressed", String(playing));
    button.setAttribute("aria-label", `${playing ? "Pause" : "Play"} ${content.music.label}`);
    button.innerHTML = `${playing ? icons.pause : icons.play}<span>${playing ? "Playing" : "Sound"}</span>`;
  }

  async function startFallbackTone() {
    const AudioEngine = window.AudioContext || window.webkitAudioContext;
    if (!AudioEngine) return;
    audioContext = audioContext || new AudioEngine();
    oscillator = audioContext.createOscillator();
    gain = audioContext.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = 196;
    gain.gain.value = 0.0001;
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start();
    gain.gain.exponentialRampToValueAtTime(0.018, audioContext.currentTime + 1.8);
  }

  function stopFallbackTone() {
    if (!oscillator || !gain || !audioContext) return;
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.6);
    window.setTimeout(() => {
      oscillator?.stop();
      oscillator?.disconnect();
      gain?.disconnect();
      oscillator = null;
      gain = null;
    }, 700);
  }

  button.addEventListener("click", async () => {
    if (playing) {
      audio?.pause();
      stopFallbackTone();
      setState(false);
      return;
    }

    if (content.music.src) {
      audio = audio || new Audio(content.music.src);
      audio.loop = true;
      audio.volume = 0.42;
      await audio.play();
    } else {
      await startFallbackTone();
    }

    setState(true);
  });

  return button;
}

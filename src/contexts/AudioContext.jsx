import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";

const AudioContext = createContext();

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within AudioProvider");
  }
  return context;
};

export const AudioProvider = ({ children }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isGlobalTourActive, setIsGlobalTourActive] = useState(false);
  const audioRef = useRef(null);

  const sectionAudios = [
    {
      src: "/audio/Section 1 – Chào mừng & Giới thiệu.mp3",
      title: "Section 1 – Chào mừng & Giới thiệu",
    },
    {
      src: "/audio/Section 2 – Vì sao có dự án này.mp3",
      title: "Section 2 – Vì sao có dự án này",
    },
    {
      src: "/audio/Section 3 – Mục tiêu của Triết 4.0.mp3",
      title: "Section 3 – Mục tiêu của Triết 4.0",
    },
    {
      src: "/audio/Section 4 – Minigame & Hoạt động.mp3",
      title: "Section 4 – Minigame & Hoạt động",
    },
    {
      src: "/audio/Section 5 – Kỳ vọng & Trải nghiệm.mp3",
      title: "Section 5 – Kỳ vọng & Trải nghiệm",
    },
    {
      src: "/audio/Section 6 – Lời mời gọi.mp3",
      title: "Section 6 – Lời mời gọi",
    },
  ];

  // Auto play next section when current audio ends
  const playNextSection = useCallback(() => {
    const nextIndex = currentSection + 1;
    console.log(
      `🔄 Section ${currentSection + 1} ended, playing section ${nextIndex + 1}`
    );

    if (nextIndex < sectionAudios.length) {
      setCurrentSection(nextIndex);
      setTimeout(() => {
        playCurrentSection();
      }, 500); // Short delay between sections
    } else {
      // Tour completed
      console.log("🎉 Philosophy 4.0 Audio Tour completed!");
      setHasStarted(false);
      setIsPlaying(false);
      setIsGlobalTourActive(false);
    }
  }, [currentSection]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      console.log(`Section ${currentSection + 1} audio ended, playing next...`);
      playNextSection();
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [playNextSection]);

  // Load current section audio
  useEffect(() => {
    if (audioRef.current && sectionAudios[currentSection]) {
      audioRef.current.src = sectionAudios[currentSection].src;
      audioRef.current.volume = volume;
      audioRef.current.load();
    }
  }, [currentSection, volume]);

  const playCurrentSection = () => {
    const audio = audioRef.current;
    if (audio) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setHasStarted(true);
            setIsGlobalTourActive(true);
          })
          .catch((error) => {
            console.log("Audio play failed:", error);
            setIsPlaying(false);
          });
      }
    }
  };

  const pauseCurrentSection = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const stopTour = () => {
    pauseCurrentSection();
    setHasStarted(false);
    setIsGlobalTourActive(false);
    setCurrentSection(0);
  };

  const startGlobalTour = useCallback(() => {
    console.log("🎵 Starting Philosophy 4.0 Global Audio Tour...");
    setHasStarted(true);
    setIsGlobalTourActive(true);
    setCurrentSection(0);

    setTimeout(() => {
      playCurrentSection();
    }, 500);
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const value = {
    // State
    currentSection,
    isPlaying,
    currentTime,
    duration,
    hasStarted,
    volume,
    isGlobalTourActive,
    sectionAudios,

    // Methods
    startGlobalTour,
    stopTour,
    playCurrentSection,
    pauseCurrentSection,
    formatTime,
    setVolume,

    // Current section info
    currentAudio: sectionAudios[currentSection],
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
      {/* Global Audio Element - Hidden, no UI */}
      <audio ref={audioRef} preload="metadata" style={{ display: "none" }} />
    </AudioContext.Provider>
  );
};

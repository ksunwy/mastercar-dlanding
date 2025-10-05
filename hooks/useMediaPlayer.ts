import { useRef, useState, useEffect } from "react";

export const useMediaPlayer = (src: string) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const syncAudioVideo = () => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video || !audio) return;
    if (Math.abs(video.currentTime - audio.currentTime) > 0.3) {
      audio.currentTime = video.currentTime;
    }
  };

  const handleVideoClick = () => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video || !audio) return;
    if (isPlaying) {
      video.pause();
      audio.pause();
      setIsPlaying(false);
    } else {
      video.play().catch((err) => console.warn("Ошибка воспроизведения видео:", err));
      audio.play().catch((err) => console.warn("Ошибка воспроизведения аудио:", err));
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video || !audio) return;
    if (isPlaying) {
      video.pause();
      audio.pause();
      setIsPlaying(false);
    } else {
      video.play().catch((err) => console.warn("Ошибка воспроизведения видео:", err));
      audio.play().catch((err) => console.warn("Ошибка воспроизведения аудио:", err));
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video || !audio) return;
    const newMutedState = !isMuted;
    video.muted = newMutedState;
    audio.muted = newMutedState;
    setIsMuted(newMutedState);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video || !audio) return;

    video.muted = isMuted;
    audio.muted = isMuted;

    const updateTime = () => {
      setCurrentTime(video.currentTime);
      syncAudioVideo();
    };

    const setMediaDuration = () => {
      setDuration(video.duration);
    };

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", setMediaDuration);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", setMediaDuration);
    };
  }, [isMuted]);

  return {
    videoRef,
    audioRef,
    isPlaying,
    isMuted,
    currentTime,
    duration,
    handleVideoClick,
    togglePlay,
    toggleMute,
    formatTime,
  };
};
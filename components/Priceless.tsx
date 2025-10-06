import { useMediaPlayer } from "@/hooks/useMediaPlayer";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import styles from "@/styles/priceless/priceless.module.scss";
import { useRef, useState } from "react";
import { useCustomCursor } from "@/hooks/useCustomCursor";

const Priceless = () => {
  const {
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
  } = useMediaPlayer("https://www.mastercard.com/businessoutcomes/videos/home/personalize.mp4");

  const [activeItems, setActiveItems] = useState<number[]>([]);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useCustomCursor({
    videoContainerRef,
    shouldShowCursor: (e: MouseEvent) => {
      if (!videoContainerRef.current) return false;
      const videoRect = videoContainerRef.current.getBoundingClientRect();
      return (
        e.clientX >= videoRect.left &&
        e.clientX <= videoRect.right &&
        e.clientY >= videoRect.top &&
        e.clientY <= videoRect.bottom &&
        !isPlaying
      );
    },
    cursorText: "Play",
    cursorSvg: `
      <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.32828 4.57692C8.63965 4.77304 8.63965 5.22696 8.32828 5.42308L1.51647 9.7134C1.18351 9.92311 0.75 9.68382 0.75 9.29032V0.709676C0.75 0.316178 1.18351 0.0768883 1.51647 0.286598L8.32828 4.57692Z" fill="white"/>
      </svg>
    `,
  });

  const handleItemClick = (index: number) => {
    setActiveItems((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className={styles.priceless}>
      <div style={{ width: "100%", height: "100%" }} ref={videoContainerRef} onClick={handleVideoClick}>
        <video
          ref={videoRef}
          className={styles.priceless__video}
          src="https://www.mastercard.com/businessoutcomes/videos/home/personalize.mp4"
          poster="https://www.mastercard.com/businessoutcomes/videos/home/poster-personalize.png"
          playsInline
        />
      </div>
      <div className={styles.player}>
        <button onClick={togglePlay} className={styles.player__button}>
          {isPlaying ? <Pause /> : <Play />}
        </button>
        <div className={styles.player__line}>
          <div
            className={styles.player__progress}
            style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
          />
        </div>
        <span className={styles.player__time}>{formatTime(currentTime)}</span>
        <button onClick={toggleMute} className={styles.player__volume}>
          {isMuted ? <VolumeX /> : <Volume2 />}
        </button>
        <audio ref={audioRef} src="https://www.mastercard.com/businessoutcomes/videos/home/personalize.mp4" />
      </div>

      <section className={styles.goals}>
        <div className={styles.goals__content}>
          <h2 className={styles.goals__title}>Let's talk about your goals <sup><span>00</span></sup></h2>
          <div className={styles.goals__items}>
            {items.map((item, index) => (
              <div
                key={index}
                onClick={() => handleItemClick(index)}
                className={`${styles.goals__item} ${activeItems.includes(index) ? styles.active : ""}`}
              >
                <div className={styles.goals__item__inner}>
                  <span className={styles.goals__item__text}>{item}</span>
                  <span className={styles.goals__item__hover}>{item}</span>
                </div>
              </div>
            ))}
          </div>
          <button className={styles.goals__button}><span>Discover</span></button>
        </div>
      </section>
    </section>
  );
};

export default Priceless;

const items = ['Protect and build trust', 'Strengthen customer relationships', 'Make data-guided decisions', 'Grow responsibly and sustainably', 'Innovate and scale', 'Provide choice and access'];
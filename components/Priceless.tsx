import { useMediaPlayer } from "@/hooks/useMediaPlayer";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import styles from "@/styles/priceless/priceless.module.scss";
import { useState } from "react";

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

  const handleItemClick = (index: number) => {
    setActiveItems((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className={styles.priceless}>
      <div className="" style={{ width: "100%", height: "100%" }} onClick={handleVideoClick}>
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
          <h2 className={styles.goals__title}>Let's talk about <br /> your goals <sup><span>00</span></sup></h2>
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
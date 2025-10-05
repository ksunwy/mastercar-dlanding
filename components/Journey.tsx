import styles from "@/styles/journey/journey.module.scss";
import { useEffect, useRef } from "react";

const Journey = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const playPromise = video.play();

        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Автовоспроизведение заблокировано", error);
            });
        }
    }, []);

    return (
        <section className={styles.journey}>
            <h2 className={styles.journey__title}>Your personalized <br /> journey starts here. </h2>
            <div className={styles.journey__video_wrapper}>
                <video
                    ref={videoRef}
                    className={styles.journey__video}
                    src="https://www.mastercard.com/businessoutcomes/videos/home/start.mp4"
                    poster="https://www.mastercard.com/businessoutcomes/videos/home/goals/05_innovate_scale.png"
                    playsInline
                    muted
                    loop
                />
            </div>
            <div className={styles.journey__content}>
                <div>
                    <h4>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="8" cy="8" r="8" fill="#FF671B" />
                        </svg>
                        immersive journey
                    </h4>
                    <p>Discover what drives up to power <br /> economies and empower people.</p>
                </div>
                <div className={styles.journey__list}>
                    <div>
                        <span>Trust</span>
                        <p>Globally reliable, recognized, and reward</p>
                    </div>
                    <div>
                        <span>Inclusion</span>
                        <p>Diversity' boon, benefiting us all</p>
                    </div>
                    <div>
                        <span>Innovation</span>
                        <p>Elevating tech, sustainable solutions</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Journey

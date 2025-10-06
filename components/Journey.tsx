import { useEffect, useRef } from "react";
import styles from "@/styles/journey/journey.module.scss";
import { useCustomCursor } from "@/hooks/useCustomCursor";

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
                e.clientY <= videoRect.bottom 
            );
        },
        cursorText: "Start",
        cursorSvg: `
          <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.32828 4.57692C8.63965 4.77304 8.63965 5.22696 8.32828 5.42308L1.51647 9.7134C1.18351 9.92311 0.75 9.68382 0.75 9.29032V0.709676C0.75 0.316178 1.18351 0.0768883 1.51647 0.286598L8.32828 4.57692Z" fill="white"/>
          </svg>
        `,
    });

    return (
        <section className={`${styles.journey} white-section`}>
            <h2 className={styles.journey__title}>Your personalized <br /> journey starts here. </h2>
            <div ref={videoContainerRef} className={styles.journey__video_wrapper}>
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
                    <h3>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="6" cy="6" r="6" fill="#FF671B" />
                        </svg>
                        immersive journey
                    </h3>
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

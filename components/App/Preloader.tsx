import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from '@/styles/app/preloader.module.scss';

export default function Preloader() {
    const preloaderRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const preloaderTimeline = gsap.timeline({ paused: true });

    const canvasWidth = 272;  
    const canvasHeight = 128;

    const redCircle = { x: 0, y: canvasHeight / 2, radius: 64, color: '#eb001bef' };
    const yellowCircle = { x: 0, y: canvasHeight / 2, radius: 64, color: '#f89c1ce2' };

    const initAnimation = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        const redCircleAnimation = { x: 0 };
        const yellowCircleAnimation = { x: 0 };

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        preloaderTimeline.to(redCircleAnimation, {
            x: -38, 
            duration: 0.5,
            ease: 'power2.inOut',
            onUpdate: () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                ctx.fillStyle = redCircle.color;
                ctx.beginPath();
                ctx.arc(canvasWidth / 2 + redCircleAnimation.x, canvasHeight / 2, redCircle.radius, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = yellowCircle.color;
                ctx.beginPath();
                ctx.arc(canvasWidth / 2 + yellowCircleAnimation.x, canvasHeight / 2, yellowCircle.radius, 0, Math.PI * 2);
                ctx.fill();
            }
        });

        preloaderTimeline.to(
            yellowCircleAnimation,
            {
                x: 38,  
                duration: 0.5,
                ease: 'power2.inOut'
            },
            0
        );

        preloaderTimeline.to(
            {},
            {
                duration: 0.5,
                onComplete: () => {
                    gsap.to(preloaderRef.current, {
                        duration: 0.4,
                        autoAlpha: 0,
                        ease: 'linear',
                        onComplete: () => {
                            const html = document.querySelector('html');
                            if (html) {
                                html.style.overflowY = 'visible';
                            }
                        }
                    });
                }
            },
            0.5
        );

        preloaderTimeline.play();
    };

    useEffect(() => {
        const html = document.querySelector('html');
        if (html) {
            html.style.overflowY = 'hidden';
        }

        initAnimation();
    }, []);

    return (
        <div className={styles.preloader} ref={preloaderRef}>
            <div className={styles['inner-container']}>
                <div className={styles.preloader__center}>
                    <canvas ref={canvasRef} />
                </div>
            </div>
        </div>
    );
}

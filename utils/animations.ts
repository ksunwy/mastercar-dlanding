import gsap from 'gsap';
import HeaderClasses from "@/styles/app/header.module.scss";
import HeroClasses from "@/styles/hero/hero.module.scss";
import PricelessClasses from "@/styles/priceless/priceless.module.scss";
import JourneyClasses from "@/styles/journey/journey.module.scss";

export const initializeAnimations = (
    timeline: gsap.core.Timeline,
    ctx: gsap.Context,
    vh: number
) => {
    const scrollTimelineEnd = 'top -500%';

    ctx.add(() => {
        timeline = gsap.timeline({
            scrollTrigger: {
                trigger: `.animation-block`,
                start: 'top 0%',
                end: scrollTimelineEnd,
                scrub: true,
                pin: `.animation-block`,
                invalidateOnRefresh: true,
            },
        });

        gsap.to(
            `.title`,
            {
                marginTop: 0,
                duration: 1,
                delay: 3,
                ease: "power2.out",
            }
        )
        timeline
            .add('first')
            .to(`.${HeroClasses.hero}`, { duration: 2, y: -100 * vh, ease: 'linear' }, 'first')
            .to(`.${HeaderClasses.header}`, { duration: .1, width: "13.625rem", ease: 'cubic-bezier(.77, 0, .175, 1)', }, 'first')
            .to(`.${HeaderClasses.header__button}`, { duration: .1, x: -70, visibility: "unvisible", ease: 'cubic-bezier(.77, 0, .175, 1)' }, 'first')
            .to(`.${HeaderClasses.header__link__goal}`, { duration: .01, autoAlpha: 0, delay: .2, visibility: "hidden", ease: 'cubic-bezier(.77, 0, .175, 1)' }, 'first-=0.05')
            .to(`.${PricelessClasses.priceless}`, { duration: 0, autoAlpha: 1 }, 'first')
            .from(`.${PricelessClasses.priceless}`, { duration: 2, y: 100 * vh, ease: 'linear' }, 'first')

            .add('second')
            .to(`.${PricelessClasses.goals}`, { duration: 0, autoAlpha: 1, zIndex: 11, pointerEvents: "auto" }, 'second')
            .from(`.${PricelessClasses.goals}`, { duration: 2, y: 100 * vh, ease: 'linear' }, 'second')

            .add("third")
            .to(`.${PricelessClasses.priceless}`, { duration: 2, y: -100 * vh, ease: 'linear' }, 'third')
            .to(`.${JourneyClasses.journey}`, { duration: 0, autoAlpha: 1 }, 'third')
            .from(`.${JourneyClasses.journey__title}`, { duration: 2, y: 100 * vh, ease: 'linear' }, 'third')
            .from(`.${JourneyClasses.journey__video_wrapper}`, { duration: 2, y: 100 * vh, scale: 1, ease: 'linear' }, 'third')

            .add("fourth")
            .to(`.${JourneyClasses.journey__title}`, { duration: 2, y: -100 * vh, ease: 'linear' }, 'fourth')
            .to(`.${JourneyClasses.journey__video_wrapper}`, { duration: 1, delay: -.7, clipPath: 'inset(25.6% 37% 25.6% 37% round 14px)', ease: 'power2.inOut', }, 'fourth')
            .to(`.${HeaderClasses.header}`, { background: "rgba(237, 237, 237, 0.6)", duration: 0.2, ease: 'power2.inOut', }, 'fourth')
            .to(`.${HeaderClasses.header__link__text}`, { color: "#141413", duration: 0.2, ease: 'power2.inOut', }, 'fourth')
            .to(`.${HeaderClasses.header__link__hover}`, { color: "#141413", duration: 0.2, ease: 'power2.inOut', }, 'fourth')
            .to(`.${HeaderClasses.header__button__circle} circle`, { stroke: "#C7C6C5", duration: 0.5, ease: 'power2.inOut', }, 'fourth')
            .to(`.${HeaderClasses.header__button__menu} rect`, { fill: "#141413", duration: .2, delay: .4, ease: 'power2.inOut', }, 'fourth')
            .to(`.${JourneyClasses.journey__video}`, { duration: 1.5, scale: .5, delay: 2, ease: 'power2.inOut', }, 'fourth')
            .from(`.${JourneyClasses.journey__content}`, { duration: 2.2, y: 100 * vh, delay: .4, ease: 'linear' }, 'fourth')
    });

    gsap.set(`.${PricelessClasses.priceless}`, { autoAlpha: 0 });
    gsap.set(`.${PricelessClasses.goals}`, { autoAlpha: 0 });
    gsap.set(`.${JourneyClasses.journey}`, { autoAlpha: 0 });
};

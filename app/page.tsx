"use client";

import Header from "@/components/App/Header";
import Hero from "@/components/Hero";
import Priceless from "@/components/Priceless";
import Journey from "@/components/Journey";
import { useEffect } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";
import HeaderClasses from "@/styles/app/header.module.scss";
import HeroClasses from "@/styles/hero/hero.module.scss";
import PricelessClasses from "@/styles/priceless/priceless.module.scss";
import JourneyClasses from "@/styles/journey/journey.module.scss";
import Preloader from "@/components/App/Preloader";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);


export default function Home() {
  let timeline = gsap.timeline({});
  let ctx = gsap.context(() => { });

  const initAnimation = () => {
    let windowHeight = window.innerHeight;

    let vh = windowHeight / 100;

    let scrollTimelineEnd = 'top -300%';
    if (window.outerWidth < 850) {
      scrollTimelineEnd = 'top -8000px';
    }

    ctx = gsap.context(() => {
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

      timeline
        .add('first')
        .to(`.${HeroClasses.hero}`, { duration: 2, y: -100 * vh, ease: 'linear' }, 'first')
        .to(`.${HeaderClasses.header}`, { duration: .01, width: "13.625rem", ease: 'linear' }, 'first')
        .to(`.${HeaderClasses.header__button}`, { duration: .1, x: -70, visibility: "unvisible", ease: 'linear' }, 'first')
        .to(`.${HeaderClasses.header__link__goal}`, { duration: .001, autoAlpha: 0, visibility: "hidden", ease: 'linear' }, 'first')
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
        .to(`.${JourneyClasses.journey__video_wrapper}`, { duration: 1, delay: -1, clipPath: 'inset(25.6% 37% 25.6% 37% round 14px)', ease: 'power2.inOut', }, 'fourth')
        .to(`.${JourneyClasses.journey__video}`, { duration: 2, scale: .5, ease: 'power2.inOut', }, 'fourth')
        .from(`.${JourneyClasses.journey__content}`, { duration: 2, y: 100 * vh, delay: .4, ease: 'linear' }, 'fourth')

    });

    gsap.set(`.${PricelessClasses.priceless}`, { autoAlpha: 0 });
    gsap.set(`.${PricelessClasses.goals}`, { autoAlpha: 0 });
    gsap.set(`.${JourneyClasses.journey}`, { autoAlpha: 0 });
  };

  useEffect(() => {
    initAnimation();
    return () => {
      ctx.revert(); 
    };
  }, []);

  return (
    <div className="page-landing">
      <main className="main animation-block">
        <Preloader />
        <Header />
        <Hero />
        <Priceless />
        <Journey />
      </main>
    </div>
  );
}

//  scaleX: 0.25,
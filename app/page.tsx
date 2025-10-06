"use client";

import { useEffect, useState } from "react";
import Preloader from "@/components/App/Preloader";
import Header from "@/components/App/Header";
import Hero from "@/components/Hero";
import Priceless from "@/components/Priceless";
import Journey from "@/components/Journey";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";
import { initializeAnimations } from "@/utils/animations";
import MouseFollower from "mouse-follower"
import gsap from 'gsap';


gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
MouseFollower.registerGSAP(gsap);

export default function Home() {
  const [isModelLoaded, setIsModelLoaded] = useState<boolean>(false);

  let timeline = gsap.timeline({});
  let ctx = gsap.context(() => { });

  useEffect(() => {
    const windowHeight = window.innerHeight;
    const vh = windowHeight / 100;

    initializeAnimations(timeline, ctx, vh);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className="page-landing">
      <main className="main animation-block">
        <Preloader isLoaded={isModelLoaded} />
        <Header />
        <Hero onModelLoaded={() => setIsModelLoaded(true)} />
        <Priceless />
        <Journey />
      </main>
    </div>
  );
}
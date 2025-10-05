import { Suspense, useEffect, useState } from "react";
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { GLTFLoader } from 'three-stdlib';
import { DRACOLoader } from 'three-stdlib';
import * as THREE from "three";
import styles from "@/styles/hero/hero.module.scss";

const Hero = () => {
    const [isClient, setIsClient] = useState<boolean>(false);
    const [scene, setScene] = useState<THREE.Group | null>(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient) {
            const loader = new GLTFLoader();

            const dracoLoader = new DRACOLoader();
            dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
            loader.setDRACOLoader(dracoLoader);

            loader.load(
                "/scene.glb",
                (gltf) => {
                    setScene(gltf.scene);
                },
                undefined,
                (error) => console.error("Error loading GLTF:", error)
            );
        }
    }, [isClient]);


    return (
        <section className={styles.hero}>
            <Canvas className={styles.hero__canvas}>
                <ambientLight color="#ffffff" position={[0, 10, 0]} intensity={1} />
                <directionalLight color="#ffffff" position={[1, 1, 1]} intensity={3} />
                <Suspense fallback={null}>
                    {scene && (
                        <mesh position={[0, 0, 0]}>
                            <primitive object={scene} />
                        </mesh>
                    )}
                    <PerspectiveCamera makeDefault position={[3, 4, -3]} rotation={[-1, 0.5, 0.75]} />
                </Suspense>
            </Canvas>
            <h1 className={styles.hero__title}>Get to know today’s Mastercard</h1>
        </section>
    );
};

export default Hero;
import { Suspense, useEffect, useState } from "react";
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { GLTFLoader } from 'three-stdlib';
import { DRACOLoader } from 'three-stdlib';
import * as THREE from "three";
import styles from "@/styles/hero/hero.module.scss";

const Hero = ({ onModelLoaded }: { onModelLoaded: () => void }) => {
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
                    onModelLoaded();
                },
                undefined,
                (error) => console.error("Error loading GLTF:", error)
            );
        }
    }, [isClient]);

    return (
        <section className={styles.hero}>
            <Canvas className={styles.hero__canvas} >
                {/* <color attach="background" args={["#fe831d"]} />  */}
                <ambientLight color="#632e0f" position={[0, 1, 0]} intensity={1} />
                <directionalLight color="#ffb87a" position={[0, 4, 4]} intensity={70} />
                <Suspense fallback={null}>
                    {scene && (
                        <mesh position={[0, 0, 0]}>
                            <primitive object={scene} />
                        </mesh>
                    )}
                    <PerspectiveCamera makeDefault position={[3, 0, 14]} rotation={[0, 0, 0]} />
                </Suspense>
            </Canvas>
            <div className={styles.hero__title_wrapper}>
                <h1 className={`${styles.hero__title} title`}>Get to know today’s Mastercard</h1>
            </div>
        </section>
    );
};

export default Hero;
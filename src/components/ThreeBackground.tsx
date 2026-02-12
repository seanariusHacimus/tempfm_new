"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useAudio } from "./AudioProvider";

export default function ThreeBackground() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { analyserRef, isPlaying } = useAudio();
    const isPlayingRef = useRef(isPlaying);

    useEffect(() => {
        isPlayingRef.current = isPlaying;
    }, [isPlaying]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // === Scene ===
        const scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x000000, 2, 12);

        // === Camera ===
        const camera = new THREE.PerspectiveCamera(
            70,
            window.innerWidth / window.innerHeight,
            0.1,
            100
        );
        camera.position.z = 5;

        // === Renderer ===
        const renderer = new THREE.WebGLRenderer({
            alpha: false,
            antialias: true,
            powerPreference: "high-performance",
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000);
        container.appendChild(renderer.domElement);

        // === Lights ===
        const ambientLight = new THREE.AmbientLight(0x110500);
        scene.add(ambientLight);

        const dirLightMain = new THREE.DirectionalLight(0xff6600, 1.2);
        dirLightMain.position.set(5, 5, 5);
        scene.add(dirLightMain);

        const dirLightRim = new THREE.DirectionalLight(0xcc2200, 0.8);
        dirLightRim.position.set(-5, -5, 2);
        scene.add(dirLightRim);

        const pointLightCenter = new THREE.PointLight(0xff4400, 1.5, 25);
        pointLightCenter.position.set(0, 0, 4);
        scene.add(pointLightCenter);

        // === Liquid Surface ===
        const fovRad = (camera.fov * Math.PI) / 180;

        function createGeometry() {
            const aspect = window.innerWidth / window.innerHeight;
            const frustumHeight = 2 * Math.tan(fovRad / 2) * 5;
            const frustumWidth = frustumHeight * aspect;
            return new THREE.PlaneGeometry(frustumWidth * 2, frustumHeight * 2, 128, 128);
        }

        let geometry = createGeometry();

        const material = new THREE.MeshPhongMaterial({
            color: 0x1a0500,
            emissive: 0x110200,
            specular: 0xff5500,
            shininess: 80,
            side: THREE.DoubleSide,
            flatShading: false,
        });

        const liquidSurface = new THREE.Mesh(geometry, material);
        scene.add(liquidSurface);

        // === Animation State ===
        let time = 0;
        let currentBass = 20;
        let currentMids = 10;
        let animId: number;

        function getSimulatedBass(t: number) {
            return Math.pow(Math.sin(t * 6), 4) * 100 + 40;
        }

        function animateSurface(
            mesh: THREE.Mesh,
            bNorm: number,
            mNorm: number,
            t: number
        ) {
            const geo = mesh.geometry as THREE.PlaneGeometry;
            const posAttribute = geo.attributes.position;
            const vertex = new THREE.Vector3();

            for (let i = 0; i < posAttribute.count; i++) {
                vertex.fromBufferAttribute(posAttribute, i);

                const swell = Math.sin(vertex.x * 0.4 + t) * Math.cos(vertex.y * 0.4 + t * 0.6);
                const ripple = Math.sin(vertex.x * 1.5 + t) * Math.sin(vertex.y * 1.5 + t * 1.2);

                const dist = Math.sqrt(vertex.x * vertex.x + vertex.y * vertex.y);
                const centerFade = Math.max(0, 1 - dist * 0.1);

                let z = 0;
                z += swell * 0.6;
                z += ripple * (mNorm * 0.8) * centerFade;
                z += (bNorm * 1.2) * centerFade * Math.cos(dist * 1.5 - t * 3);

                posAttribute.setZ(i, z);
            }
            posAttribute.needsUpdate = true;
            geo.computeVertexNormals();
        }

        function animate() {
            animId = requestAnimationFrame(animate);
            time += 0.003;

            let targetBass = 0;
            let targetMids = 0;
            const analyser = analyserRef.current;

            if (analyser && isPlayingRef.current) {
                const dataArray = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(dataArray);
                let bSum = 0;
                let mSum = 0;
                for (let i = 0; i < 15; i++) bSum += dataArray[i];
                for (let i = 15; i < 60; i++) mSum += dataArray[i];
                targetBass = bSum / 15;
                targetMids = mSum / 45;

                if (targetBass === 0) {
                    targetBass = getSimulatedBass(time);
                    targetMids = targetBass * 0.6;
                }
            } else if (isPlayingRef.current) {
                targetBass = getSimulatedBass(time);
                targetMids = targetBass * 0.6;
            } else {
                // Idle gentle movement
                targetBass = Math.sin(time * 2) * 10 + 20;
                targetMids = 10;
            }

            const lerpFactor = 0.05;
            currentBass += (targetBass - currentBass) * lerpFactor;
            currentMids += (targetMids - currentMids) * lerpFactor;

            const bNorm = currentBass / 255;
            const mNorm = currentMids / 255;

            animateSurface(liquidSurface, bNorm, mNorm, time);
            renderer.render(scene, camera);
        }

        animate();

        // === Resize ===
        function onResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            geometry.dispose();
            geometry = createGeometry();
            liquidSurface.geometry = geometry;
        }

        window.addEventListener("resize", onResize);

        // Cleanup
        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", onResize);
            renderer.dispose();
            geometry.dispose();
            material.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",
                zIndex: 0,
                pointerEvents: "none",
                overflow: "hidden",
            }}
        />
    );
}

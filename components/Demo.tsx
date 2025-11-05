"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function Demo() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current!;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(ambientLight, directionalLight);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 15;
    controls.minDistance = 3;

    const loader = new GLTFLoader();
    const fireflies: THREE.Object3D[] = [];
    const totalFireflies = 6;

    //Load main trees
    loader.load(
      `/demo_bg/Scene_1_Main_Land_trees.glb`,
      (gltf) => {
        const land = gltf.scene;
        land.scale.set(1.5, 1.5, 1.5);
        land.position.set(0, -1.5, 0);
        scene.add(land);
      },
      undefined,
      (error) => console.error("Error loading Scene_1_Main_Land.glb:", error)
    );
    // Load main land
    loader.load(
      `/demo_bg/mainLand/Main_Land_1.glb`,
      (gltf) => {
        const land = gltf.scene;
        land.scale.set(1.5, 1.5, 1.5);
        land.position.set(0, -1.5, 0);
        scene.add(land);
      },
      undefined,
      (error) => console.error("Error loading Scene_1_Main_Land.glb:", error)
    );

    loader.load(
      `/demo_bg/mainLand/Main_Land_2.glb`,
      (gltf) => {
        const land = gltf.scene;
        land.scale.set(1.5, 1.5, 1.5);
        land.position.set(0, -1.5, 0);
        scene.add(land);
      },
      undefined,
      (error) => console.error("Error loading Scene_1_Main_Land.glb:", error)
    );

    loader.load(
      `/demo_bg/mainLand/Main_Land_3.glb`,
      (gltf) => {
        const land = gltf.scene;
        land.scale.set(1.5, 1.5, 1.5);
        land.position.set(0, -1.5, 0);
        scene.add(land);
      },
      undefined,
      (error) => console.error("Error loading Scene_1_Main_Land.glb:", error)
    );

    // Load main land + trees
    loader.load(
      `/demo_bg/mainLand/Main_Land_4.glb`,
      (gltf) => {
        const landTrees = gltf.scene;
        landTrees.scale.set(1.5, 1.5, 1.5);
        landTrees.position.set(0, -1.2, 0);
        scene.add(landTrees);
      },
      undefined,
      (error) =>
        console.error("Error loading Scene_1_Main_Land_trees.glb:", error)
    );

    // Load oranges
    loader.load(
      `/demo_bg/Oranges.glb`,
      (gltf) => {
        const oranges = gltf.scene;
        oranges.scale.set(0.8, 0.8, 0.8);
        oranges.position.set(1.5, 0.2, -1);
        scene.add(oranges);

        const clock = new THREE.Clock();
        const animateOranges = () => {
          requestAnimationFrame(animateOranges);
          const t = clock.getElapsedTime();
          oranges.rotation.y += 0.01;
          oranges.position.y = 0.2 + Math.sin(t * 1.5) * 0.05;
        };
        animateOranges();
      },
      undefined,
      (error) => console.error("Error loading Oranges.glb:", error)
    );

    // Fireflies
    const loadFirefly = (index: number, position: THREE.Vector3) => {
      loader.load(
        `/demo_bg/Firefly_${index}.glb`,
        (gltf) => {
          const model = gltf.scene;
          model.scale.set(1.2, 1.2, 1.2);
          model.position.copy(position);
          scene.add(model);
          fireflies.push(model);

          const glow = new THREE.PointLight(0xfff8a0, 1, 4);
          glow.position.copy(position);
          scene.add(glow);
        },
        undefined,
        (error) => console.error(`Error loading Firefly_${index}.glb:`, error)
      );
    };

    const positions = [
      new THREE.Vector3(-2, 1, 0),
      new THREE.Vector3(2, 1, 0),
      new THREE.Vector3(0, 2, -2),
      new THREE.Vector3(0, 1, 2),
      new THREE.Vector3(-1.5, 0.5, -1.5),
      new THREE.Vector3(1.5, 0.5, 1.5),
    ];

    for (let i = 1; i <= totalFireflies; i++) {
      loadFirefly(i, positions[i - 1]);
    }

    // Animate
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      fireflies.forEach((f, i) => {
        f.rotation.y += 0.01;
        f.position.y += Math.sin(t * 1.5 + i) * 0.004;
      });

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-screen bg-black" />;
}

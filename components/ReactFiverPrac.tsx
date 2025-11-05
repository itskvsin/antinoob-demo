"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
// import React from "react";

import {Scene_1_Main_Land_1} from "@/components/models/Scene_1_Main_Land_1";
import {Scene_1_Main_Land_2} from "@/components/models/Scene_1_Main_Land_2";
import {Scene_1_Main_Land_3} from "@/components/models/Scene_1_Main_Land_3";
import {Scene_1_Main_Land_4} from "@/components/models/Scene_1_Main_Land_4";
import {Scene_1_Main_Land} from "@/components/models/Scene_1_Main_Land";
import {Oranges} from "@/components/models/Oranges";
import {Scene_1_Main_Land_trees} from "@/components/models/Scene_1_Main_Land_trees";
import {Firefly_1} from "@/components/models/Firefly_1";
import {Firefly_2} from "@/components/models/Firefly_2";
import {Firefly_3} from "@/components/models/Firefly_3";
import {Firefly_4} from "@/components/models/Firefly_4";
import {Firefly_5} from "@/components/models/Firefly_5";
import {Firefly_6} from "@/components/models/Firefly_6";


export default function ReactFiberPrac() {
  return (
    <div className="h-screen w-full flex items-center justify-end">
      <Canvas camera={{ position: [5, 5, 5], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <OrbitControls enableDamping enableZoom />

        <Scene_1_Main_Land_trees />
        <Scene_1_Main_Land_1 />
        <Scene_1_Main_Land_2 />
        <Scene_1_Main_Land_3 />
        <Scene_1_Main_Land_4 />
        <Firefly_1 />
        <Firefly_2 />
        <Firefly_3 />
        <Firefly_4 />
        <Firefly_5 />
        <Firefly_6 />
        <Oranges />
        <Scene_1_Main_Land />
      </Canvas>
    </div>
  );
}


// "use client";

// import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import { useGLTF } from "@react-three/drei";
// import React, { useEffect, useRef, useState } from "react";

// function Model({ path }: { path: string }) {
//   const { scene } = useGLTF(path);
//   return <primitive object={scene} />;
// }

// // function ScrollCamera() {
// //   const { camera } = useThree();
// //   const [scrollY, setScrollY] = useState(0);
// //   const smoothZ = useRef(0);

// //   useEffect(() => {
// //     const handleScroll = () => setScrollY(window.scrollY);
// //     window.addEventListener("scroll", handleScroll);
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, []);

// //   useFrame(() => {
// //     // Convert scroll to forward camera movement (negative Z = deeper)
// //     const targetZ = 5 - scrollY * 0.01; // tune speed by changing 0.01
// //     smoothZ.current += (targetZ - smoothZ.current) * 0.05; // smoothing
// //     camera.position.set(0, 2, smoothZ.current); // move straight forward
// //     camera.rotation.set(0, 0, 0); // prevent flips
// //     camera.lookAt(0, 2, smoothZ.current - 5); // look straight ahead
// //   });

// //   return null;
// // }

// export default function ReactFiberPrac() {
//   return (
//     // Make the page scrollable (3x viewport height)
//     <div className="h-[400vh] w-full bg-black">
//       {/* Scene stays fixed while you scroll */}
//       <div className="sticky top-0 h-screen w-full">
//         <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
//           <ambientLight intensity={0.6} />
//           <directionalLight position={[10, 10, 5]} intensity={1.2} />

//           {/* Scroll-based camera */}
//           {/* <ScrollCamera /> */}

//           {/* Models in your scene */}
//           <Model path="/Scene_1_Main_Land_2-transformed.glb" />
//           <Model path="/Scene_1_Main_Land_1-transformed.glb" />
//           <Model path="/Scene_1_Main_Land_1-transformed.glb" />
//           <Model path="/Scene_1_Main_Land_1-transformed.glb" />
//           <Model path="/Scene_1_Main_Land.glb" />
//           <Model path="/Oranges-transformed.glb" />
//           {/* <Model path="/Scene_1_Main_Land_trees-transformed.glb" /> */}
//         </Canvas>
//       </div>
//     </div>
//   );
// }

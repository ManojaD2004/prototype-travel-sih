"use client";
import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect } from "react";

const ArHead = () => {
  const arHeadGlb = useGLTF("/bird.glb");
  const aniArHead = useAnimations(arHeadGlb.animations, arHeadGlb.scene);
  const playAni = aniArHead.actions["Take 001"];
  useEffect(() => {
    playAni?.play();
  }, []);
  console.log(playAni);
  return (
    <primitive
      object={arHeadGlb.scene}
      scale={1}
      rotation-z={0}
      position={[0, -2, 0]}
    />
  );
};

export default function Home() {
  return (
    <div className="w-full h-screen ">
      <h1>Hello Tiger!</h1>
      <Canvas>
        <OrbitControls />
        <ambientLight />

        <ArHead />
      </Canvas>
    </div>
  );
}

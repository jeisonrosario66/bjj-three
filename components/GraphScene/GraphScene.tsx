// components/GraphScene.tsx
import React from "react";
import { Stars } from "@react-three/drei";
import GraphViz from "../GraphViz/GraphViz";

const GraphScene = () => {
  return (
    <>
      {/* Fondo estrellado */}
      <Stars
        radius={100}
        depth={5}
        count={3000}
        factor={10}
        saturation={0.5}
        fade
        speed={0.5}
      />

      {/* Grafo 3D */}
      <GraphViz />

      {/* Luces */}
      <ambientLight intensity={1} />
      <directionalLight position={[0, 20, 25]} color="green" />
    </>
  );
};

export default GraphScene;

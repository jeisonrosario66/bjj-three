// components/GraphScene.tsx
import React from "react";
import { Stars } from "@react-three/drei";
import GraphViz from "../GraphViz/GraphViz";

// Define las props para GraphScene
type GraphSceneProps = {
  orbitControlsRef: React.MutableRefObject<any>;
};

const GraphScene: React.FC<GraphSceneProps> = ({ orbitControlsRef }) => {
  
  
  return (
    <>
      {/* Fondo estrellado */}
      <Stars
        radius={300}
        depth={5}
        count={3000}
        factor={10}
        saturation={0.5}
        fade
        speed={0.5}
      />

      {/* Grafo 3D */}
      <GraphViz orbitControlsRef={orbitControlsRef} />
    
      {/* Luces */}
      <ambientLight intensity={8} />
      <directionalLight position={[100, 20, 10]} color="purple" />
    </>
  );
};

export default GraphScene;

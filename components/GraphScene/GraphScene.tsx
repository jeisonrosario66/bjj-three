// components/GraphScene.tsx
import React, { useRef, useEffect } from "react";
import { Stars } from "@react-three/drei"; // Componente para renderizar un fondo estrellado
import GraphViz from "../GraphViz/GraphViz"; // Componente para renderizar el grafo 3D
import { GraphLink } from "../../src/config/config"; // Tipo para los enlaces del grafo

// Define las props para GraphScene
type GraphSceneProps = {
  isBrilloActivo: boolean; // Prop para controlar el brillo
  orbitControlsRef: React.MutableRefObject<any>; // Referencia para los controles de la cámara
  onNodeSelect: (node: any) => void; // Función para recibir la selección de nodo
  onLinkSelect: (link: any) => void; // Función para recibir la selección de enlace
};

const GraphScene: React.FC<GraphSceneProps> = ({
  isBrilloActivo,
  orbitControlsRef,
  onNodeSelect,
  onLinkSelect,
}) => {

  return (
    <>
      {/* Fondo estrellado */}
      <Stars
        radius={300} // Radio del fondo estrellado
        depth={5} // Profundidad del fondo estrellado
        count={3000} // Número de estrellas
        factor={10} // Factor de dispersión de las estrellas
        saturation={0.5} // Saturación del color de las estrellas
        fade // Habilita el desvanecimiento de las estrellas
        speed={0.5} // Velocidad del movimiento de las estrellas
      />
      {/* Grafo 3D */}
      <GraphViz
        onLinkSelect={onLinkSelect}
        isBrilloActivo={isBrilloActivo} // Pasa el valor del brillo como prop
        orbitControlsRef={orbitControlsRef} // Referencia para los controles de la cámara
        onNodeSelect={onNodeSelect} // Función para manejar la selección de nodo
      />
      {/* Luces */}
      <ambientLight intensity={8} /> {/* Luz ambiental */}
      <directionalLight position={[100, 20, 10]} color="purple" />{" "}
      {/* Luz direccional */}
    </>
  );
};

export default GraphScene;

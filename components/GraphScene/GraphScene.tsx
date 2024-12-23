// components/GraphScene.tsx
import React from "react";
import { Stars } from "@react-three/drei"; // Componente para renderizar un fondo estrellado
import GraphViz from "../GraphViz/GraphViz"; // Componente para renderizar el grafo 3D
import { GraphLink } from "../../src/config/config"; // Tipo para los enlaces del grafo

// Define las props para GraphScene
type GraphSceneProps = {
  orbitControlsRef: React.MutableRefObject<any>; // Referencia para los controles de la cámara
  onNodeSelect: (node: any) => void; // Función para recibir la selección de nodo
  setSelectedNode: React.Dispatch<React.SetStateAction<any>>; // Para actualizar el nodo seleccionado
  onConnectedLinksUpdate: (links: GraphLink[]) => void; // Función para actualizar los enlaces conectados
};

const GraphScene: React.FC<GraphSceneProps> = ({
  orbitControlsRef,
  onNodeSelect,
  setSelectedNode,
  onConnectedLinksUpdate,
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
        orbitControlsRef={orbitControlsRef} // Referencia para los controles de la cámara
        onNodeSelect={onNodeSelect} // Función para manejar la selección de nodo
        setSelectedNode={setSelectedNode} // Función para actualizar el nodo seleccionado
        onConnectedLinksUpdate={onConnectedLinksUpdate} // Función para actualizar los enlaces conectados
      />
      {/* Luces */}
      <ambientLight intensity={8} /> {/* Luz ambiental */}
      <directionalLight position={[100, 20, 10]} color="purple" />{" "}
      {/* Luz direccional */}
    </>
  );
};

export default GraphScene;

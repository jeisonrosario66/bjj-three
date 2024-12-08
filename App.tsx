import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber"; // Componente principal para renderizar contenido 3D en la aplicación
import { OrbitControls } from "@react-three/drei"; // Importa los controles de órbita
import { StyleSheet, View, Text } from "react-native";
import Cube from "./components/Cube/Cube";
import Graph from "./components/Graph/Graph";
import { Stars } from "@react-three/drei";

const positions = [
  [0, 0, 4],
  [0, 0, 8],
  [0, 0, 12],
  [0, 0, 16],
];

export default function App() {
  // Manejar el clic sobre la esfera
  const handleClick = (index: number) => {
    console.log(`Clicked on sphere ${index}`);
  };

  return (
    <View style={{ flex: 1 }}>
      <Canvas
        camera={{ position: [-5, 0, -15], fov: 40 }}
        style={{ background: "black" }}
      >
        {/* fondo estrellado */}
        <Stars
          radius={100} // Radio de las estrellas
          depth={5} // Profundidad del espacio
          count={3000} // Número de estrellas
          factor={10} // Escala de las estrellas
          saturation={0.5} // Saturación del color
          fade // Activar fundido
          speed={0.5}
        />

        {/* Cubo */}
        {/* <Graph rotation={[1, 1, 0]} color="red" position={[1, 1, 1]} /> */}
        {/* <Graph rotation={[1, 1, 0]} color="red" position={[1, 1, 1]} /> */}
        <Graph
          rotation={[0, 0, 0]}
          color="yellow"
          position={[0, 0, 0]}
          dimensions={[1, 10, 10]}
        />
        {positions.map((pos, index) => (
          <Graph
            key={index}
            position={[pos[0], pos[1], pos[2]]}
            rotation={[0, 0.5 * index, 0]}
            onClick={() => handleClick(index)} // Evento de clic
            color="blue"
          />
        ))}

        {/* Luces */}
        <ambientLight intensity={1} />
        <directionalLight position={[0, 20, 25]} color="white" />

        {/* Controles de la cámara para interactuar */}
        <OrbitControls />
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

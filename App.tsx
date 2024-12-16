// App.tsx
import React from "react";
import { Canvas } from "@react-three/fiber";
import { TrackballControls, OrbitControls } from "@react-three/drei"; // Controles de cámara interactivos
import { StyleSheet, View } from "react-native";
import GraphScene from "./components/GraphScene/GraphScene";
import GraphSettings from "./components/GraphSettings/GraphSettings";


// Define el tipo de las configuraciones del grafo
type GraphSettingsType = {
  nodeSize?: number;
  linkDistance?: number;
  backgroundColor?: string;
};


export default function App() {
  const handleUpdateSettings = (settings: GraphSettingsType) => {
    console.log("Settings updated:", settings);
    // Lógica para actualizar el grafo
  };

  return (
    <View style={styles.container}>
      <GraphSettings onUpdateSettings={handleUpdateSettings} />
      <Canvas
        camera={{ position: [20, 10, 0], fov: 90 }}
        style={{ background: "#002" }}
      >
        {/* Controles de cámara */}
      <GraphScene />
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

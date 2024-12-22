// App.tsx
import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei"; // Controles de cámara interactivos
import { StyleSheet, View } from "react-native";
import GraphScene from "./components/GraphScene/GraphScene";
import GraphSettings from "./components/GraphSettings/GraphSettings";
import configGlobal from "./src/config/config";

// Define el tipo de las configuraciones del grafo
// type GraphSettingsType = {
//   nodeSize?: number;
//   linkDistance?: number;
//   backgroundColor?: string;
// };

export default function App() {
  // const handleUpdateSettings = (settings: GraphSettingsType) => {
  //   console.log("Settings updated:", settings);
  //   // Lógica para actualizar el grafo
  // };
  const orbitControlsRef = useRef(null); // Ref para los controles
  return (
    <View style={styles.container}>
      {/* <GraphSettings onUpdateSettings={handleUpdateSettings} /> */}
      <Canvas
        camera={{ position: configGlobal.cameraPosition, fov: 50 }}
        style={{ background: configGlobal.canvasBackgraundColor }}
      >
        {/* Controles de cámara */}
        <GraphScene orbitControlsRef={orbitControlsRef} />
        <OrbitControls
          ref={orbitControlsRef}
          maxDistance={configGlobal.cameraMaxDistance}
          minDistance={configGlobal.cameraMinDistance}
        />
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

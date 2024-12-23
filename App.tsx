// App.tsx
import React, { useRef, useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei"; // Controles de cámara interactivos
import { StyleSheet, View, Text, Button } from "react-native";
import GraphScene from "./components/GraphScene/GraphScene";
import NodeInfoPanel from "./components/PanelData/PanelData";
import { configGlobal, NodeType, GraphLink } from "./src/config/config";

export default function App() {
  const orbitControlsRef = useRef(null); // Ref para los controles
  // Estado para almacenar el nodo seleccionado
  const [selectedNode, setSelectedNode] = useState<NodeType | null>(null);
  // Estado para almacenar los enlaces conectados
  const [connectedLinks, setConnectedLinks] = useState<GraphLink[]>([]);
  console.log("connectedLinks: ", connectedLinks);
  /**
   * Función para actualizar los enlaces conectados
   * @param {LinkType[]} links - Lista de enlaces conectados
   */
  const handleConnectedLinksUpdate = useCallback((links: GraphLink[]) => {
    setConnectedLinks(links); // Actualiza el estado con los enlaces conectados
  }, []);

  /**
   * Función para actualizar el nodo seleccionado
   * @param {NodeType} node - Nodo seleccionado
   */
  const handleNodeSelect = (node: NodeType) => {
    setSelectedNode(node); // Actualiza el estado con el nodo seleccionado
  };

  /**
   * Función para cerrar el panel de información del nodo
   */
  // Manejador de clics del nodo
  const closeNodePanel = () => {
    setSelectedNode(null); // Desselecciona el nodo
  };
  console.log("selectedNode: ", selectedNode);
  // Manejador de clics del nodo
  return (
    <View style={styles.container}>
      {/* Panel de información del nodo */}
      <NodeInfoPanel
        selectedNode={selectedNode}
        onClose={closeNodePanel}
        links={connectedLinks}
        videoUrl={selectedNode?.url}
      />

      {/* Canvas para renderizar la escena 3D */}
      <Canvas
        camera={{ position: configGlobal.cameraPosition, fov: 50 }}
        style={{ background: configGlobal.canvasBackgraundColor }}
      >
        {/* Componente de la escena del grafo */}
        <GraphScene
          orbitControlsRef={orbitControlsRef}
          onNodeSelect={handleNodeSelect}
          setSelectedNode={setSelectedNode}
          onConnectedLinksUpdate={handleConnectedLinksUpdate} 
        />
        {/* Controles de cámara */}
        <OrbitControls
          ref={orbitControlsRef}
          maxDistance={configGlobal.cameraMaxDistance}
          minDistance={configGlobal.cameraMinDistance}
        />
        |
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: "100%",
    height: "100%",
  },
});

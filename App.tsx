// App.tsx
import React, { useRef, useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei"; // Controles de cámara interactivos
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from "react-native";
import GraphScene from "./components/GraphScene/GraphScene";
import AddNodeComponent from "./components/AddNodeComponent/AddNodeComponent";
import NodeInfoPanel from "./components/PanelData/PanelData";
import { configGlobal, NodeType, GraphLink } from "./src/config/config";
import ModalMenuGeneral from "./components/ModalMenuGeneral/ModalMenuGeneral";
export default function App() {
  // Ref para los controles
  const orbitControlsRef = useRef(null);
  // Estado para la visibilidad del panel
  const [isBrilloActivo, setIsBrilloActivo] = useState(true); // Estado para el brillo
  // Estado para almacenar el nodo seleccionado
  const [selectedNode, setSelectedNode] = useState<NodeType | null>(null);
  // Estado para almacenar el enlace seleccionado
  const [selectedLink, setSelectedLink] = useState<GraphLink | null>(null);
  // Estado para almacenar los enlaces conectados
  const [connectedLinks, setConnectedLinks] = useState<GraphLink[]>([]);
  const [newNode, setNewNode] = useState({ name: "", group: "", url: "" });
  const [isAddNodeVisible, setIsAddNodeVisible] = useState(false); // Estado para mostrar el modal de agregar nodo
  const [isMenuVisible, setIsMenuVisible] = useState(true); // Estado para mostrar/ocultar el menú
  const [isPanelExpanded, setIsPanelExpanded] = useState(false); // Estado para recibir cambios

  /**
   * Función para actualizar el nodo seleccionado
   * @param {NodeType} node - Nodo seleccionado
   */
  const handleNodeSelect = (node: NodeType) => {
    setSelectedNode(node); // Actualiza el estado con el nodo seleccionado
    setSelectedLink(null); // Reinicia el enlace seleccionado
    setIsBrilloActivo(true); // Cambia el estado de brillo
    setIsMenuVisible(false);
    
  };

  /**
   * Función para actualizar el link seleccionado
   * @param {GraphLink} link - Nodo seleccionado
   */
  const handleLinkSelect = (link: GraphLink) => {
    setSelectedLink(link); // Actualiza el estado con el nodo seleccionado
    setSelectedNode(null); // Reinicia el nodo seleccionado
    setIsBrilloActivo(false); // Cambia el estado de brillo
    setIsMenuVisible(false);
  };

  /**
   * Función para cerrar el panel de información del nodo
   */
  // Manejador de clics del nodo
  const closeNodePanel = () => {
    setSelectedLink(null); // Desselecciona el enlace
    setSelectedNode(null); // Desselecciona el nodo
    setIsBrilloActivo(false); // Cambia el estado de brillo
    setIsMenuVisible(true);
  };


  return (
    <View style={styles.container}>
      <AddNodeComponent 
      isAddNodeVisible={isAddNodeVisible}
      setIsAddNodeVisible={setIsAddNodeVisible}
      setIsMenuVisible={setIsMenuVisible}
      />
      {/* Panel de información del nodo */}
      <ModalMenuGeneral
        selectedNode={setSelectedNode}
        selectedLink={setSelectedLink}
        isBrilloActivo={setIsBrilloActivo}
        isMenuVisible={isMenuVisible}
        setIsMenuVisible={setIsMenuVisible}
        setIsAddNodeVisible={setIsAddNodeVisible}
      />

      <NodeInfoPanel
        selectedNode={selectedNode}
        onClose={closeNodePanel}
        IsPanelExpanded={setIsPanelExpanded} // Pasamos el callback
        links={connectedLinks}
        selectedLink={selectedLink}
        videoUrl={selectedNode?.url}
      />
      <Canvas
        camera={{ position: configGlobal.cameraPosition, fov: 50 }}
        style={{ background: configGlobal.canvasBackgraundColor }}
      >
        {/* Componente de la escena del grafo */}
        <GraphScene
          isBrilloActivo={isBrilloActivo} // Pasa el valor del brillo como prop
          orbitControlsRef={orbitControlsRef}
          onNodeSelect={handleNodeSelect}
          onLinkSelect={handleLinkSelect}
        />
        {/* Controles de cámara */}
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
    position: "relative",
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 10,
  },
});

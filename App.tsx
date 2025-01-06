// App.tsx
import React, { useRef, useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei"; // Controles de cámara interactivos
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
import NodeInfoPanel from "./components/PanelData/PanelData";
import { configGlobal, NodeType, GraphLink } from "./src/config/config";

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
  const [isMenuVisible, setIsMenuVisible] = useState(false); // Estado para mostrar/ocultar el menú
  const [newNode, setNewNode] = useState({ name: "", group: "", url: "" });
  const [isAddNodeVisible, setIsAddNodeVisible] = useState(false); // Estado para mostrar el modal de agregar nodo




  /**
   * Función para agregar un nuevo nodo
   */
  const handleAddNode = () => {
    // Aquí puedes implementar la lógica para agregar un nuevo nodo
    console.log("Nuevo nodo agregado:", newNode);
    setNewNode({ name: "", group: "", url: "" }); // Limpia el formulario
    toggleMenu(); // Cierra el modal
  };

  // Función para mostrar el formulario de agregar nodo
  const addNodo = () => {
    setIsMenuVisible(false); // Cierra el menú
    setIsAddNodeVisible(true); // Abre el modal para agregar nodo
  };
  
  /**
   * Función para actualizar el nodo seleccionado
   * @param {NodeType} node - Nodo seleccionado
   */
  const handleNodeSelect = (node: NodeType) => {
    setSelectedNode(node); // Actualiza el estado con el nodo seleccionado
    setSelectedLink(null); // Reinicia el enlace seleccionado
    setIsBrilloActivo(true); // Cambia el estado de brillo
  };

  /**
   * Función para actualizar el link seleccionado
   * @param {GraphLink} link - Nodo seleccionado
   */
  const handleLinkSelect = (link: GraphLink) => {
    setSelectedLink(link); // Actualiza el estado con el nodo seleccionado
    setSelectedNode(null); // Reinicia el nodo seleccionado
    setIsBrilloActivo(false); // Cambia el estado de brillo
    console.log("Link seleccionado", link);
  };

  /**
   * Función para cerrar el panel de información del nodo
   */
  // Manejador de clics del nodo
  const closeNodePanel = () => {
    setSelectedLink(null); // Desselecciona el enlace
    setSelectedNode(null); // Desselecciona el nodo
    setIsBrilloActivo(false); // Cambia el estado de brillo
  };

  // Manejador para alternar el menú de hamburguesa
  const toggleMenu = () => {
    setSelectedLink(null); // Desselecciona el enlace
    setSelectedNode(null); // Desselecc
    setIsMenuVisible(!isMenuVisible);
  };

  
  return (
    <View style={styles.container}>
      {/* Panel de información del nodo */}
      <NodeInfoPanel
        selectedNode={selectedNode}
        onClose={closeNodePanel}
        links={connectedLinks}
        selectedLink={selectedLink}
        videoUrl={selectedNode?.url}
      />

      {/* Canvas para renderizar la escena 3D */}
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
        |
      </Canvas>

      {/* Menú de hamburguesa */}
      <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
        <Text style={styles.menuText}>☰</Text>
      </TouchableOpacity>

      {/* Modal para agregar nodos */}
      <Modal visible={isMenuVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Agregar Nodo</Text>
            <TextInput
              placeholder="Nombre del Nodo"
              style={styles.input}
              value={newNode.name}
              onChangeText={(text) => setNewNode({ ...newNode, name: text })}
            />
            <TextInput
              placeholder="Grupo"
              style={styles.input}
              value={newNode.group}
              onChangeText={(text) => setNewNode({ ...newNode, group: text })}
            />
            <TextInput
              placeholder="URL (opcional)"
              style={styles.input}
              value={newNode.url}
              onChangeText={(text) => setNewNode({ ...newNode, url: text })}
            />
            <View style={styles.buttonContainer}>
              <Button title="Agregar" onPress={handleAddNode} />
              <Button title="Cancelar" onPress={toggleMenu} color="red" />
            </View>
          </View>
        </View>
      </Modal> 

      {/* Modal para el menú */}
      <Modal visible={isMenuVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Opciones</Text>

            <TouchableOpacity onPress={addNodo}>
              <Text style={styles.menuButtonHover} >Agregar Nodo</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleMenu}>
              <Text style={styles.closeButton}>Cerrar</Text>
            </TouchableOpacity>
            {/* Aquí puedes agregar el formulario o más opciones */}
          </View>
        </View>
      </Modal>
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

  menuText: {
    color: "#fff",
    fontSize: 18,
  },

  closeButton: {
    marginTop: 20,
    color: "blue",
    fontSize: 16,
  },

  menuButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "black",
    borderRadius: 25,
    padding: 10,
  },
  menuButtonText: {
    color: "white",
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  menuButtonHover: {
    cursor: "pointer",
    fontSize: 16,
    marginBottom: 20,
  },
});

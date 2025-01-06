import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Switch,
} from "react-native";
import {
  configGlobal,
  GraphNode,
  groupColors,
  NodeType,
} from "../../src/config/config";
import ForceGraph2D from "react-force-graph-2d";
import { GraphLink } from "../../src/config/config";
import { Dimensions } from "react-native";
import { WebView } from "react-native-webview";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // O el ícono que prefieras
// Función para capitalizar la primera letra de una cadena
const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Función para obtener el color de fondo basado en el grupo del nodo
const getBackgroundColor = (group: string) => {
  return groupColors[group] || "gray"; // Default a gris si no se encuentra el grupo
};

// Definición de las props para NodeInfoPanel
type NodeInfoPanelProps = {
  selectedNode: NodeType | null; // Nodo seleccionado
  selectedLink: GraphLink | null; // Enlace seleccionado
  onClose: () => void; // Función para cerrar el panel
  links: GraphLink[]; // Lista de enlaces conectados
  videoUrl?: string; // URL del video de YouTube (opcional)
};

// Componente NodeInfoPanel
const NodeInfoPanel: React.FC<NodeInfoPanelProps> = ({
  selectedNode,
  selectedLink,
  onClose,
  links,
  videoUrl,
}) => {
  const [isExpanded, setIsExpanded] = useState(false); // Estado para el tamaño del panel

  const onExpand = () => {
    setIsExpanded(!isExpanded); // Alterna entre expandido y colapsado
  };

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  if (!selectedNode && !selectedLink) return null; // Solo retorna null si ambos son null
  return (
    <View
      style={[
        styles.panel,
        isExpanded ? styles.expandedPanel : styles.collapsedPanel, // Cambia el estilo dinámicamente
        isEnabled ? styles.panelOpaco : styles.panel,
        {
          backgroundColor: configGlobal.panelColor,
          // backgroundColor: getBackgroundColor(selectedNode?.group || "default"),
        },
      ]}
    >
      <View>
        <Text style={styles.panelTitle}>
          {selectedNode ? `Información del Nodo` : `Información del Enlace`}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={styles.switch}
        />

        {/* Botón de expandir */}
        <TouchableOpacity
          style={styles.expandButton}
          onPress={() => {
            onExpand();
          }}
        >
          {/* Ícono personalizado */}
          <Icon
            name={isExpanded ? "arrow-collapse" : "arrow-expand"}
            size={24}
            color="white"
          />
        </TouchableOpacity>

        {/* Botón de cierre */}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            onClose();
          }}
        >
          {/* Ícono personalizado */}
          <Icon name="window-close" size={24} color="white" />
          {/* También podrías usar una imagen */}
          {/* <Image source={require("../../assets/close-icon.png")} style={styles.icon} /> */}
        </TouchableOpacity>
      </View>

      <Text>
        <Text style={styles.titulos}>{selectedNode ? "ID: " : ""} </Text>
        <Text>{selectedNode ? selectedNode.id : ""}</Text>
      </Text>

      <Text>
        <Text style={styles.titulos}>{selectedNode ? "Nombre: " : ""}</Text>
        <Text>{selectedNode ? selectedNode.name : ``}</Text>
      </Text>

      <Text>
        <Text style={styles.titulos}>{selectedNode ? "Del tipo: " : ""}</Text>
        <Text>{selectedNode ? selectedNode.group : ``}</Text>
      </Text>

      <Text>
        <Text style={styles.titulos}>{selectedLink ? "Origen: " : ""}</Text>
        <Text>{selectedLink ? (selectedLink.source as unknown as GraphLink).name : ``}</Text>
      </Text>

      <Text>
        <Text style={styles.titulos}>{selectedLink ? "Destino: " : ""}</Text>
        <Text>{selectedLink ? (selectedLink.target as unknown as GraphLink).name : ``}</Text>
      </Text>

      {/* {videoUrl && (
        <iframe
          src={`https://www.youtube.com/embed/${
            videoUrl.split("v=")[1]
          }?start=${selectedNode?.start}&end=${
            selectedNode?.end
          }&autoplay=1&controls=1`}
          width="300"
          height="200"
          allow="autoplay; encrypted-media"
          style={{ border: "none" }}
        ></iframe>
      )} */}
    </View>
  );
};
const { width, height } = Dimensions.get("window"); // Obtiene las dimensiones de la ventana

const styles = StyleSheet.create({
  panel: {
    position: "absolute",
    top: 20,
    left: 20,
    padding: 10,
    borderRadius: 10,
    zIndex: 10,
    opacity: 0.7,
    borderColor: "#fff",
    borderWidth: 1,
    minWidth: 290,
  },
  panelOpaco: {
    opacity: 1,
  },
  buttonContainer: {
    top: 10,
    right: 10,
    flexDirection: "row",
    position: "absolute",
    width: 110,
    justifyContent: "space-between",
  },
  switch: {},
  closeButton: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
    cursor: "pointer",
  },
  expandButton: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
    cursor: "pointer",
  },
  collapsedPanel: {},
  expandedPanel: {
    width: width - 40,
    height: height - 40,
  },
  panelTitle: {
    fontWeight: "bold",
    justifyContent: "flex-start",
    marginBottom: 15,
  },
  titulos: {
    fontWeight: "bold",
  },
  sectionTitle: {
    marginTop: 10,
    fontWeight: "bold",
  },
  link: {
    marginBottom: 5,
  },
  graphContainer: {
    marginTop: 20,
    width: "100%",
    height: 200,
  },
  videoContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default NodeInfoPanel;

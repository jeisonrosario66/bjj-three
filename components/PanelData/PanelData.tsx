import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { groupColors } from "../../src/config/config";
import ForceGraph2D from "react-force-graph-2d";
import { GraphLink } from "../../src/config/config";
import { WebView } from "react-native-webview";

// Definición de las props para NodeInfoPanel
type NodeInfoPanelProps = {
  selectedNode: GraphLink | null; // Nodo seleccionado
  onClose: () => void; // Función para cerrar el panel
  links: GraphLink[]; // Lista de enlaces conectados
  videoUrl?: string; // URL del video de YouTube (opcional)
};

// Función para capitalizar la primera letra de una cadena
const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Función para obtener el color de fondo basado en el grupo del nodo
const getBackgroundColor = (group: string) => {
  return groupColors[group] || "gray"; // Default a gris si no se encuentra el grupo
};

// Componente NodeInfoPanel
const NodeInfoPanel: React.FC<NodeInfoPanelProps> = ({
  selectedNode,
  onClose,
  links,
  videoUrl,
}) => {
  if (!selectedNode) return null; // Si no hay nodo seleccionado, no renderiza nada
  // Filtrar los enlaces que están conectados al nodo seleccionado
  console.log("links: ", links);
  return (
    <View
      style={[
        styles.panel,
        { backgroundColor: getBackgroundColor(selectedNode.group || "default") },
      ]}
    >
      <Text style={styles.panelTitle}>Información del Nodo</Text>
      <Text>ID: {selectedNode.id}</Text>
      <Text>Nombre: {selectedNode.name}</Text>
      <Text>
        Del tipo: {capitalizeFirstLetter(selectedNode.group || "default")}
      </Text>

      {videoUrl && (
        <iframe
          src={`https://www.youtube.com/embed/${videoUrl.split("v=")[1]}?start=${selectedNode.start}&end=${selectedNode.end}&autoplay=1&controls=1`}
          width="300"
          height="200"
          allow="autoplay; encrypted-media"
          style={{ border: "none" }}
        ></iframe>
      )}

      <Button title="Cerrar" onPress={onClose} />
    </View>
  );
};

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
  },
  panelTitle: {
    fontWeight: "bold",
    marginBottom: 10,
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

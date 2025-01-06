import React, { useState } from "react";
import NodeInfoPanel from "./PanelData/PanelData";
import { GraphLink } from "../../src/config/config";

// ...existing code...

const ParentComponent: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<GraphLink | null>(null);
  const [isPanelVisible, setIsPanelVisible] = useState(false);

  const handleNodeSelect = (node: GraphLink) => {
    setSelectedNode(node);
    setIsPanelVisible(true); // Mostrar el panel cuando se selecciona un nodo
  };

  return (
    <View>
      {/* ...existing code... */}
      <NodeInfoPanel
        emissiveColorRef={/* ... */}
        selectedNode={selectedNode}
        onClose={() => setIsPanelVisible(false)}
        links={/* ... */}
        videoUrl={/* ... */}
        setIsPanelVisible={setIsPanelVisible}
      />
      {/* ...existing code... */}
    </View>
  );
};

export default ParentComponent;

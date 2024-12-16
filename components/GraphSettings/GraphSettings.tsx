import React, { useState, useCallback } from "react";

type GraphSettings = {
  nodeSize?: number;
  linkDistance?: number;
  backgroundColor?: string;
};

type GraphVizProps = {
  onUpdateSettings: (settings: GraphSettings) => void; // Aquí definimos el tipo
};

const GraphViz: React.FC<GraphVizProps> = ({ onUpdateSettings }) => {
  const [settings, setSettings] = useState<GraphSettings>({
    nodeSize: 10,
    linkDistance: 50,
    backgroundColor: "#002",
  });

  const handleUpdateSettings = useCallback(() => {
    // Puedes cambiar la configuración aquí y pasarla al padre
    const newSettings: GraphSettings = {
      nodeSize: 20,  // Por ejemplo, modificar el tamaño de los nodos
      linkDistance: 100,
      backgroundColor: "#000",  // Cambiar el color de fondo
    };
    setSettings(newSettings);
    onUpdateSettings(newSettings);  // Llamar al método pasado por el componente padre
  }, [onUpdateSettings]);

  return (
    <div>
      <button onClick={handleUpdateSettings}>Actualizar Configuración</button>
      {/* Otros elementos para mostrar o modificar configuraciones */}
    </div>
  );
};

export default GraphViz;

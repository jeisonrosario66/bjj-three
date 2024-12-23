// hooks/useGraphData.ts
import { useState, useEffect } from "react";
import { NodeType } from "../src/config/config";

// Definición del hook useGraphData
export const useGraphData = (url: string) => {
  // Estado para almacenar los datos del grafo (nodos y enlaces)
  const [data, setData] = useState<{ nodes: NodeType[]; links: any[] }>({
    nodes: [],
    links: [],
  });

  // Efecto para cargar los datos del grafo desde la URL proporcionada
  useEffect(() => {
    fetch(url) // Realiza una solicitud fetch a la URL
      .then((res) => res.json()) // Convierte la respuesta a JSON
      .then((data) => {
        const { nodes, links } = data; // Extrae los nodos y enlaces de los datos
        setData({ nodes, links }); // Actualiza el estado con los datos del grafo
        console.log("Contenido cargado:", data); // Muestra los datos cargados en la consola
      })
      .catch((error) => {
        console.error("Error al cargar el archivo JSON:", error); // Muestra un error en la consola si la carga falla
      });
  }, [url]); // El efecto se ejecuta cada vez que cambia la URL

  return data; // Retorna los datos del grafo
};

export default useGraphData;
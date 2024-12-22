// hooks/useGraphData.ts
import { useState, useEffect } from "react";

export const useGraphData = (url: string) => {
  const [data, setData] = useState<{ nodes: { id: number; color?: string }[]; links: any[] }>({
    nodes: [],
    links: [],
  });

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const { nodes, links } = data;
        setData({ nodes, links });
        console.log("Contenido cargado:", data);
      })
      .catch((error) => {
        console.error("Error al cargar el archivo JSON:", error);
      });
  }, [url]);

  return data;
};

export default useGraphData;

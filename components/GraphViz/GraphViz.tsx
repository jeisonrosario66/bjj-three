import React, { useMemo, useRef, useCallback, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import ForceGraph3D from "r3f-forcegraph";
import * as THREE from "three";
import { Text } from '@react-three/drei';

//  Representa un nodo en el grafo, con un identificador (id) y posiciones opcionales en 3D (x, y, z)
type GraphNode = { id: number; x?: number; y?: number; z?: number };
// Representa un enlace entre dos nodos, definido por un nodo fuente (source) y un nodo destino (target).
type GraphLink = { source: number; target: number };

const GraphViz = () => {
  const fgRef = useRef<any>(null);
  const { camera } = useThree();

  useFrame(() => fgRef.current?.tickFrame());

  useEffect(() => {
    // Ruta del archivo JSON
    fetch('datasets/miserables.json')  // Asegúrate de que la ruta sea correcta
      .then((res) => res.json())        // Convertir la respuesta a formato JSON
      .then((data) => {
        console.log("Contenido de miserables.json:", data);
      })
      .catch((error) => {
        console.error("Error al cargar el archivo JSON:", error);
      });
  }, []);

  const N = 100;
  const gData = useMemo(
    () => ({
      nodes: [...Array(N).keys()].map((i) => ({ id: i })),
      links: [...Array(N).keys()]
        .filter((id) => id)
        .map((id) => ({
          source: id,
          target: Math.round(Math.random() * (id - 1)),
        })),
    }),
    [N]
  );

  const handleNodeHover = useCallback((node: GraphNode | null) => {
    if (node) {
      //console.log("Node hover:", node);
    }
  }, []);

  const handleLinkHover = useCallback((link: GraphLink | null) => {
    if (link) {
      //console.log("Link hover:", link);
    }
  }, []);

  const [isAnimating, setIsAnimating] = useState(false);
  const [targetPosition, setTargetPosition] = useState(new THREE.Vector3(0, 0, 0));

  const animateCamera = (target: THREE.Vector3) => {
    setIsAnimating(true);
    setTargetPosition(target);
  };

  useFrame(() => {
    if (isAnimating) {
      const currentPos = camera.position;
      const target = targetPosition;

      const speed = 0.05;
      const newPos = new THREE.Vector3().lerpVectors(currentPos, target, speed);

      camera.position.copy(newPos);

      if (newPos.distanceTo(target) < 0.1) {
        setIsAnimating(false);
        camera.position.copy(target);
      }
    }
  });

  const handleNodeClick = useCallback((node: GraphNode | null) => {
    if (!node) return;
    console.log("Node click:", node);

    const distance = 40;
    const distRatio =
      1.1 + distance / Math.hypot(node.x || 0, node.y || 0, node.z || 0);

    const target = new THREE.Vector3(
      (node.x || 0) * distRatio,
      (node.y || 0) * distRatio,
      (node.z || 0) * distRatio
    );

    animateCamera(target);

    const lookAtTarget = new THREE.Vector3(node.x || 0, node.y || 0, node.z || 0);
    camera.lookAt(lookAtTarget);
  }, [camera]);

  const handleLinkClick = useCallback((link: GraphLink | null) => {
    if (link) {
      console.log("Link click:", link);
    }
  }, []);

  return (
    <ForceGraph3D
      ref={fgRef}
      graphData={gData}
      onNodeHover={handleNodeHover}
      onLinkHover={handleLinkHover}
      onNodeClick={handleNodeClick}  // Mantener onNodeClick, que es un evento soportado
      onLinkClick={handleLinkClick}

      nodeColor={(node) => node.id % 2 === 0 ? 'blue' : 'green'}
      nodeOpacity={0.80}
      nodeVal={5}
      
      linkColor={"blue"}
      linkWidth={2}
      linkOpacity={0.2}
      linkCurvature={1}
    />
  );
};

export default GraphViz;

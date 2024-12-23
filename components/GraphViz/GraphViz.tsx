import React, {
  useMemo,
  useRef,
  useCallback,
  useState,
  useEffect,
} from "react";
import { useFrame, useThree, extend } from "@react-three/fiber";
import ForceGraph3D from "r3f-forcegraph";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import useGraphData from "../../hooks/useGraphData";
import useCameraAnimation from "../../hooks/useCameraAnimation";
import SpriteText from "three-spritetext";
import {
  configGlobal,
  groupColors,
  GraphLink,
  GraphNode,
} from "../../src/config/config";

// Define las props para GraphViz
type GraphVizProps = {
  orbitControlsRef: React.MutableRefObject<any>; // Referencia para los controles de la cámara
  onNodeSelect: (node: GraphNode) => void; // Función para manejar la selección de nodo
  setSelectedNode: React.Dispatch<React.SetStateAction<any>>; // Función para actualizar el nodo seleccionado
  onConnectedLinksUpdate: (links: GraphLink[]) => void; // Función para actualizar los enlaces conectados
};

const GraphViz: React.FC<GraphVizProps> = ({
  orbitControlsRef,
  onNodeSelect,
  setSelectedNode: setSelectedNodeProp,
  onConnectedLinksUpdate,
}) => {
  const fgRef = useRef<any>(null); // Referencia para el grafo 3D
  const { camera } = useThree(); // Obtener la cámara de la escena
  const perspectiveCamera = camera as THREE.PerspectiveCamera; // Convertir la cámara a perspectiva
  const { nodes, links } = useGraphData(configGlobal.DataBaseDir); // Obtener los datos del grafo
  const { isAnimating, animateCamera } = useCameraAnimation(
    perspectiveCamera,
    orbitControlsRef
  ); // Animación de la cámara
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null); // Estado para almacenar el nodo seleccionado

  useFrame(() => fgRef.current?.tickFrame()); // Actualizar el grafo en cada frame

  // Manejar el evento de hover sobre un nodo
  // const handleNodeHover = useCallback((node: GraphNode | null) => {
  //   if (node) {
  //     //console.log("Node hover:", node);{
  //   }
  // }, []);

  // Manejar el evento de hover sobre un enlace
  // const handleLinkHover = useCallback((link: GraphLink | null) => {
  //   if (link) {
  //     //console.log("Link hover:", link);
  //   }
  // }, []);

  // Manejar el evento de clic sobre un enlace
  // const handleLinkClick = useCallback((link: GraphLink | null) => {
  //   if (link) {
  //     console.log("Link click:", link);
  //   }
  // }, []);

  const handleNodeClick = useCallback(
    // Manejar el evento de clic sobre un nodo
    (node: GraphNode | null) => {
      // Si el nodo es null o no existe, la función simplemente retorna, evitando errores
      if (!node) {
        setSelectedNodeProp(null); // Si no hay nodo, deselecciona el nodo
        return;
      }
      setSelectedNode(node); // Actualizar el nodo seleccionado
      onNodeSelect(node); // Llamar a la función de selección de nodo

      // const connectedLinks = links.filter(
      //   (link) => link.source === node.id || link.target === node.id
      // );
      //console.log("Conexiones del nodo:", connectedLinks);

      const distance = configGlobal.nodeClickDistance;
      /*Calcula un factor de escala basado en la posición del nodo
       para posicionar la cámara a una distancia uniforme desde el nodo clicado,
       independientemente de su ubicación en el espacio.
      */
      const distRatio =
        2.1 + distance / Math.hypot(node.x || 0, node.y || 0, node.z || 0);

      const target = new THREE.Vector3(
        (node.x || 0) * distRatio,
        (node.y || 0) * distRatio,
        (node.z || 0) * distRatio
      );

      animateCamera(target); // Animar la cámara hacia el nodo seleccionado

      const lookAtTarget = new THREE.Vector3(
        node.x || 0,
        node.y || 0,
        node.z || 0
      );
      perspectiveCamera.lookAt(lookAtTarget);
    },
    [perspectiveCamera, links]
  );

  // Generar enlaces bidireccionales
  const bidirectionalLinks = useMemo(() => {
    return links.flatMap((link) => {
      if (link.isBidirectional) {
        // Genera enlaces en ambas direcciones si son bidireccionales
        return [
          { ...link, curvature: 0.2 }, // Curva en un sentido
          { source: link.target, target: link.source, curvature: -0.2 }, // Curva inversa
        ];
      } else {
        // Deja el enlace tal cual si no es bidireccional
        return [{ ...link, curvature: 0 }];
      }
    });
  }, [links]);

  // Filtrar los enlaces que están conectados al nodo seleccionado
  const connectedLinks = useMemo(() => {
    if (!selectedNode) return [];
    return links.filter(
      (link) =>
        link.source === selectedNode.id || link.target === selectedNode.id
    );
  }, [selectedNode, links]);

  // Actualizar los enlaces conectados en el componente padre
  useEffect(() => {
    onConnectedLinksUpdate(connectedLinks);
  }, [connectedLinks, onConnectedLinksUpdate]);

  return (
    <>
      <EffectComposer>
        {/* Efecto Bloom aplicado a todo el escenario */}
        <Bloom
          intensity={0.5} // Intensity del efecto bloom
          width={150} // Ancho de la resolución interna
          height={300} // Alto de la resolución interna
          kernelSize={5} // Tamaño del "kernel"
          luminanceThreshold={0.1} // Umbral de luminancia
          luminanceSmoothing={20} // Suavizado de luminancia
        />
      </EffectComposer>

      <ForceGraph3D
        ref={fgRef}
        graphData={{ nodes, links: bidirectionalLinks }}
        onNodeClick={handleNodeClick}
        // onNodeHover={handleNodeHover}
        // onLinkHover={handleLinkHover}
        // onLinkClick={handleLinkClick}
        // nodeColor={(node) => (node.id % 2 === 0 ? "blue" : "green")}
        // nodeColor={(node) => (node.id === selectedNode?.id ? "brown" : node.color || "gray")}  // Resalta el nodo clickeado
        // nodeOpacity={0.8}
        // nodeVal={(node) => (node.id === selectedNode?.id ? 10 : 5)}  // Aumenta el tamaño del nodo seleccionado
        linkColor={() => configGlobal.linksColor} // Aplicar color fijo a los enlaces
        linkDirectionalArrowColor={() => configGlobal.arrowsColor} // Aplicar color fijo a las flechas
        linkDirectionalParticleColor={() => configGlobal.particleColor} // Aplicar color fijo a las partículas
        linkWidth={1}
        linkOpacity={0.3}
        linkCurvature={(link) => link.curvature ?? 0} // Usar curvatura personalizada
        linkDirectionalArrowLength={4}
        linkDirectionalArrowRelPos={
          (link) => (link.isReversed ? 0.01 : 1.01) // Flecha en diferentes extremos según la dirección
        }
        linkDirectionalParticles={2}
        nodeThreeObject={(node: GraphNode) => {
          const group = new THREE.Group();

          const nodeColor = groupColors[node.group || "default"] || "gray"; // Default a gris si no se encuentra el grupo

          const sphereGeometry = new THREE.SphereGeometry(
            node.id === selectedNode?.id ? 6 : 5,
            16,
            10
          );
          const sphereRadius = node.id === selectedNode?.id ? 7 : 5; // Radio de la esfera;
          const sphereMaterial = new THREE.MeshStandardMaterial({
            // Nodos seleccionados son de color marrón y tienen mayor opacidad.
            color: nodeColor, // Asigna el color basado en el grupo
            opacity: node.id === selectedNode?.id ? 0.9 : 0.6,
            transparent: true,
            emissive: nodeColor || "white", // Color del brillo
            emissiveIntensity: node.id === selectedNode?.id ? 5 : 0.1, // Más intensidad para el nodo seleccionado
          });
          const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

          const sprite = new SpriteText(
            `${node.name} {${node.id}}` || `Node ${node.id}`
          );
          sprite.color = "white";
          sprite.textHeight = 3;
          sprite.position.set(0, sphereRadius + 2, 0);
          sprite.backgroundColor = configGlobal.spriteBackgroundColor;

          group.add(sphere);
          group.add(sprite);
          return group;
        }}
      />
    </>
  );
};

export default GraphViz;

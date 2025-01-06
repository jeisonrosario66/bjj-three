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
  isBrilloActivo: boolean; // Prop para controlar el brillo
  orbitControlsRef: React.MutableRefObject<any>; // Referencia para los controles de la cámara
  onNodeSelect: (node: GraphNode) => void; // Función para manejar la selección de nodo
  onLinkSelect: (node: GraphLink) => void; // Función para manejar la selección de enlace
};

const GraphViz: React.FC<GraphVizProps> = ({
  orbitControlsRef,
  onNodeSelect,
  onLinkSelect,
  isBrilloActivo,
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

  // Crea un objeto de referencia para asociar los materiales con los nodos correspondientes.
  const nodeMaterialsRef = useRef<Record<string, THREE.MeshStandardMaterial>>(
    {}
  );

  useFrame(() => fgRef.current?.tickFrame()); // Actualizar el grafo en cada frame

  // Indexar los nodos por su id para un acceso rápido
  const nodeMap = useMemo(() => {
    const map: Record<string, GraphNode> = {};
    nodes.forEach((node) => {
      map[node.id] = node;
    });
    return map;
  }, [nodes]);
  const { scene } = useThree(); // Obtén la escena directamente

  const handleLinkHover = useCallback(
    (link: GraphLink | null) => {
      if (link) {
        const source =
          typeof link.source === "object"
            ? (link.source as GraphNode).id
            : link.source;
        const target =
          typeof link.target === "object"
            ? (link.target as GraphNode).id
            : link.target;

        console.log(`Hovered link: ${source} -> ${target}`);

        // Crear SpriteText dinámico
        const sprite = new SpriteText(
          `${nodeMap[source]?.name || source} -> ${
            nodeMap[target]?.name || target
          }`
        );
        sprite.color = "yellow";
        sprite.textHeight = 5;

        // Posicionarlo entre los nodos fuente y destino
        const linkMidpoint = new THREE.Vector3(
          ((nodeMap[source]?.x || 0) + (nodeMap[target]?.x || 0)) / 2,
          ((nodeMap[source]?.y || 0) + (nodeMap[target]?.y || 0)) / 2,
          ((nodeMap[source]?.z || 0) + (nodeMap[target]?.z || 0)) / 2
        );
        sprite.position.copy(linkMidpoint);

        // Agregar el Sprite a la escena
        scene.add(sprite);

        // Elimina el sprite después de un tiempo
        setTimeout(() => scene.remove(sprite), 2000); // Opcional
      }
    },
    [nodeMap, scene]
  );

  const [highlightedLink, setHighlightedLink] = useState<GraphLink | null>(
    null
  );

  // Manejar el evento de clic sobre un enlace
  const handleLinkClick = useCallback(
    (link: GraphLink | null) => {
      if (link) {
        // Establecer el enlace resaltado
        setHighlightedLink(link);
        onLinkSelect(link); // Llamar a la función de selección de enlace

        // Obtener las posiciones de los nodos fuente y destino
        const sourceNode =
          typeof link.source === "object"
            ? (link.source as GraphNode) // Si link.source es un objeto, úsalo directamente
            : nodeMap[link.source]; // Si es un identificador, búscalo en el mapa de nodos

        const targetNode =
          typeof link.target === "object"
            ? (link.target as GraphNode)
            : nodeMap[link.target];

        if (!sourceNode || !targetNode) {
          console.warn("No se encontraron nodos asociados al enlace.");
          return;
        }

        // Calcular el punto medio del enlace
        const midpoint = new THREE.Vector3(
          ((sourceNode.x || 0) + (targetNode.x || 0)) / 2,
          ((sourceNode.y || 0) + (targetNode.y || 0)) / 2,
          ((sourceNode.z || 0) + (targetNode.z || 0)) / 2
        );

        // Calcular el vector dirección del enlace
        const linkDirection = new THREE.Vector3(
          (targetNode.x || 0) - (sourceNode.x || 0),
          (targetNode.y || 0) - (sourceNode.y || 0),
          (targetNode.z || 0) - (sourceNode.z || 0)
        ).normalize();

        // Calcular un vector lateral perpendicular al enlace
        const lateralDirection = new THREE.Vector3();
        lateralDirection.crossVectors(
          linkDirection,
          new THREE.Vector3(0, 1, 0)
        ); // Usar el eje Y como referencia

        // Si el enlace es paralelo al eje Y, usar otro eje de referencia
        if (lateralDirection.length() === 0) {
          lateralDirection.crossVectors(
            linkDirection,
            new THREE.Vector3(1, 0, 0)
          ); // Usar el eje X como referencia
        }

        lateralDirection.normalize();

        // Calcular la posición lateral de la cámara
        const lateralDistance = configGlobal.linkClickDistance || 50; // Distancia lateral configurable
        const cameraPosition = new THREE.Vector3(
          midpoint.x + lateralDirection.x * lateralDistance,
          midpoint.y + lateralDirection.y * lateralDistance,
          midpoint.z + lateralDirection.z * lateralDistance
        );

        // Animar la cámara hacia la posición calculada
        animateCamera(cameraPosition);

        // Hacer que la cámara mire al punto medio
        perspectiveCamera.lookAt(midpoint);
      } else {
        // Si no se selecciona ningún enlace, desactivar el resaltado
        setHighlightedLink(null);
      }
    },
    [nodeMap, animateCamera, perspectiveCamera]
  );

  const [highlightedNode, setHighlightedNode] = useState<GraphNode | null>(
    null
  );
  const handleNodeClick = useCallback(
    // Manejar el evento de clic sobre un nodo
    (node: GraphNode | null) => {
      // Si el nodo es null o no existe, la función simplemente retorna, evitando errores
      if (!node) {
        setHighlightedNode(null);
        return;
      }
      setHighlightedLink(null);

      onNodeSelect(node); // Llamar a la función de selección de nodo y muestra el panel de información
      // Resalta el nodo actual seleccionado
      setHighlightedNode(node);
      // Resalta el nodo seleccionado

      const material = nodeMaterialsRef.current[node.id];

      // const connectedLinks = links.filter(
      //   (link) => link.source === node.id || link.target === node.id
      // );
      //console.log("Conexiones del nodo:", connectedLinks);
      // Si no se selecciona ningún enlace, desactivar el resaltado
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

  useEffect(() => {
    if (isBrilloActivo) {
      // Activar el brillo (puedes aplicar cambios en el material o luz en tu escena 3D)
      console.log("Brillo activado");
    } else {
      // Desactivar el brillo
      console.log("Brillo desactivado");
    }
  }, [isBrilloActivo]); // Se ejecuta cuando `isBrilloActivo` cambia

  return (
    <>
      {/* Efecto Bloom aplicado a todo el escenario */}
      <EffectComposer>
        <Bloom
          intensity={100} // Intensity del efecto bloom
          width={450} // Ancho de la resolución interna
          height={450} // Alto de la resolución interna
          kernelSize={1} // Tamaño del "kernel"
          luminanceThreshold={0.1} // Umbral de luminancia
          luminanceSmoothing={200} // Suavizado de luminancia
        />
      </EffectComposer>

      <ForceGraph3D
        ref={fgRef}
        graphData={{ nodes, links: bidirectionalLinks }}
        onNodeClick={handleNodeClick}
        // onNodeHover={handleNodeHover}
        // onLinkHover={handleLinkHover}
        onLinkClick={handleLinkClick}
        nodeColor={(node) => groupColors[node.group] || "gray"}
        // nodeAutoColorBy={(node) => groupColors[node.group] || "red"} // Asigna color basado en el grupo
        // nodeColor={(node) => (node.id === selectedNode?.id ? "brown" : node.color || "gray")}  // Resalta el nodo clickeado
        // nodeOpacity={100}
        // nodeVal={(node) => (node.id === selectedNode?.id ? 10 : 5)}  // Aumenta el tamaño del nodo seleccionado

        linkColor={(link) =>
          highlightedLink === link
            ? configGlobal.linksColorResaldato
            : configGlobal.linksColor
        }
        linkWidth={(link) => (highlightedLink === link ? 3 : 1)}
        linkDirectionalArrowColor={() => configGlobal.arrowsColor} // Aplicar color fijo a las flechas
        linkDirectionalParticleColor={() => configGlobal.particleColor} // Aplicar color fijo a las partículas
        // linkWidth={1}
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
          const emissiveColor = (node.id === highlightedNode?.id && isBrilloActivo) ? "#fff" : "#000";
          const emissiveIntensity = (node.id === highlightedNode?.id && isBrilloActivo) ? 5 : 0.1;
          const sphereRadius = node.id === selectedNode?.id ? 7 : 5; // Radio de la esfera;
          const sphereMaterial = new THREE.MeshStandardMaterial({
            // Nodos seleccionados son de color marrón y tienen mayor opacidad.
            color: nodeColor, // Asigna el color basado en el grupo
            opacity: node.id === selectedNode?.id ? 0.9 : 0.6,
            transparent: true,
            emissive: emissiveColor,
            emissiveIntensity: emissiveIntensity
          });

          // Guarda el material en el mapa de referencias
          nodeMaterialsRef.current[node.id] = sphereMaterial;

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

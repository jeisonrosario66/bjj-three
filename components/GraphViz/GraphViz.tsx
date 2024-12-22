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
import configGlobal from "../../src/config/config";

//  Representa un nodo en el grafo, con un identificador (id) y posiciones opcionales en 3D (x, y, z)
type GraphNode = {
  id: number;
  x?: number;
  y?: number;
  z?: number;
  name?: string;
  color?: string;
  group?: string;
};
// Representa un enlace entre dos nodos, definido por un nodo fuente (source) y un nodo destino (target).
type GraphLink = { source: number; target: number };

type GraphVizProps = {
  orbitControlsRef: React.MutableRefObject<any>;
};

const GraphViz: React.FC<GraphVizProps> = ({ orbitControlsRef }) => {
  const fgRef = useRef<any>(null);
  const { camera } = useThree();
  const perspectiveCamera = camera as THREE.PerspectiveCamera;
  const { nodes, links } = useGraphData("datasets/miserables.json");
  const { isAnimating, animateCamera } = useCameraAnimation(
    perspectiveCamera,
    orbitControlsRef
  );

  useFrame(() => fgRef.current?.tickFrame());

  const handleNodeHover = useCallback((node: GraphNode | null) => {
    if (node) {
      //console.log("Node hover:", node);{
    }
  }, []);

  const handleLinkHover = useCallback((link: GraphLink | null) => {
    if (link) {
      //console.log("Link hover:", link);
    }
  }, []);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);

  const handleNodeClick = useCallback(
    (node: GraphNode | null) => {
      // Si el nodo es null o no existe, la función simplemente retorna, evitando errores
      if (!node) return;
      console.log("Id: ", node.id);
      console.log("Nombre: ", node.name);
      console.log("Tipo de node: ", typeof node);
      console.log("-------------------------------------");

      setSelectedNode(node); // Almacena el nodo clickeado

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

      animateCamera(target);

      const lookAtTarget = new THREE.Vector3(
        node.x || 0,
        node.y || 0,
        node.z || 0
      );
      perspectiveCamera.lookAt(lookAtTarget);
    },
    [perspectiveCamera]
  );

  console.log(isAnimating);

  const handleLinkClick = useCallback((link: GraphLink | null) => {
    if (link) {
      console.log("Link click:", link);
    }
  }, []);
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
        onNodeHover={handleNodeHover}
        onLinkHover={handleLinkHover}
        onNodeClick={handleNodeClick}
        onLinkClick={handleLinkClick}
        // nodeColor={(node) => (node.id % 2 === 0 ? "blue" : "green")}
        // nodeColor={(node) => (node.id === selectedNode?.id ? "brown" : node.color || "gray")}  // Resalta el nodo clickeado
        // nodeOpacity={0.8}
        // nodeVal={(node) => (node.id === selectedNode?.id ? 10 : 5)}  // Aumenta el tamaño del nodo seleccionado
        // linkColor={"red"}
        linkWidth={1}
        linkOpacity={0.2}
        linkCurvature={(link) => link.curvature} // Usar curvatura personalizada
        linkDirectionalArrowLength={4}
        linkDirectionalArrowRelPos={
          (link) => (link.isReversed ? 0.01 : 1.01) // Flecha en diferentes extremos según la dirección
        }
        linkDirectionalParticles={2}
        nodeThreeObject={(node: GraphNode) => {
          const group = new THREE.Group();

          // Aquí puedes asignar colores basados en el grupo
          const groupColors: Record<string, string> = {
            "control": "blue",
            "sumision": "red",
            "pasaje": "yellow",
            // Agrega más grupos según tu dataset
          };

          const nodeColor = groupColors[node.group || "default"] || "gray"; // Default a gris si no se encuentra el grupo

          const sphereGeometry = new THREE.SphereGeometry(
            node.id === selectedNode?.id ? 6 : 5,
            16,
            10
          );
          const sphereRadius = node.id === selectedNode?.id ? 7 : 5; // Radio de la esfera;
          const sphereMaterial = new THREE.MeshStandardMaterial({
            // Nodos seleccionados son de color marrón y tienen mayor opacidad.
            color: nodeColor,  // Asigna el color basado en el grupo
            opacity: node.id === selectedNode?.id ? 0.9 : 0.6,
            transparent: true,
            emissive: node.color || "white", // Color del brillo
            emissiveIntensity: node.id === selectedNode?.id ? 5 : 0.5, // Más intensidad para el nodo seleccionado
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

import * as THREE from "three";
import SpriteText from "three-spritetext";
import { GraphNode, groupColors,configGlobal } from "./config";
import {
    useRef,
} from "react";

// Crea un objeto de referencia para asociar los materiales con los nodos correspondientes.
const nodeMaterialsRef = useRef<Record<string, THREE.MeshStandardMaterial>>(
    {}
);
const nodeComponent = (node: GraphNode, selectedNode: GraphNode) => {
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
};

export default nodeComponent;
import { Mesh } from "three"; // Importas la clase Mesh
import { useRef, useState } from "react";
import { useFrame, MeshProps, useLoader } from "@react-three/fiber";

interface CubeProps extends MeshProps {
  color?: string; // Propiedad opcional para el color
  position?: [number, number, number]; // Dimensiones opcionales
  onClick?: () => void; // Evento de click
  dimensions?: [number, number, number]; // Dimensiones opcionales
  background?: string;
}



const Graph: React.FC<CubeProps> = ({
  rotation,
  color,
  position,
  onClick,
  dimensions = [1, 32, 32],
}) => {
  const meshRef = useRef<Mesh>(null); // La referencia tiene el tipo Mesh
  //const texture = useTexture("/tachi-waza.jpg"); // Carga la textura
  const [isClicked, setIsClicked] = useState(false); // Estado para manejar el clic
  const [hovered, setHovered] = useState(false); // Estado para manejar el hover
  console.log(`${color} is clicked ${isClicked} `);
  console.log(`${color} is hovered ${hovered} `);



  // Animar rotación y escala
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01; // Rotación en el eje X
      meshRef.current.rotation.y += 0.01; // Rotación en el eje Y
    }
  });

  // Manejar el clic sobre la esfera
  const handlePointerDown = (e: any) => {
    e.stopPropagation(); // Evita que el evento se propague
    setIsClicked(true); // Activa el estado "clicked"
    setTimeout(() => setIsClicked(false), 300); // Desactiva después de 300ms
    if (onClick) onClick(); // Llama al manejador de clic
  };

  return (
    <mesh
      ref={meshRef}
      rotation={rotation}
      position={position}
      onPointerDown={handlePointerDown}
      onPointerOver={() => setHovered(true)} // Cambia el estado al pasar el mouse
      onPointerOut={() => setHovered(false)} // Restaura el estado al salir del mouse
    >
      {/* Aquí estamos usando una esfera */}
      <sphereGeometry args={dimensions} />{" "}
      <meshPhysicalMaterial
        transmission={15} // Define la transparencia (como cristal)
        opacity={1} // Opacidad del material
        transparent={true} // Habilita transparencia
        roughness={1} // Reduce la aspereza para un acabado brillante
        metalness={0.5} // Añade un efecto metálico
        reflectivity={0.9} // Aumenta la reflectividad
        clearcoat={0.8} // Da un acabado de capa brillante
        clearcoatRoughness={0.1} // Controla la aspereza de la capa brillante
        emissive={isClicked ? "yellow" : "black"} // Emisión activa al hacer clic
        emissiveIntensity={isClicked ? 2 : 0} // Intensidad del brillo
        color={hovered ? "lightblue" : color || "orange"}
      />

      
    </mesh>
  );
};

export default Graph;

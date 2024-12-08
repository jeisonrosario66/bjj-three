import { Mesh } from "three"; // Importas la clase Mesh
import { useRef } from "react";
import { useFrame, MeshProps } from "@react-three/fiber";

interface CubeProps extends MeshProps {
  color?: string; // Propiedad opcional para el color
  position?: [number, number, number]; // Dimensiones opcionales
  onClick?: () => void; // Evento de click
  dimensions?: [number, number, number]; // Dimensiones opcionales
}

const Graph: React.FC<CubeProps> = ({ rotation, color, position, onClick, dimensions = [1, 32, 32] }) => {
  const meshRef = useRef<Mesh>(null); // La referencia tiene el tipo Mesh

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01; // Rotación en el eje X
      meshRef.current.rotation.y += 0.01; // Rotación en el eje Y
    }
  });

  // Manejar el clic sobre la esfera
  const handlePointerDown = (e: any) => {
    e.stopPropagation(); // Evita que el evento se propague
    if (onClick) onClick(); // Llama al manejador de clic
  };

  return (
    <mesh
      ref={meshRef}
      rotation={rotation}
      position={position}
      onPointerDown={handlePointerDown}
    >
      <sphereGeometry args={dimensions} />{" "}
      {/* Aquí estamos usando una esfera */}
      <meshPhongMaterial color={color || "orange"} />
    </mesh>
  );
};

export default Graph;

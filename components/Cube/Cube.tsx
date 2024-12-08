// Cube.tsx
import React from 'react';
import { MeshProps } from '@react-three/fiber';

interface CubeProps extends MeshProps {
  color?: string; // Propiedad opcional para el color
  dimensions?: [number, number, number]; // Dimensiones opcionales
}

const Cube: React.FC<CubeProps> = ({ rotation, color, dimensions = [2, 2, 2] }) => {
  return (
    <mesh rotation={rotation}>
      <boxGeometry args={dimensions} />
      <meshPhongMaterial color={color || 'orange'} />
    </mesh>
  );
};

export default Cube;



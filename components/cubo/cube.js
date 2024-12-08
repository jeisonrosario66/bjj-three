// Cube.js
import React from 'react';
import { mesh } from '@react-three/fiber/native';  // Importa los elementos necesarios
import { boxGeometry, meshPhongMaterial } from '@react-three/fiber';

const Cube = ({ rotation, color }) => {
  return (
    <mesh rotation={rotation}>
      <boxGeometry args={[2, 2, 2]} />
      <meshPhongMaterial color={color || 'orange'} />
    </mesh>
  );
};

export default Cube;

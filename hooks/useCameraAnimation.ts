// hooks/useCameraAnimation.ts
import { useState, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Definición del hook useCameraAnimation
export const useCameraAnimation = (camera: THREE.PerspectiveCamera, orbitControlsRef: React.RefObject<any>) => {
  // Estado para indicar si la cámara está animando
  const [isAnimating, setIsAnimating] = useState(false);
  // Estado para almacenar la posición objetivo de la cámara
  const [targetPosition, setTargetPosition] = useState(new THREE.Vector3(0, 0, 0));

  // Función para iniciar la animación de la cámara hacia una posición objetivo
  const animateCamera = useCallback((target: THREE.Vector3) => {
    setIsAnimating(true); // Indica que la cámara está animando
    setTargetPosition(target); // Establece la posición objetivo
  }, []);

  // Hook para actualizar la cámara en cada frame
  useFrame(() => {
    if (isAnimating) {
      const currentPos = camera.position; // Posición actual de la cámara
      const target = targetPosition; // Posición objetivo
      const speed = 0.08;     // Velocidad de la animación
      const newPos = new THREE.Vector3().lerpVectors(currentPos, target, speed); // Interpolación lineal entre la posición actual y la objetivo
      camera.position.copy(newPos); // Actualiza la posición de la cámara

      // Si la cámara está cerca de la posición objetivo, detiene la animación
      if (newPos.distanceTo(target) < 0.1) {
        setIsAnimating(false); // Detiene la animación
        camera.position.copy(target); // Asegura que la cámara esté exactamente en la posición objetivo

        // Habilita los controles de órbita si están disponibles
        if (orbitControlsRef?.current) {
          orbitControlsRef.current.enabled = true;
        }
      }
    }
  });

  return { isAnimating, animateCamera }; // Retorna el estado de animación y la función para iniciar la animación
};

export default useCameraAnimation;
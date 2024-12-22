// hooks/useCameraAnimation.ts
import { useState, useCallback} from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const useCameraAnimation = (camera: THREE.PerspectiveCamera, orbitControlsRef: React.RefObject<any>) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [targetPosition, setTargetPosition] = useState(new THREE.Vector3(0, 0, 0));

  const animateCamera = useCallback((target: THREE.Vector3) => {
    setIsAnimating(true);
    setTargetPosition(target);
    
  }, []);

  useFrame(() => {
    if (isAnimating) {
      const currentPos = camera.position;
      const target = targetPosition;
      const speed = 0.1;
      const newPos = new THREE.Vector3().lerpVectors(currentPos, target, speed);
      camera.position.copy(newPos);

      if (newPos.distanceTo(target) < 0.4) {
        setIsAnimating(false);
        camera.position.copy(target);

        if (orbitControlsRef?.current) {
          orbitControlsRef.current.enabled = true;
        }
      }
    }
  });

  return { isAnimating, animateCamera };
};

export default useCameraAnimation;
import { Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

function Scene() {
  const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useLoader(
    TextureLoader,
    [
      ". PavingStones092_1K-JPG/PavingStones092_1K_Color.jpg",
      "PavingStones092_1K-JPG/PavingStones092_1K_Displacement.jpg",
      "PavingStones092_1K-JPG/PavingStones092_1K_Normal.jpg",
      "PavingStones092_1K-JPG/PavingStones092_1K_Roughness.jpg",
      "PavingStones092_1K-JPG/PavingStones092_1K_AmbientOcclusion.jpg",
    ]
  );
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight />
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          map={colorMap}
          displacementMap={displacementMap}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
          aoMap={aoMap}
        />
      </mesh>
    </>
  );
}

export default function App() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}

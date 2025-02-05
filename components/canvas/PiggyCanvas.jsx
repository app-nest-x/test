'use client';

import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

const PiggyModel = ({ modelRef }) => {
  const { scene } = useGLTF('/model.glb');

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.02;
    }
  });

  return (
    <group ref={modelRef}>
      <primitive object={scene} scale={10} />
    </group>
  );
};

export default function PiggyCanvas() {
  const modelRef = useRef();

  return (
    <div className="h-[400px]">
      <Canvas
        frameloop="always"
        camera={{ position: [20, 5, 15], fov: 40, near: 0.1, far: 100 }}
        gl={{ preserveDrawingBuffer: true }}
        shadows
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={2} />

          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            enableDamping
            dampingFactor={0.1}
            rotateSpeed={1}
          />
          
          <PiggyModel modelRef={modelRef} />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
}

import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

const PiggyCanvas = ({ orbitRef }) => {
  const { scene } = useGLTF('/model.glb');
  const piggyRef = useRef();

  // Rotate the model continuously
  useFrame(() => {
    if (piggyRef.current && orbitRef.current) {
      // Apply automatic rotation only if the user is not interacting
      if (!orbitRef.current.active) {
        piggyRef.current.rotation.y += 0.02; // Adjust speed if needed
      }
    }
  });

  return (
    <group ref={piggyRef}>
      <primitive object={scene} scale={10} />
    </group>
  );
};

const PiggyBankCanvas = () => {
  const orbitRef = useRef();

  return (
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
          ref={orbitRef}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enableDamping
          dampingFactor={0.1} // Makes the rotation smoother
          rotateSpeed={1} // Adjusts mouse rotation speed
        />
        
        {/* Pass orbitRef as a prop */}
        <PiggyCanvas orbitRef={orbitRef} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default PiggyBankCanvas;

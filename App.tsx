import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky, PointerLockControls } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import { Player } from './components/Player';
import { Cube } from './components/Cube';
import { Ground } from './components/Ground';
import { useStore } from './hooks/useStore';
import { TextureSelector } from './components/TextureSelector';

// FIX: Removed React.FC type to align with modern best practices and fix JSX type errors.
const App = () => {
  const { cubes, addCube, removeCube } = useStore();

  return (
    <>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-4xl pointer-events-none z-10">
        +
      </div>
      <Canvas shadows>
        <Suspense fallback={null}>
          <Sky sunPosition={[100, 100, 20]} />
          <ambientLight intensity={0.5} />
          <directionalLight
            castShadow
            position={[10, 15, 10]}
            intensity={1.5}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <Physics>
            <Player />
            <Ground addCube={addCube} />
            {cubes.map(({ key, pos, texture }) => (
              <Cube key={key} position={pos} texture={texture} addCube={addCube} removeCube={removeCube} />
            ))}
          </Physics>
        </Suspense>
        <PointerLockControls />
      </Canvas>
      <TextureSelector />
    </>
  );
};

export default App;

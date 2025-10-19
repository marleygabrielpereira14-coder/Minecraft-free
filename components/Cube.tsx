import React, { useState } from 'react';
import { useBox } from '@react-three/cannon';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { textureImages, type Texture } from '../constants';
import { ThreeEvent } from '@react-three/fiber';

interface CubeProps {
  position: [number, number, number];
  texture: Texture;
  addCube: (x: number, y: number, z: number) => void;
  removeCube: (x: number, y: number, z: number) => void;
}

// FIX: Removed React.FC type and explicitly typed props for better type safety and to resolve JSX errors.
export const Cube = ({ position, texture, addCube, removeCube }: CubeProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const [ref] = useBox(() => ({
    type: 'Static',
    position,
  }));

  const activeTexture = useTexture(textureImages[texture]);
  activeTexture.magFilter = THREE.NearestFilter;

  // FIX: Added explicit type for the event object.
  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setIsHovered(true);
  };

  // FIX: Added explicit type for the event object.
  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setIsHovered(false);
  };

  // FIX: Added explicit type for the event object and a check for e.faceIndex.
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (e.faceIndex === undefined) return;
    const clickedFace = Math.floor(e.faceIndex / 2); // 0: px, 1: nx, 2: py, 3: ny, 4: pz, 5: nz
    const [x, y, z] = position;

    if (e.button === 2) { // Right click to add
      if (clickedFace === 0) addCube(x + 1, y, z);
      else if (clickedFace === 1) addCube(x - 1, y, z);
      else if (clickedFace === 2) addCube(x, y + 1, z);
      else if (clickedFace === 3) addCube(x, y - 1, z);
      else if (clickedFace === 4) addCube(x, y, z + 1);
      else if (clickedFace === 5) addCube(x, y, z - 1);
    } else if (e.button === 0) { // Left click to remove
      removeCube(x, y, z);
    }
  };

  return (
    <mesh
      // FIX: Removed unnecessary ref cast to fix potential JSX type errors.
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
      castShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        map={activeTexture}
        color={isHovered ? 'grey' : 'white'}
        transparent={texture === 'glass'}
        opacity={texture === 'glass' ? 0.6 : 1}
      />
    </mesh>
  );
};
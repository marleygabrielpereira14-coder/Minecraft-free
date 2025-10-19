import React from 'react';
import { usePlane } from '@react-three/cannon';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { ThreeEvent } from '@react-three/fiber';

interface GroundProps {
    addCube: (x: number, y: number, z: number) => void;
}

// FIX: Removed React.FC type and explicitly typed props for better type safety and to resolve JSX errors.
export const Ground: React.FC<GroundProps> = ({ addCube }) => {
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, -0.5, 0],
    }));

    const grassTexture = useTexture('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/minecraft/grass.png');
    grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
    grassTexture.repeat.set(100, 100);
    grassTexture.magFilter = THREE.NearestFilter;
    grassTexture.minFilter = THREE.NearestFilter;

    // FIX: Added explicit type for the event object.
    const handleClick = (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        if (e.button !== 2) return; // Only add on right click

        const [x, y, z] = Object.values(e.point).map(val => Math.ceil(val as number));
        addCube(x, y - 1, z - 1);
    };

    return (
        // FIX: Removed unnecessary ref cast to fix potential JSX type errors.
        <mesh ref={ref} receiveShadow onClick={handleClick}>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial map={grassTexture} />
        </mesh>
    );
};
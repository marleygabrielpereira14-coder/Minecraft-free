import React, { useEffect, useRef } from 'react';
import { useSphere } from '@react-three/cannon';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useKeyboard } from '../hooks/useKeyboard';
import { KeyboardAction } from '../constants';

const PLAYER_SPEED = 5;
const PLAYER_JUMP_FORCE = 4;

// FIX: Removed React.FC type as it is no longer recommended and can cause type issues.
export const Player = () => {
    const actions = useKeyboard();
    const { camera } = useThree();
    const [ref, api] = useSphere(() => ({
        mass: 1,
        type: 'Dynamic',
        position: [0, 1, 0],
    }));

    const velocity = useRef([0, 0, 0]);
    useEffect(() => {
        api.velocity.subscribe((v) => (velocity.current = v));
    }, [api.velocity]);

    const pos = useRef([0, 0, 0]);
    useEffect(() => {
        api.position.subscribe((p) => (pos.current = p));
    }, [api.position]);

    useFrame(() => {
        if (!ref.current) return;
        camera.position.copy(new THREE.Vector3(pos.current[0], pos.current[1], pos.current[2]));

        const direction = new THREE.Vector3();
        const frontVector = new THREE.Vector3(0, 0, (actions.current[KeyboardAction.moveBackward] ? 1 : 0) - (actions.current[KeyboardAction.moveForward] ? 1 : 0));
        const sideVector = new THREE.Vector3((actions.current[KeyboardAction.moveLeft] ? 1 : 0) - (actions.current[KeyboardAction.moveRight] ? 1 : 0), 0, 0);

        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(PLAYER_SPEED)
            .applyEuler(camera.rotation);

        api.velocity.set(direction.x, velocity.current[1], direction.z);

        if (actions.current[KeyboardAction.jump] && Math.abs(velocity.current[1]) < 0.05) {
            api.velocity.set(velocity.current[0], PLAYER_JUMP_FORCE, velocity.current[2]);
        }
    });

    // FIX: Removed unnecessary type cast on ref to fix potential JSX type errors.
    return <mesh ref={ref} />;
};
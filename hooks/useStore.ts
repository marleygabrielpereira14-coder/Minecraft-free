import { useState, useCallback, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { type CubeState, Texture } from '../constants';

export const useStore = () => {
  const [cubes, setCubes] = useState<CubeState[]>([]);
  const [texture, setTexture] = useState<Texture>(Texture.Grass);

  useEffect(() => {
    try {
      const storedCubes = localStorage.getItem('voxel-world');
      if (storedCubes) {
        setCubes(JSON.parse(storedCubes));
      } else {
        // Create a default flat world if nothing is stored
        const initialCubes: CubeState[] = [];
        for (let x = -10; x < 10; x++) {
          for (let z = -10; z < 10; z++) {
            initialCubes.push({
              key: nanoid(),
              pos: [x, -1, z],
              texture: Texture.Grass,
            });
          }
        }
        setCubes(initialCubes);
      }
    } catch (error) {
      console.error("Failed to load world from localStorage:", error);
    }
  }, []);


  const addCube = useCallback((x: number, y: number, z: number) => {
    setCubes((prevCubes) => [
      ...prevCubes,
      {
        key: nanoid(),
        pos: [x, y, z],
        texture: texture,
      },
    ]);
  }, [texture]);

  const removeCube = useCallback((x: number, y: number, z: number) => {
    setCubes((prevCubes) =>
      prevCubes.filter(
        (cube) => cube.pos[0] !== x || cube.pos[1] !== y || cube.pos[2] !== z
      )
    );
  }, []);

  const saveWorld = useCallback(() => {
    try {
      localStorage.setItem('voxel-world', JSON.stringify(cubes));
    } catch (error) {
        console.error("Failed to save world to localStorage:", error);
    }
  }, [cubes]);

  const resetWorld = useCallback(() => {
    setCubes([]);
    localStorage.removeItem('voxel-world');
  }, []);

  return { cubes, addCube, removeCube, texture, setTexture, saveWorld, resetWorld };
};

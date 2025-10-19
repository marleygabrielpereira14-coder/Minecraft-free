export enum Texture {
  Dirt = 'dirt',
  Grass = 'grass',
  Glass = 'glass',
  Wood = 'wood',
  Log = 'log',
}

export type TextureKey = keyof typeof Texture;

export interface CubeState {
  key: string;
  pos: [number, number, number];
  texture: Texture;
}

export const textureImages: Record<Texture, string> = {
  [Texture.Dirt]: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/minecraft/dirt.png',
  [Texture.Grass]: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/minecraft/grass.png',
  [Texture.Glass]: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/minecraft/glass.png',
  [Texture.Wood]: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/minecraft/oak_planks.png',
  [Texture.Log]: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/minecraft/oak_log.png',
};

// FIX: Replaced invalid enum declaration with a proper TypeScript enum.
export enum KeyboardAction {
    moveForward,
    moveBackward,
    moveLeft,
    moveRight,
    jump,
    sprint,
}


export const keyboardControlsMap: Record<string, KeyboardAction> = {
  KeyW: KeyboardAction.moveForward,
  KeyS: KeyboardAction.moveBackward,
  KeyA: KeyboardAction.moveLeft,
  KeyD: KeyboardAction.moveRight,
  Space: KeyboardAction.jump,
  ShiftLeft: KeyboardAction.sprint,
};
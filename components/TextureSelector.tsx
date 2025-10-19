
import React, { useEffect, useState } from 'react';
import { useStore } from '../hooks/useStore';
import { Texture, textureImages, type TextureKey } from '../constants';

export const TextureSelector: React.FC = () => {
    const { texture, setTexture } = useStore();
    const [visible, setVisible] = useState(true);

    const textureKeys = Object.keys(textureImages) as TextureKey[];

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const pressedKey = parseInt(e.key);
            if (pressedKey >= 1 && pressedKey <= textureKeys.length) {
                const newTexture = Texture[textureKeys[pressedKey - 1]];
                if (newTexture) {
                    setTexture(newTexture);
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [setTexture, textureKeys]);

    if (!visible) return null;

    return (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 p-2 bg-white/20 backdrop-blur-md rounded-lg">
            {textureKeys.map((key) => {
                const tex = Texture[key];
                const img = textureImages[tex];
                return (
                    <div
                        key={key}
                        className={`w-14 h-14 border-2 flex items-center justify-center cursor-pointer transition-all duration-200 ${
                            texture === tex ? 'border-blue-400 scale-110' : 'border-transparent hover:bg-white/20'
                        }`}
                        onClick={() => setTexture(tex)}
                    >
                        <img src={img} alt={key} className="w-12 h-12" />
                    </div>
                );
            })}
        </div>
    );
};

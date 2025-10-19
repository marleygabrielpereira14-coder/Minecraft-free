
import { useCallback, useEffect, useRef } from 'react';
import { KeyboardAction, keyboardControlsMap } from '../constants';

export const useKeyboard = () => {
  const actions = useRef<Record<KeyboardAction, boolean>>({
    [KeyboardAction.moveForward]: false,
    [KeyboardAction.moveBackward]: false,
    [KeyboardAction.moveLeft]: false,
    [KeyboardAction.moveRight]: false,
    [KeyboardAction.jump]: false,
    [KeyboardAction.sprint]: false,
  });

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const action = keyboardControlsMap[e.code];
    if (action !== undefined) {
      actions.current[action] = true;
    }
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const action = keyboardControlsMap[e.code];
    if (action !== undefined) {
      actions.current[action] = false;
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return actions;
};

import React, { useEffect, useRef } from 'react';
import { TouchableWithoutFeedback, Keyboard, View } from 'react-native';

export default function SessionTimeout({ children, navigation }) {
  const timeoutRef = useRef(null);

  const resetTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      // Acción cuando se vence el tiempo (cerrar sesión / ir a login)
      navigation.replace('login');
    }, 20000); // 20 segundos
  };

  const handleUserInteraction = () => {
    resetTimer();
  };

  useEffect(() => {
    resetTimer();

    const keyboardListener = Keyboard.addListener('keyboardDidShow', resetTimer);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      keyboardListener.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={handleUserInteraction} onTouchStart={handleUserInteraction}>
      <View style={{ flex: 1 }}>
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
}
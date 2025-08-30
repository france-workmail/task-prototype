import React, { useEffect, useRef } from "react";
import { Animated, Text, Pressable, View } from "react-native";
import styles from "./UndoToast.styles";

export default function UndoToast({ visible, text, onUndo }) {
  const ani = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(ani, {
      toValue: visible ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  return (
    <Animated.View
      style={[
        styles.wrap,
        {
          transform: [
            {
              translateY: ani.interpolate({ inputRange: [0, 1], outputRange: [80, 0] }),
            },
          ],
          opacity: ani,
        },
      ]}
    >
      <Text style={styles.text}>{text}</Text>
      <Pressable onPress={onUndo}>
        <Text style={[styles.text, styles.undo]}>Undo</Text>
      </Pressable>
    </Animated.View>
  );
}

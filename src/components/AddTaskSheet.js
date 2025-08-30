import React, { useEffect, useRef, useState } from "react";
import { Animated, View, TextInput, Pressable, Text, KeyboardAvoidingView, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "./AddTaskSheet.styles";

export default function AddTaskSheet({ visible, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");
  const [dueDate, setDueDate] = useState(null); // stores just the date
  const [dueTime, setDueTime] = useState(null); // stores just the time
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const ani = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(ani, { toValue: visible ? 1 : 0, duration: 240, useNativeDriver: true }).start(() => {
      if (!visible) {
        setTitle("");
        setContext("");
        setDueDate(null);
        setDueTime(null);
      }
    });
  }, [visible]);

  const translateY = ani.interpolate({ inputRange: [0, 1], outputRange: [320, 0] });
  const opacity = ani;

  // Combine date + time into ISO string
  const getDueISO = () => {
    if (!dueDate) return null;
    const baseDate = new Date(dueDate);
    if (dueTime) {
      baseDate.setHours(dueTime.getHours());
      baseDate.setMinutes(dueTime.getMinutes());
    }
    return baseDate.toISOString();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      pointerEvents={visible ? "auto" : "none"}
      style={styles.wrap}
    >
      <Animated.View style={[styles.sheet, { transform: [{ translateY }], opacity }]}>
        <Text style={styles.title}>New Task</Text>

        <TextInput
          placeholder="Title *"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TextInput
          placeholder="Context"
          value={context}
          onChangeText={setContext}
          style={styles.input}
        />

        {/* Date Selector */}
        <Pressable onPress={() => setShowDatePicker(true)} style={styles.input}>
          <Text style={{ color: dueDate ? "#111827" : "#9ca3af" }}>
            {dueDate ? dueDate.toDateString() : "Select due date"}
          </Text>
        </Pressable>
        {showDatePicker && (
          <DateTimePicker
            value={dueDate || new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setDueDate(selectedDate);
            }}
          />
        )}

        {/* Time Selector */}
        <Pressable onPress={() => setShowTimePicker(true)} style={styles.input}>
          <Text style={{ color: dueTime ? "#111827" : "#9ca3af" }}>
            {dueTime ? dueTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "Select due time"}
          </Text>
        </Pressable>
        {showTimePicker && (
          <DateTimePicker
            value={dueTime || new Date()}
            mode="time"
            display="default"
            onChange={(event, selectedTime) => {
              setShowTimePicker(false);
              if (selectedTime) setDueTime(selectedTime);
            }}
          />
        )}

        <View style={styles.row}>
          <Pressable onPress={onClose}>
            <Text style={styles.cancel}>Cancel</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              if (!title.trim()) return;
              onSave({
                title: title.trim(),
                context: context || undefined,
                dueDate: getDueISO() || undefined,
              });
              onClose();
            }}
            style={styles.saveBtn}
          >
            <Text style={styles.saveText}>Save</Text>
          </Pressable>
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

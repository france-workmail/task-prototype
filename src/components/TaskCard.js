import React, { useRef } from "react";
import { Animated, View, Text, Pressable } from "react-native";
import { format, isBefore, isToday, isTomorrow, isYesterday } from "date-fns";
import styles from "./TaskCard.styles";

// const formatDue = (iso) => {
//   if (!iso) return "";
//   const date = new Date(iso);

//   let prefix;
//   if (isToday(date)) prefix = "Today";
//   else if (isTomorrow(date)) prefix = "Tomorrow";
//   else if (isYesterday(date)) prefix = "Yesterday";
//   else prefix = format(date, "MMM d, yyyy");

//   const timePart = format(date, "h:mm a");
//   return `${prefix}, ${timePart}`;
// };

const formatDue = (iso) => {
  if (!iso) return "";
  const date = new Date(iso);

  let prefix;
  if (isToday(date)) prefix = "Today";
  else if (isTomorrow(date)) prefix = "Tomorrow";
  else if (isYesterday(date)) prefix = "Yesterday";
  else prefix = format(date, "MMM d, yyyy");

  // Only show time for past/today
  const showTime = isBefore(date, new Date()) || isToday(date);
  const timePart = showTime ? `, ${format(date, "h:mm a")}` : "";

  return `${prefix}${timePart}`;
};

const isOverdue = (iso) => (iso ? isBefore(new Date(iso), new Date()) : false);

export default function TaskCard({ task, onComplete }) {
  const progress = useRef(new Animated.Value(0)).current;
  const vanish = useRef(new Animated.Value(1)).current;

  const onPressComplete = () => {
    Animated.sequence([
      Animated.timing(progress, { toValue: 1, duration: 160, useNativeDriver: false }),
      Animated.timing(vanish, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start(() => onComplete(task));
  };

  const checkboxBg = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(34,197,94,0.08)", "#16a34a"],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: vanish,
          transform: [
            {
              translateY: vanish.interpolate({
                inputRange: [0, 1],
                outputRange: [12, 0],
              }),
            },
          ],
        },
      ]}
    >
      <View style={{ flex: 1 }}>
        <Text numberOfLines={2} style={styles.title}>
          {task.title}
        </Text>
        {task.context ? (
            <View style={styles.pill}>
              <Text style={styles.pillText}>{task.context}</Text>
            </View>
          ) : null}
        <View style={styles.metaRow}>

          {task.dueDate ? (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Text style={styles.dueText}>{formatDue(task.dueDate)}</Text>
              {isOverdue(task.dueDate) && (
                <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                  <View style={styles.redDot} />
                  <Text style={styles.overdueText}>Overdue</Text>
                </View>
              )}
            </View>
          ) : null}
        </View>
      </View>

      <Pressable onPress={onPressComplete}>
        <Animated.View style={[styles.checkbox, { backgroundColor: checkboxBg }]}>
          <Animated.View style={[styles.tick, { transform: [{ scale: progress }] }]} />
        </Animated.View>
      </Pressable>
      // TODO: Fix complete checkbox animation
    </Animated.View>
  );
}

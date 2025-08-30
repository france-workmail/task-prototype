import React from "react";
import { View, Text, Pressable } from "react-native";
import styles from "./HeaderTabs.styles";

export const tabs = ["Tasks", "Reminders", "Meetings", "Notes"];

export default function HeaderTabs({ active, onChange }) {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Good morning, Louis!</Text>
      <View style={styles.tabsRow}>
        {tabs.map((t) => (
          <Pressable key={t} onPress={() => onChange(t)}>
            <View style={[styles.tab, active === t && styles.tabActive]}>
              <Text style={[styles.tabText, active === t && styles.tabTextActive]}>
                {t}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

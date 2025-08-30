import React from "react";
import { FlatList, View, Text } from "react-native";
import TaskCard from "./TaskCard";
import styles from "./TaskList.styles";

export default function TaskList({ tasks, onComplete }) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingBottom: 120 }}
      ListEmptyComponent={
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyText}>No tasks yet. Tap + to add one.</Text>
        </View>
      }
      renderItem={({ item }) => <TaskCard task={item} onComplete={onComplete} />}
    />
  );
}

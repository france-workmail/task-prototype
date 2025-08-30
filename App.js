import React, { useRef, useState } from "react";
import { SafeAreaView, View, Pressable, Text } from "react-native";
import HeaderTabs, { tabs } from "./src/components/HeaderTabs";
import TaskList from "./src/components/TaskList";
import AddTaskSheet from "./src/components/AddTaskSheet";
import UndoToast from "./src/components/UndoToast";
import { useTasks } from "./src/hooks/useTasks";
import styles from "./App.styles";

export default function App() {
  const [active, setActive] = useState("Tasks");
  const [adding, setAdding] = useState(false);
  const { tasks, addTask, removeTask, insertTaskAt } = useTasks();

  // undo state
  const undoRef = useRef(null);
  const [undoVisible, setUndoVisible] = useState(false);

  const onComplete = (task) => {
    const idx = tasks.findIndex((t) => t.id === task.id);
    removeTask(task.id);

    if (undoRef.current?.timer) clearTimeout(undoRef.current.timer);
    const timer = setTimeout(() => {
      undoRef.current = null;
      setUndoVisible(false);
    }, 7000);

    undoRef.current = { task, index: idx, timer };
    setUndoVisible(true);
  };

  const onUndo = () => {
    const u = undoRef.current;
    if (!u) return;
    if (u.timer) clearTimeout(u.timer);
    insertTaskAt(u.task, u.index);
    undoRef.current = null;
    setUndoVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f7f9" }}>
      <HeaderTabs active={active} onChange={setActive} />
      <View style={{ flex: 1, padding: 20 }}>
        {active === "Tasks" ? (
          <TaskList tasks={tasks} onComplete={onComplete} />
        ) : (
          <View style={{ paddingTop: 24 }}>
            <Text style={{ color: "#6b7280" }}>{active} are static for this test.</Text>
          </View>
        )}
      </View>

      {active === "Tasks" && (
        <Pressable onPress={() => setAdding(true)} style={styles.fabWrap}>
          <View style={styles.fab}>
            <Text style={styles.fabText}>+</Text>
          </View>
        </Pressable>
      )}

      <AddTaskSheet visible={adding} onClose={() => setAdding(false)} onSave={addTask} />
      <UndoToast visible={undoVisible} text="Task completed" onUndo={onUndo} />
    </SafeAreaView>
  );
}

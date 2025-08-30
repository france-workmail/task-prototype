import { useCallback, useEffect, useState } from "react";
import { loadStorage, saveStorage } from "../utils/storage";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await loadStorage();
      if (data) setTasks(data);
      setInitialized(true);
    })();
  }, []);

  useEffect(() => {
    if (!initialized) return;
    saveStorage(tasks);
  }, [tasks, initialized]);

  const addTask = useCallback((task) => {
    const newTask = {
      id: Math.random().toString(36).slice(2),
      createdAt: Date.now(),
      ...task,
    };
    setTasks((s) => {
      const updatedTasks = [newTask, ...s];
      // Sort tasks by dueDate ascending (past -> future)
      return updatedTasks.sort((a, b) => {
        if (!a.dueDate) return 1;  // tasks without dueDate go to the end
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
    });
  }, []);

  const removeTask = useCallback((id) => {
    setTasks((s) => s.filter((t) => t.id !== id));
  }, []);

  const insertTaskAt = useCallback((task, index = 0) => {
    setTasks((prev) => {
      const copy = [...prev];
      copy.splice(Math.min(index, copy.length), 0, task);
      return copy;
    });
  }, []);

  return { tasks, addTask, removeTask, insertTaskAt };
}

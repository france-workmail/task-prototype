import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { padding: 20, paddingBottom: 8, backgroundColor: "#fff" },
  greeting: { fontSize: 22, fontWeight: "700", color: "#0f172a" },
  tabsRow: { flexDirection: "row", gap: 10, marginTop: 12 },
  tab: {
    backgroundColor: "#fff",
    borderColor: "#e5e7eb",
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  tabActive: {
    backgroundColor: "#0ea5e9",
    borderColor: "#0ea5e9",
  },
  tabText: { color: "#0f172a", fontWeight: "600" },
  tabTextActive: { color: "#fff" },
});

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    borderRadius: 14,
    padding: 14,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e6e7eb",
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  title: { fontSize: 16, fontWeight: "600", color: "#111827" },
  metaRow: { flexDirection: "row", alignItems: "center", marginTop: 0, gap: 10 },
  pill: {  paddingHorizontal: 0, paddingTop: 10, alignSelf: "flex-start" },
  pillText: { color: "#111827", fontWeight: "light", fontSize: 14 },
  redDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#ef4444" },
  overdueText: { color: "#ef4444", fontWeight: "light" },
  dueText: { color: "#111827", fontWeight: "light", fontSize: 14 },
  checkbox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    marginLeft: 12,
    borderWidth: 2,
    borderColor: "#22c55e",
    alignItems: "center",
    justifyContent: "center",
  },
  tick: {
    width: 12,
    height: 6,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: "#fff",
    transform: [{ rotate: "-45deg" }],
  },
});

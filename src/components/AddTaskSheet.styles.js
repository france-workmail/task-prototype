import { StyleSheet } from "react-native";

export default StyleSheet.create({
  wrap: { position: "absolute", left: 0, right: 0, bottom: 0 },
  sheet: {
    margin: 16,
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
  },
  row: { flexDirection: "row", justifyContent: "flex-end", gap: 12 },
  cancel: { padding: 8, color: "#374151" },
  saveBtn: {
    backgroundColor: "#0ea5e9",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  saveText: { color: "#fff", fontWeight: "700" },
});

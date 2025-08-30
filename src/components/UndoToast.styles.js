import { StyleSheet } from "react-native";

export default StyleSheet.create({
  wrap: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 96,
    padding: 12,
    backgroundColor: "#111827",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: { color: "#fff", fontWeight: "600" },
  undo: { textDecorationLine: "underline" },
});

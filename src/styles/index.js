import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  card: {
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#ccc",
  },
  band: { fontSize: 18, fontWeight: "600", color: "#000" },
  item: { fontSize: 14, color: "#333" },
  badge: {
    position: "absolute",
    right: -6,
    top: -6,
    backgroundColor: "tomato",
    borderRadius: 8,
    paddingHorizontal: 4,
    minWidth: 16,
    alignItems: "center",
  },
  badgeTxt: { color: "#fff", fontSize: 10, fontWeight: "600" },
});
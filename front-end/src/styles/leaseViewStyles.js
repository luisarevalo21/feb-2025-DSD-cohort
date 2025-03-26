import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Times-Roman",
    lineHeight: 1.5,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  section: {
    marginBottom: 10,
  },
  bold: {
    fontWeight: "bold",
  },
  borderTop: {
    borderTopWidth: 2,
    borderTopColor: "#000",
    marginTop: 5,
    marginBottom: 5,
  },
});

export default styles;

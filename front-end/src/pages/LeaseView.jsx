import React from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { PDFViewer } from "@react-pdf/renderer";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";

function LeaseView() {
  // Get the leaseData data from the location state
  const location = useLocation();
  const leaseData = location.state?.lease; // Make sure to handle the case when leaseData data is undefined

  console.log(leaseData);

  // Define styles for the document
  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#f2f2f2",
      padding: 20,
    },
    section: {
      marginBottom: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 20,
    },
    content: {
      fontSize: 12,
      marginBottom: 10,
    },
    boldContent: {
      fontSize: 12,
      fontWeight: "bold", // Bold styling for headings
    },
    viewerContainer: {
      height: "600px", // Adjust this to fit your layout
      width: "80%", // Adjust the width accordingly
      margin: "20px auto",
      border: "1px solid #ddd", // Optional border for styling
      borderRadius: "8px", // Optional rounded corners for styling
      overflow: "hidden", // Avoid overflow
    },
    layoutContainer: {
      margin: "20px",
      padding: "20px",
      backgroundColor: "#fff",
      borderRadius: "8px",
    },
    header: {
      textAlign: "center",
      marginBottom: "20px",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: "20px",
    },
  });

  // Check if the leaseData data exists, and render fallback if not
  if (!leaseData) {
    return <div>No lease data available</div>;
  }

  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Lease Agreement</Text>
        <View style={styles.section}>
          <Text style={styles.boldContent}>Parties Involved:</Text>
          <Text style={styles.content}>
            John Doe (Landlord) and {leaseData.title} (Tenant)
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.boldContent}>Lease Start Date:</Text>
          <Text style={styles.content}>{leaseData.tenant.name}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.boldContent}>Lease End Date:</Text>
          <Text style={styles.content}>
            {leaseData.leaseDataEnd || "December 31, 2025"}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.boldContent}>Rent Amount:</Text>
          <Text style={styles.content}>
            ${leaseData.rentAmount || "1500"} per month
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.boldContent}>Security Deposit:</Text>
          <Text style={styles.content}>
            ${leaseData.securityDeposit || "3000"}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.boldContent}>Terms and Conditions:</Text>
          <Text style={styles.content}>
            The tenant agrees to maintain the property in good condition...
          </Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <div style={styles.layoutContainer}>
      <h1 style={styles.header}>Lease Agreement Preview</h1>

      <div style={styles.viewerContainer}>
        {/* Embedding the PDF viewer in the page */}
        <PDFViewer style={{ width: "100%", height: "100%" }}>
          <MyDocument />
        </PDFViewer>
      </div>
      <SignatureCanvas
        penColor="green"
        canvasProps={{ width: 500, height: 200, className: "sigCanvas" }}
      />

      <div style={styles.buttonContainer}>
        {/* Email Lease Button */}
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          className="email-leaseData"
        >
          Email Lease
        </Button>
      </div>
    </div>
  );
}

export default LeaseView;

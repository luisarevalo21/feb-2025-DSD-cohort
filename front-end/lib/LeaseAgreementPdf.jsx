import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Styles for the PDF document
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Times-Roman",
    lineHeight: 1.5,
  },
  section: { marginBottom: 10 },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
  },
  bold: { fontWeight: "bold" },
});

// Lease Agreement Component
const LeaseAgreementPdf = ({
  tenantName,
  landlordName,
  propertyAddress,
  rentAmount,
  leaseStartDate,
  leaseEndDate,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>RESIDENTIAL LEASE AGREEMENT</Text>

      <View style={styles.section}>
        <Text>
          This Lease Agreement is made and entered into this{" "}
          <Text style={styles.bold}>{new Date().toLocaleDateString()}</Text>, by
          and between:
        </Text>
        <Text>
          <Text style={styles.bold}>Landlord:</Text> {landlordName}
        </Text>
        <Text>
          <Text style={styles.bold}>Tenant:</Text> {tenantName}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.bold}>1. PROPERTY ADDRESS:</Text>
        <Text>{propertyAddress}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.bold}>2. TERM OF LEASE:</Text>
        <Text>
          This Lease shall commence on {leaseStartDate} and shall continue until{" "}
          {leaseEndDate}, unless otherwise terminated as provided herein.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.bold}>3. RENT:</Text>
        <Text>
          Tenant shall pay to Landlord a monthly rent of ${rentAmount}, payable
          on the first day of each month.
        </Text>
        <Text>
          Failure to pay rent by the due date shall result in a late fee of $50.
          Any rent not received within 5 days of the due date shall be
          considered delinquent.
        </Text>
      </View>
    </Page>

    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.bold}>4. SECURITY DEPOSIT:</Text>
        <Text>
          Tenant shall pay a security deposit of ${rentAmount * 1.5} prior to
          occupancy. The deposit shall be held to cover damages beyond normal
          wear and tear.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.bold}>5. UTILITIES AND SERVICES:</Text>
        <Text>
          Tenant shall be responsible for all utilities, including electricity,
          water, gas, internet, and trash removal. Landlord shall cover property
          taxes and maintenance.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.bold}>6. USE OF PROPERTY:</Text>
        <Text>
          The premises shall be used exclusively as a residential dwelling.
          Tenant shall not engage in illegal activities, nor shall they sublease
          the property without prior written consent.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.bold}>7. MAINTENANCE AND REPAIRS:</Text>
        <Text>
          Tenant shall maintain the property in a clean and habitable condition.
          Tenant shall notify Landlord of any necessary repairs. The Landlord
          shall be responsible for major repairs not caused by the Tenant’s
          negligence.
        </Text>
      </View>
    </Page>

    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.bold}>8. PET POLICY:</Text>
        <Text>
          Tenant shall not keep any pets on the premises without the prior
          written consent of the Landlord. If permitted, an additional pet
          deposit of $300 shall be required.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.bold}>9. TERMINATION AND RENEWAL:</Text>
        <Text>
          This lease may be terminated at the end of the lease term by either
          party with a 30-day written notice. If neither party provides notice,
          the lease shall convert to a month-to-month tenancy.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.bold}>10. INSURANCE REQUIREMENTS:</Text>
        <Text>
          Tenant is encouraged to obtain renter’s insurance to cover personal
          property losses due to theft, fire, or natural disasters.
        </Text>
      </View>
    </Page>

    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.bold}>11. DISPUTE RESOLUTION:</Text>
        <Text>
          Any disputes arising from this Lease shall first be resolved through
          mediation. If mediation fails, the dispute shall be resolved in a
          court of competent jurisdiction.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.bold}>12. ADDITIONAL TERMS:</Text>
        <Text>
          Any additional agreements or conditions shall be included here:
        </Text>
        <Text>______________________________________________________</Text>
        <Text>______________________________________________________</Text>
      </View>

      {/* <View style={styles.section}>
        <Text style={styles.bold}>13. SIGNATURES:</Text>
        <Text>
          By signing below, both parties acknowledge and agree to the terms of
          this Lease Agreement.
        </Text>
        <Text>Landlord: ________________________ Date: ______________</Text>
        <Text>Tenant: ________________________ Date: ______________</Text>
      </View> */}
    </Page>
  </Document>
);

export default LeaseAgreementPdf;

import { Page, Text, View, Document } from "@react-pdf/renderer";
import styles from "../src/styles/leaseViewStyles.js";
const LeaseAgreementPdf = ({ apartmentInformation, propertyAddress, leaseStatus, monthlyRent, leaseStartDate, leaseEndDate, tenantInformation }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>RESIDENTIAL LEASE AGREEMENT</Text>

      <View style={styles.section}>
        <Text>
          This Lease Agreement is made and entered into this <Text style={styles.bold}>{new Date().toLocaleDateString()}</Text>, by and between:
        </Text>
        <Text>
          <Text style={styles.bold}>Tenant:</Text> {tenantInformation.tenantName}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.bold}>1. PROPERTY ADDRESS:</Text>
        <Text>{apartmentInformation.apartmentAddress}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.bold}>2. TERM OF LEASE:</Text>
        <Text>
          This Lease shall commence on {leaseStartDate} and shall continue until {leaseEndDate}, unless otherwise terminated as provided herein.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.bold}>3. RENT:</Text>
        <Text>Tenant shall pay to Landlord a monthly rent of ${monthlyRent}, payable on the first day of each month.</Text>
        <Text>
          Failure to pay rent by the due date shall result in a late fee of $50. Any rent not received within 5 days of the due date shall be
          considered delinquent.
        </Text>
      </View>
    </Page>

    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.bold}>4. SECURITY DEPOSIT:</Text>
        <Text>
          Tenant shall pay a security deposit of ${monthlyRent * 1.5} prior to occupancy. The deposit shall be held to cover damages beyond normal
          wear and tear.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.bold}>5. UTILITIES AND SERVICES:</Text>
        <Text>
          Tenant shall be responsible for all utilities, including electricity, water, gas, internet, and trash removal. Landlord shall cover property
          taxes and maintenance.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.bold}>6. USE OF PROPERTY:</Text>
        <Text>
          The premises shall be used exclusively as a residential dwelling. Tenant shall not engage in illegal activities, nor shall they sublease the
          property without prior written consent.
        </Text>
      </View>
    </Page>

    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.bold}>7. MAINTENANCE AND REPAIRS:</Text>
        <Text>
          Tenant shall maintain the property in a clean and habitable condition. Tenant shall notify Landlord of any necessary repairs. The Landlord
          shall be responsible for major repairs not caused by the Tenant’s negligence.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.bold}>8. PET POLICY:</Text>
        <Text>
          Tenant shall not keep any pets on the premises without the prior written consent of the Landlord. If permitted, an additional pet deposit of
          $300 shall be required.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.bold}>9. TERMINATION AND RENEWAL:</Text>
        <Text>
          This lease may be terminated at the end of the lease term by either party with a 30-day written notice. If neither party provides notice,
          the lease shall convert to a month-to-month tenancy.
        </Text>
      </View>
    </Page>

    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.bold}>10. INSURANCE REQUIREMENTS:</Text>
        <Text>Tenant is encouraged to obtain renter’s insurance to cover personal property losses due to theft, fire, or natural disasters.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.bold}>11. DISPUTE RESOLUTION:</Text>
        <Text>
          Any disputes arising from this Lease shall first be resolved through mediation. If mediation fails, the dispute shall be resolved in a court
          of competent jurisdiction.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.bold}>12. ADDITIONAL TERMS:</Text>
        <Text>Any additional agreements or conditions shall be included here:</Text>
        <Text style={styles.borderTop}>______________________________________________________</Text>
        <Text style={styles.borderTop}>______________________________________________________</Text>
      </View>
    </Page>
  </Document>
);

export default LeaseAgreementPdf;

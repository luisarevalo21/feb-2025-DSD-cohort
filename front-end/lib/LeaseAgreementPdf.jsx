import { Page, Text, View, Document } from "@react-pdf/renderer";

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
    <Page
      size="A4"
      style={{
        padding: "30px",
        fontSize: "12px",
        fontFamily: "Times-Roman",
        lineHeight: "1.5",
      }}
    >
      <Text className="text-center text-2xl font-bold mb-4">
        RESIDENTIAL LEASE AGREEMENT
      </Text>

      <View className="mb-4">
        <Text>
          This Lease Agreement is made and entered into this{" "}
          <Text className="font-bold">{new Date().toLocaleDateString()}</Text>,
          by and between:
        </Text>
        <Text>
          <Text className="font-bold">Landlord:</Text> {landlordName}
        </Text>
        <Text>
          <Text className="font-bold">Tenant:</Text> {tenantName}
        </Text>
      </View>

      <View className="mb-4">
        <Text className="font-bold">1. PROPERTY ADDRESS:</Text>
        <Text>{propertyAddress}</Text>
      </View>

      <View className="mb-4">
        <Text className="font-bold">2. TERM OF LEASE:</Text>
        <Text>
          This Lease shall commence on {leaseStartDate} and shall continue until{" "}
          {leaseEndDate}, unless otherwise terminated as provided herein.
        </Text>
      </View>

      <View className="mb-4">
        <Text className="font-bold">3. RENT:</Text>
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

    <Page
      size="A4"
      style={{
        padding: "30px",
        fontSize: "12px",
        fontFamily: "Times-Roman",
        lineHeight: "1.5",
      }}
    >
      <View className="mb-4">
        <Text className="font-bold">4. SECURITY DEPOSIT:</Text>
        <Text>
          Tenant shall pay a security deposit of ${rentAmount * 1.5} prior to
          occupancy. The deposit shall be held to cover damages beyond normal
          wear and tear.
        </Text>
      </View>

      <View className="mb-4">
        <Text className="font-bold">5. UTILITIES AND SERVICES:</Text>
        <Text>
          Tenant shall be responsible for all utilities, including electricity,
          water, gas, internet, and trash removal. Landlord shall cover property
          taxes and maintenance.
        </Text>
      </View>

      <View className="mb-4">
        <Text className="font-bold">6. USE OF PROPERTY:</Text>
        <Text>
          The premises shall be used exclusively as a residential dwelling.
          Tenant shall not engage in illegal activities, nor shall they sublease
          the property without prior written consent.
        </Text>
      </View>

      <View className="mb-4">
        <Text className="font-bold">7. MAINTENANCE AND REPAIRS:</Text>
        <Text>
          Tenant shall maintain the property in a clean and habitable condition.
          Tenant shall notify Landlord of any necessary repairs. The Landlord
          shall be responsible for major repairs not caused by the Tenant’s
          negligence.
        </Text>
      </View>
    </Page>

    <Page
      size="A4"
      style={{
        padding: "30px",
        fontSize: "12px",
        fontFamily: "Times-Roman",
        lineHeight: "1.5",
      }}
    >
      <View className="mb-4">
        <Text className="font-bold">8. PET POLICY:</Text>
        <Text>
          Tenant shall not keep any pets on the premises without the prior
          written consent of the Landlord. If permitted, an additional pet
          deposit of $300 shall be required.
        </Text>
      </View>

      <View className="mb-4">
        <Text className="font-bold">9. TERMINATION AND RENEWAL:</Text>
        <Text>
          This lease may be terminated at the end of the lease term by either
          party with a 30-day written notice. If neither party provides notice,
          the lease shall convert to a month-to-month tenancy.
        </Text>
      </View>

      <View className="mb-4">
        <Text className="font-bold">10. INSURANCE REQUIREMENTS:</Text>
        <Text>
          Tenant is encouraged to obtain renter’s insurance to cover personal
          property losses due to theft, fire, or natural disasters.
        </Text>
      </View>
    </Page>

    <Page
      size="A4"
      style={{
        padding: "30px",
        fontSize: "12px",
        fontFamily: "Times-Roman",
        lineHeight: "1.5",
      }}
    >
      <View className="mb-4">
        <Text className="font-bold">11. DISPUTE RESOLUTION:</Text>
        <Text>
          Any disputes arising from this Lease shall first be resolved through
          mediation. If mediation fails, the dispute shall be resolved in a
          court of competent jurisdiction.
        </Text>
      </View>

      <View className="mb-4">
        <Text className="font-bold">12. ADDITIONAL TERMS:</Text>
        <Text>
          Any additional agreements or conditions shall be included here:
        </Text>
        <Text className="border-t-2 mt-2 mb-2">
          ______________________________________________________
        </Text>
        <Text className="border-t-2">
          ______________________________________________________
        </Text>
      </View>
    </Page>
  </Document>
);

export default LeaseAgreementPdf;

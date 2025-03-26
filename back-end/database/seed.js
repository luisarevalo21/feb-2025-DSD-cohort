require("dotenv").config();
const bcrypt = require("bcryptjs");
const AppDataSource = require("./data-source");
const Admin = require("./entities/admin");
const Apartment = require("./entities/apartment");
const Lease = require("./entities/lease");
const Tenant = require("./entities/tenant");
const Complaint = require("./entities/complaint");
let apartments;
let tenants;
let leases;

AppDataSource.initialize()
  .then(async () => {
    console.log("Dropping database...");
    await AppDataSource.dropDatabase(); // Drops the entire database
    await AppDataSource.synchronize(); // Recreates the database schema based on your entities

    console.log("Seeding database...");

    // --------- Seed Admin Table --------- //
    const adminRepo = AppDataSource.getRepository(Admin);
    const existingAdmins = await adminRepo.count();

    if (existingAdmins === 0) {
      await adminRepo.insert([
        {
          first_name: "John",
          last_name: "Doe",
          email: "john.doe@email.com",
          password: bcrypt.hashSync("password123"),
        },
      ]);
      console.log("✅ Admin table seeded.");
    } else {
      console.log("⚠️ Admin table already has data.");
    }

    // --------- Seed Apartment Table --------- //
    const apartmentRepo = AppDataSource.getRepository(Apartment);
    const existingApartments = await apartmentRepo.count();

    if (existingApartments === 0) {
      const apartmentsData = [
        // 7 apartments: 1 bed, 1 bath
        {
          apartment_number: 101,
          square_footage: 600,
          bedrooms: 1,
          bathrooms: 1,
          floor: 1,
          features: ["compact", "efficient layout"],
          notes: "Cozy studio apartment",
        },
        {
          apartment_number: 102,
          square_footage: 650,
          bedrooms: 1,
          bathrooms: 1,
          floor: 1,
          features: ["modern kitchen"],
          notes: "Recently renovated",
        },
        {
          apartment_number: 103,
          square_footage: 700,
          bedrooms: 1,
          bathrooms: 1,
          floor: 2,
          features: ["city view"],
          notes: "Bright and airy",
        },
        {
          apartment_number: 104,
          square_footage: 680,
          bedrooms: 1,
          bathrooms: 1,
          floor: 2,
          features: ["open floor plan"],
          notes: "Great natural light",
        },
        {
          apartment_number: 105,
          square_footage: 720,
          bedrooms: 1,
          bathrooms: 1,
          floor: 3,
          features: ["close to public transport"],
          notes: "Convenient location",
        },
        {
          apartment_number: 106,
          square_footage: 690,
          bedrooms: 1,
          bathrooms: 1,
          floor: 3,
          features: ["new appliances"],
          notes: "Modern design",
        },
        {
          apartment_number: 107,
          square_footage: 710,
          bedrooms: 1,
          bathrooms: 1,
          floor: 4,
          features: ["balcony"],
          notes: "Great view",
        },
        // 7 apartments: 2 bed, 2 bath
        {
          apartment_number: 201,
          square_footage: 900,
          bedrooms: 2,
          bathrooms: 2,
          floor: 1,
          features: ["spacious living area", "updated kitchen"],
          notes: "Family friendly",
        },
        {
          apartment_number: 202,
          square_footage: 950,
          bedrooms: 2,
          bathrooms: 2,
          floor: 1,
          features: ["hardwood floors"],
          notes: "Well maintained",
        },
        {
          apartment_number: 203,
          square_footage: 980,
          bedrooms: 2,
          bathrooms: 2,
          floor: 2,
          features: ["city view", "balcony"],
          notes: "Bright interior",
        },
        {
          apartment_number: 204,
          square_footage: 1000,
          bedrooms: 2,
          bathrooms: 2,
          floor: 2,
          features: ["modern appliances"],
          notes: "Recently upgraded",
        },
        {
          apartment_number: 205,
          square_footage: 920,
          bedrooms: 2,
          bathrooms: 2,
          floor: 3,
          features: ["spacious bedrooms"],
          notes: "Quiet neighborhood",
        },
        {
          apartment_number: 206,
          square_footage: 960,
          bedrooms: 2,
          bathrooms: 2,
          floor: 3,
          features: ["sunny", "open layout"],
          notes: "Great natural light",
        },
        {
          apartment_number: 207,
          square_footage: 990,
          bedrooms: 2,
          bathrooms: 2,
          floor: 4,
          features: ["modern design"],
          notes: "Updated interiors",
        },
        // 6 apartments: 3 bed, 2 bath
        {
          apartment_number: 301,
          square_footage: 1200,
          bedrooms: 3,
          bathrooms: 2,
          floor: 1,
          features: ["spacious kitchen", "dining area"],
          notes: "Ideal for families",
        },
        {
          apartment_number: 302,
          square_footage: 1250,
          bedrooms: 3,
          bathrooms: 2,
          floor: 2,
          features: ["balcony", "city view"],
          notes: "Modern and spacious",
        },
        {
          apartment_number: 303,
          square_footage: 1300,
          bedrooms: 3,
          bathrooms: 2,
          floor: 2,
          features: ["renovated bathrooms"],
          notes: "Updated interiors",
        },
        {
          apartment_number: 304,
          square_footage: 1280,
          bedrooms: 3,
          bathrooms: 2,
          floor: 3,
          features: ["large living room"],
          notes: "Spacious and airy",
        },
        {
          apartment_number: 305,
          square_footage: 1350,
          bedrooms: 3,
          bathrooms: 2,
          floor: 3,
          features: ["modern finishes"],
          notes: "Luxury feel",
        },
        {
          apartment_number: 306,
          square_footage: 1320,
          bedrooms: 3,
          bathrooms: 2,
          floor: 4,
          features: ["great view", "balcony"],
          notes: "Premium location",
        },
      ];

      await apartmentRepo.insert(apartmentsData);
      // Fetch all apartments to get their generated IDs
      apartments = await apartmentRepo.find();

      console.log("✅ Apartment table seeded.");
    } else {
      console.log("⚠️ Apartment table already has data.");
    }

    // --------- Seed Tenant Table --------- //
    const tenantRepo = AppDataSource.getRepository(Tenant);
    const existingTenants = await tenantRepo.count();

    if (existingTenants === 0) {
      const tenantsData = [
        {
          first_name: "John",
          last_name: "Doe",
          email: "john.doe@email.com",
          date_of_birth: "1990-01-15",
          phone_number: "555-555-1111",
          additional_information: "No pets",
        },
        {
          first_name: "Emma",
          last_name: "Smith",
          email: "emma.smith@email.com",
          date_of_birth: "1985-05-20",
          phone_number: "555-555-2222",
          additional_information: "Lactose intolerant",
        },
        {
          first_name: "Liam",
          last_name: "Johnson",
          email: "liam.johnson@email.com",
          date_of_birth: "1992-07-10",
          phone_number: "555-555-3333",
          additional_information: "Prefers ground floor units",
        },
        {
          first_name: "Olivia",
          last_name: "Brown",
          email: "olivia.brown@email.com",
          date_of_birth: "1995-12-25",
          phone_number: "555-555-4444",
          additional_information: "Vegan",
        },
        {
          first_name: "James",
          last_name: "Williams",
          email: "james.williams@email.com",
          date_of_birth: "1990-02-15",
          phone_number: "555-555-5555",
          additional_information: "No pets",
        },
        {
          first_name: "Sophia",
          last_name: "Jones",
          email: "sophia.jones@email.com",
          date_of_birth: "1991-03-10",
          phone_number: "555-555-6666",
          additional_information: "Has a small dog",
        },
        {
          first_name: "William",
          last_name: "Miller",
          email: "william.miller@email.com",
          date_of_birth: "1988-04-20",
          phone_number: "555-555-7777",
          additional_information: "Loves gardening",
        },
        {
          first_name: "Ava",
          last_name: "Davis",
          email: "ava.davis@email.com",
          date_of_birth: "1993-05-25",
          phone_number: "555-555-8888",
          additional_information: "Allergic to cats",
        },
        {
          first_name: "Michael",
          last_name: "Wilson",
          email: "michael.wilson@email.com",
          date_of_birth: "1987-06-30",
          phone_number: "555-555-9999",
          additional_information: "Smoker",
        },
        {
          first_name: "Isabella",
          last_name: "Moore",
          email: "isabella.moore@email.com",
          date_of_birth: "1994-07-15",
          phone_number: "555-555-0000",
          additional_information: "Prefers quiet environment",
        },
      ];

      await tenantRepo.insert(tenantsData);
      tenants = await tenantRepo.find();
      console.log("✅ Tenant table seeded.");
    } else {
      console.log("⚠️ Tenant table already has data.");
    }

    // --------- Seed Lease Table --------- //
    const leaseRepo = AppDataSource.getRepository(Lease);
    const existingLeases = await leaseRepo.count();

    if (existingLeases === 0) {
      const leasesData = [
        // 7 Active leases (with signed_at and signature)
        {
          tenant_id: tenants[0].id,
          lease_start_date: "2024-03-01",
          lease_end_date: "2025-04-05",
          monthly_rent_in_dollars: 1500,
          notes: "Active lease with minor repairs requested",
          apartment_id: apartments[0].id,
          signed_at: "2024-04-15",
          signature: "signed",
        },
        {
          tenant_id: tenants[1].id,
          lease_start_date: "2024-04-01",
          lease_end_date: "2025-04-01",
          monthly_rent_in_dollars: 1600,
          notes: "Active lease, on time payments",
          apartment_id: apartments[1].id,
          signed_at: "2024-04-16",
          signature: "signed",
        },
        {
          tenant_id: tenants[2].id,
          lease_start_date: "2024-05-01",
          lease_end_date: "2025-05-01",
          monthly_rent_in_dollars: 1700,
          notes: "Active lease with friendly tenant",
          apartment_id: apartments[2].id,
          signed_at: "2024-04-17",
          signature: "signed",
        },
        {
          tenant_id: tenants[3].id,
          lease_start_date: "2024-06-01",
          lease_end_date: "2025-06-01",
          monthly_rent_in_dollars: 1800,
          notes: "Active lease, new tenant",
          apartment_id: apartments[3].id,
          signed_at: "2024-04-18",
          signature: "signed",
        },
        {
          tenant_id: tenants[4].id,
          lease_start_date: "2024-07-01",
          lease_end_date: "2025-07-01",
          monthly_rent_in_dollars: 1900,
          notes: "Active lease, prompt payments",
          apartment_id: apartments[4].id,
          signed_at: "2024-04-19",
          signature: "signed",
        },
        {
          tenant_id: tenants[5].id,
          lease_start_date: "2024-08-01",
          lease_end_date: "2025-08-01",
          monthly_rent_in_dollars: 2000,
          notes: "Active lease, tenant in good standing",
          apartment_id: apartments[5].id,
          signed_at: "2024-04-20",
          signature: "signed",
        },
        {
          tenant_id: tenants[6].id,
          lease_start_date: "2024-09-01",
          lease_end_date: "2025-09-01",
          monthly_rent_in_dollars: 2100,
          notes: "Active lease, long term",
          apartment_id: apartments[6].id,
          signed_at: "2024-04-21",
          signature: "signed",
        },
        // 3 Pending leases (without signed_at or signature)
        {
          tenant_id: tenants[7].id,
          lease_start_date: "2024-10-01",
          lease_end_date: "2025-10-01",
          monthly_rent_in_dollars: 2200,
          notes: "Pending lease, awaiting signature",
          apartment_id: apartments[7].id,
        },
        {
          tenant_id: tenants[8].id,
          lease_start_date: "2024-11-01",
          lease_end_date: "2025-11-01",
          monthly_rent_in_dollars: 2300,
          notes: "Pending lease, awaiting signature",
          apartment_id: apartments[8].id,
        },
        {
          tenant_id: tenants[9].id,
          lease_start_date: "2024-12-01",
          lease_end_date: "2025-12-01",
          monthly_rent_in_dollars: 2400,
          notes: "Pending lease, awaiting signature",
          apartment_id: apartments[9].id,
        },
      ];

      await leaseRepo.insert(leasesData);
      leases = await leaseRepo.find();
      console.log("✅ Lease table seeded.");
    } else {
      console.log("⚠️ Lease table already has data.");
    }

    // Update tenants with their lease_id
    for (let i = 0; i < leases.length; i++) {
      await tenantRepo.update({ id: tenants[i].id }, { lease_id: leases[i].id });
    }

    // --------- Seed Complaint Table --------- //
    const complaintRepo = AppDataSource.getRepository(Complaint);
    const existingComplaint = await complaintRepo.count();

    if (existingComplaint === 0) {
      const complaintsData = [
        {
          date_submitted: "2025-03-11",
          complaint_type: "Noise",
          description: "Loud music during night hours.",
          status: "New",
          tenant_id: tenants[4].id,
        },
        {
          date_submitted: "2025-03-12",
          complaint_type: "Maintenance",
          description: "Leaking faucet in the kitchen.",
          status: "In Progress",
          tenant_id: tenants[6].id,
        },
        {
          date_submitted: "2025-03-13",
          complaint_type: "Maintenance",
          description: "Ants seen in the kitchen area.",
          status: "New",
          tenant_id: tenants[5].id,
        },
        {
          date_submitted: "2025-03-14",
          complaint_type: "Noise",
          description: "Heating system not working properly.",
          status: "New",
          tenant_id: tenants[0].id,
        },
        {
          date_submitted: "2025-03-15",
          complaint_type: "Emergency",
          description: "Air conditioning not cooling.",
          status: "In Progress",
          tenant_id: tenants[1].id,
        },
        {
          date_submitted: "2025-03-16",
          complaint_type: "Other",
          description: "Refrigerator not working.",
          status: "New",
          tenant_id: tenants[2].id,
        },
        {
          date_submitted: "2025-03-17",
          complaint_type: "Disturbance",
          description: "Leak in the ceiling.",
          status: "New",
          tenant_id: tenants[3].id,
        },
        {
          date_submitted: "2025-03-18",
          complaint_type: "Noise",
          description: "Neighbor playing loud instruments.",
          status: "In Progress",
          tenant_id: tenants[4].id,
        },
        {
          date_submitted: "2025-03-19",
          complaint_type: "Maintenance",
          description: "Broken window latch.",
          status: "New",
          tenant_id: tenants[5].id,
        },
        {
          date_submitted: "2025-03-20",
          complaint_type: "Emergency",
          description: "Rodents sighted near kitchen.",
          status: "New",
          tenant_id: tenants[6].id,
        },
        {
          date_submitted: "2025-03-21",
          complaint_type: "Maintenance",
          description: "Broken light fixture in hallway.",
          status: "In Progress",
          tenant_id: tenants[7].id,
        },
        {
          date_submitted: "2025-03-22",
          complaint_type: "Noise",
          description: "Loud construction noise during night.",
          status: "New",
          tenant_id: tenants[8].id,
        },
        {
          date_submitted: "2025-03-23",
          complaint_type: "Disturbance",
          description: "There has been constant banging and door slamming late at night that disturbed my sleep.",
          status: "New",
          tenant_id: tenants[9].id,
        },
        {
          date_submitted: "2025-03-24",
          complaint_type: "Other",
          description: "I have encountered an issue with the building’s lighting system where some lights flicker intermittently.",
          status: "In Progress",
          tenant_id: tenants[0].id,
        },
        {
          date_submitted: "2025-03-25",
          complaint_type: "Maintenance",
          description: "Over the past few weeks, my apartment’s plumbing has exhibited persistent and erratic behavior. The water pressure fluctuates wildly, causing sudden bursts that have led to localized flooding and damage in several areas. This ongoing issue disrupts daily routines and poses a serious risk to property integrity, demanding immediate professional intervention.",
          status: "New",
          tenant_id: tenants[1].id,
        },
        {
          date_submitted: "2025-03-26",
          complaint_type: "Emergency",
          description: "Recently, there has been a critical electrical malfunction in my apartment. Outlets emit occasional sparks and voltage surges, creating a dangerous environment. This erratic behavior raises serious concerns about potential fire hazards and equipment damage, necessitating an immediate inspection and repair by a qualified electrician.",
          status: "In Progress",
          tenant_id: tenants[2].id,
        },
        {
          date_submitted: "2025-03-27",
          complaint_type: "Noise",
          description: "There is a constant drone from nearby construction disrupting the quiet environment of my home.",
          status: "New",
          tenant_id: tenants[3].id,
        },
        {
          date_submitted: "2025-03-28",
          complaint_type: "Disturbance",
          description: "Frequent door slamming has been reported by several neighbors.",
          status: "In Progress",
          tenant_id: tenants[4].id,
        },
        {
          date_submitted: "2025-03-29",
          complaint_type: "Emergency",
          description: "A water leak has worsened, causing flooding in the hallway.",
          status: "In Progress",
          tenant_id: tenants[5].id,
        },
        {
          date_submitted: "2025-03-30",
          complaint_type: "Other",
          description: "There is an issue with the building’s internet connectivity affecting multiple residents.",
          status: "New",
          tenant_id: tenants[6].id,
        },
      ];

      await complaintRepo.insert(complaintsData);
      console.log("✅ Complaint table seeded.");
    } else {
      console.log("⚠️ Complaint table already has data.");
    }

    console.log("🎉 Database seeding complete.");

    await AppDataSource.destroy();
    console.log("connection closed");
  })
  .catch((error) => {
    console.error("❌ Error seeding database:", error);
  });

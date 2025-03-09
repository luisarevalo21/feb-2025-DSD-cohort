require("dotenv").config();
const { AppDataSource } = require("./data-source");
const Admin = require("./entities/admin");
const Apartment = require("./entities/apartment");
const Lease = require("./entities/lease");
const Tenant = require("./entities/tenant");

AppDataSource.initialize()
  .then(async () => {
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
          password: "password123",
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
      await apartmentRepo.insert([
        {
          apartment_number: 101,
          square_footage: 1000,
          bedrooms: 2,
          bathrooms: 1,
          floor: 1,
          notes: "Corner unit",
        },

        {
          apartment_number: 201,
          square_footage: 1200,
          bedrooms: 3,
          bathrooms: 2,
          floor: 2,
          notes: "Balcony",
        },
      ]);
      console.log("✅ Apartment table seeded.");
    } else {
      console.log("⚠️ Apartment table already has data.");
    }

    // // --------- Seed Tenant Table --------- //
    const tenantRepo = AppDataSource.getRepository(Tenant);
    const existingTenants = await tenantRepo.count();

    if (existingTenants === 0) {
      await tenantRepo.insert([
        {
          first_name: "Emily",
          last_name: "Johnson",
          email: "emily.johnson@email.com",
          // apartment_id: 1, // FK to Apartment
          date_of_birth: "1990-01-15",
        },
      ]);
      console.log("✅ Tenant table seeded.");
    } else {
      console.log("⚠️ Tenant table already has data.");
    }

    // --------- Seed Tenant Table --------- //
    const leaseRepo = AppDataSource.getRepository(Lease);
    const existingLeases = await leaseRepo.count();

    if (existingLeases === 0) {
      await leaseRepo.insert([
        {
          id: 1,
          tenant_id: 1,
          first_name: "John",
          last_name: "Doe",
          landlord_id: 10,
          lease_start_date: "2024-03-01",
          lease_end_date: "2025-04-05",
          renewal_term: "Yearly",
          status: "Signed",
          monthly_rent_in_dollars: 1500,
          notes: "Tenant requested minor repairs.",
          apartment_id: 1,
        },
        {
          id: 2,
          tenant_id: 2,
          first_name: "Emma",
          last_name: "Smith",
          landlord_id: 11,
          lease_start_date: "2024-04-15",
          lease_end_date: "2025-03-30",
          renewal_term: "Monthly",
          status: "Signed",
          monthly_rent_in_dollars: 1500,
          apartment_id: 2,
          notes: "Tenant considering renewal.",
        },
        {
          id: 3,
          tenant_id: 3,
          first_name: "Liam",
          last_name: "Johnson",
          landlord_id: 12,
          lease_start_date: "2023-09-01",
          lease_end_date: "2025-03-25",
          renewal_term: "Bi-monthly",
          status: "Pending",
          monthly_rent_in_dollars: 1500,
          apartment_id: 1,
          notes: "Lease renewal under review.",
        },
        {
          id: 4,
          tenant_id: 4,
          apartment_id: 2,
          first_name: "Olivia",
          last_name: "Brown",
          landlord_id: 13,
          lease_start_date: "2024-06-01",
          lease_end_date: "2025-06-01",
          renewal_term: "Yearly",
          status: "Signed",
          monthly_rent_in_dollars: 1500,
          notes: "Tenant wants early renewal.",
        },
        {
          id: 5,
          tenant_id: 5,
          first_name: "Noah",
          last_name: "Davis",
          landlord_id: 14,
          lease_start_date: "2024-05-01",
          lease_end_date: "2025-04-15",
          renewal_term: "Monthly",
          status: "Renewed",
          monthly_rent_in_dollars: 1500,
          apartment_id: 2,
          notes: "Lease auto-renewed last cycle.",
        },
        {
          id: 6,
          tenant_id: 6,
          first_name: "Ava",
          last_name: "Miller",
          landlord_id: 15,
          lease_start_date: "2024-07-10",
          lease_end_date: "2025-07-10",
          renewal_term: "Yearly",
          status: "Signed",
          monthly_rent_in_dollars: 1500,
          apartment_id: 1,
          notes: "Tenant inquired about extension.",
        },
        {
          id: 7,
          tenant_id: 7,
          first_name: "William",
          last_name: "Wilson",
          landlord_id: 16,
          lease_start_date: "2024-08-01",
          lease_end_date: "2025-03-20",
          renewal_term: "Bi-monthly",
          status: "Pending",
          monthly_rent_in_dollars: 1500,
          apartment_id: 2,
          notes: "Tenant might vacate.",
        },
        {
          id: 8,
          tenant_id: 8,
          first_name: "Sophia",
          last_name: "Moore",
          landlord_id: 17,
          lease_start_date: "2024-09-15",
          lease_end_date: "2025-09-15",
          renewal_term: "Yearly",
          status: "Signed",
          monthly_rent_in_dollars: 1500,
          apartment_id: 1,
          notes: "No issues reported.",
        },
        {
          id: 9,
          tenant_id: 9,
          first_name: "James",
          last_name: "Taylor",
          landlord_id: 18,
          lease_start_date: "2024-10-01",
          lease_end_date: "2025-04-01",
          renewal_term: "Monthly",
          status: "Signed",
          monthly_rent_in_dollars: 1500,
          apartment_id: 2,
          notes: "Tenant asked for lease extension.",
        },
        {
          id: 10,
          tenant_id: 10,
          first_name: "Isabella",
          last_name: "Anderson",
          landlord_id: 19,
          lease_start_date: "2024-11-20",
          lease_end_date: "2025-03-18",
          renewal_term: "Bi-monthly",
          status: "Pending",
          monthly_rent_in_dollars: 1500,
          apartment_id: 1,
          notes: "Pending tenant's decision on renewal.",
        },
      ]);
      console.log("✅ Leases table seeded.");
    } else {
      console.log("⚠️ Leases table already has data.");
    }

    console.log("🎉 Database seeding complete.");

    process.exit(0);
  })

  .catch(error => {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  });

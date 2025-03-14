require("dotenv").config();
const AppDataSource = require("./data-source");
const Admin = require("./entities/admin");
const Apartment = require("./entities/apartment");
const Lease = require("./entities/lease");
const Tenant = require("./entities/tenant");
const TenantDetails = require("./entities/tenantDetails");
const Complaint = require("./entities/complaint");

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
          id: 1,
          apartment_number: 101,
          square_footage: 1000,
          bedrooms: 2,
          bathrooms: 1,
          floor: 1,
          features: ["hardwood floors", "stainless steel appliances", "spacious living area"],
          notes: "Corner unit",
        },

        {
          id: 2,
          apartment_number: 201,
          square_footage: 1200,
          bedrooms: 3,
          bathrooms: 2,
          floor: 2,
          features: ["balcony", "city view", "central air", "updated bathroom"],
          notes: "Balcony",
        },
        {
          id: 3,
          apartment_number: 102,
          square_footage: 900,
          bedrooms: 1,
          bathrooms: 1,
          floor: 1,
          notes: "Near elevator",
        },
        {
          id: 4,
          apartment_number: 202,
          square_footage: 1100,
          bedrooms: 2,
          bathrooms: 2,
          floor: 2,
          notes: "Balcony with city view",
        },
        {
          id: 5,
          apartment_number: 103,
          square_footage: 850,
          bedrooms: 1,
          bathrooms: 1,
          floor: 1,
          notes: "Close to laundry room",
        },
        {
          id: 6,
          apartment_number: 203,
          square_footage: 1150,
          bedrooms: 2,
          bathrooms: 2,
          floor: 2,
          notes: "Spacious living room",
        },
        {
          id: 7,
          apartment_number: 104,
          square_footage: 950,
          bedrooms: 1,
          bathrooms: 1,
          floor: 1,
          notes: "Facing courtyard",
        },
        {
          id: 8,
          apartment_number: 204,
          square_footage: 1250,
          bedrooms: 3,
          bathrooms: 2,
          floor: 2,
          notes: "Top floor unit",
        },
        {
          id: 9,
          apartment_number: 105,
          square_footage: 980,
          bedrooms: 2,
          bathrooms: 1,
          floor: 1,
          notes: "Near parking garage",
        },
        {
          id: 10,
          apartment_number: 205,
          square_footage: 1300,
          bedrooms: 3,
          bathrooms: 2,
          floor: 2,
          notes: "Vaulted ceilings",
        },
        {
          id: 11,
          apartment_number: 106,
          square_footage: 875,
          bedrooms: 1,
          bathrooms: 1,
          floor: 1,
          notes: "Ground floor unit",
        },
        {
          id: 12,
          apartment_number: 206,
          square_footage: 1200,
          bedrooms: 2,
          bathrooms: 2,
          floor: 2,
          notes: "Large master bedroom",
        },
      ]);
      console.log("✅ Apartment table seeded.");
    } else {
      console.log("⚠️ Apartment table already has data.");
    }

    // --------- Seed Tenant Table --------- //
    const tenantRepo = AppDataSource.getRepository(Tenant);
    const existingTenants = await tenantRepo.count();

    if (existingTenants === 0) {
      await tenantRepo.insert([
        {
          id: 1,
          first_name: "John",
          last_name: "Doe",
          email: "john.doe@email.com",
          date_of_birth: "1990-01-15",
        },
        {
          id: 2,
          first_name: "Emma",
          last_name: "Smith",
          email: "emma.smith@email.com",
          date_of_birth: "1985-05-20",
        },
        {
          id: 3,
          first_name: "Liam",
          last_name: "Johnson",
          email: "liam.johnson@email.com",
          date_of_birth: "1992-07-10",
        },
      ]);
      console.log("✅ Tenant table seeded.");
    } else {
      console.log("⚠️ Tenant table already has data.");
    }

    // --------- Seed Tenant Details Table --------- //
    const tenantDetailsRepo = AppDataSource.getRepository(TenantDetails);
    const existingTenantDetails = await tenantDetailsRepo.count();

    if (existingTenantDetails === 0) {
      await tenantDetailsRepo.insert([
        {
          id: 1,
          tenant_id: 1,
          phone_number: "123-456-7890",
          profile_photo: "john_profile.jpg",
          additional_information: "John's tenant details",
        },
        {
          id: 2,
          tenant_id: 2,
          phone_number: "123-456-7890",
          profile_photo: "emma_profile.jpg",
          additional_information: "Emma's tenant details",
        },
        {
          id: 3,
          tenant_id: 3,
          phone_number: "123-456-7890",
          profile_photo: "liam_profile.jpg",
          additional_information: "Liam's tenant details",
        },
      ]);
      console.log("✅ Tenant Details table seeded.");
    } else {
      console.log("⚠️ Tenant Details table already has data.");
    }

    // --------- Update Tenant Table with Tenant Details --------- //
    await tenantRepo.update({ id: 1 }, { tenant_details_id: 1 });
    await tenantRepo.update({ id: 2 }, { tenant_details_id: 2 });
    await tenantRepo.update({ id: 3 }, { tenant_details_id: 3 });

    // --------- Seed Lease Table --------- //
    const leaseRepo = AppDataSource.getRepository(Lease);
    const existingLeases = await leaseRepo.count();

    if (existingLeases === 0) {
      await leaseRepo.insert([
        {
          id: 1,
          tenant_id: 1,
          lease_start_date: "2024-03-01",
          lease_end_date: "2025-04-05",
          monthly_rent_in_dollars: 1500,
          notes: "Tenant requested minor repairs.",
          apartment_id: 1,
        },
        {
          id: 2,
          tenant_id: 2,
          lease_start_date: "2024-04-15",
          lease_end_date: "2025-03-30",
          monthly_rent_in_dollars: 1500,
          apartment_id: 2,
          notes: "Tenant considering renewal.",
        },
        {
          id: 3,
          tenant_id: 3,
          lease_start_date: "2023-09-01",
          lease_end_date: "2025-03-25",
          monthly_rent_in_dollars: 1500,
          apartment_id: 4,
          notes: "Lease renewal under review.",
        },
      ]);
      console.log("✅ Lease table seeded.");
    } else {
      console.log("⚠️ Lease table already has data.");
    }

    // // --------- Seed Complaint Table --------- //
    const complaintRepo = AppDataSource.getRepository(Complaint);
    const existingComplaint = await complaintRepo.count();

    if (existingComplaint === 0) {
      await complaintRepo.insert([
        {
          id: 1,
          apt_num: 205,
          complaint_type: "Noise",
          description: "Loud music playing past midnight.",
          location: "Building A, 2nd Floor",
          timestamp: "2025-03-11T22:15:00Z",
          status: "New",
          admin_response: null,
          priority: "High",
          date_submitted: "2025-03-11",
          tenant_id: 2,
        },
        {
          id: 2,
          apt_num: 312,
          complaint_type: "Maintenance",
          description: "Leaking faucet in the kitchen.",
          location: "Building B, 3rd Floor",
          timestamp: "2025-03-11T19:30:00Z",
          status: "In Progress",
          admin_response: "Plumber scheduled for tomorrow.",
          priority: "Medium",
          date_submitted: "2025-03-11",
          tenant_id: 1,
        },
      ]);
      console.log("✅ Complaint table seeded.");
    } else {
      console.log("⚠️ Complaint table already has data.");
    }

    console.log("🎉 Database seeding complete.");

    await AppDataSource.destroy();
    console.log("connection closed");
  })

  .catch(error => {
    console.error("❌ Error seeding database:", error);
  });

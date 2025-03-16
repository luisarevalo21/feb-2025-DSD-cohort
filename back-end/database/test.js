// const { DataSource } = require("typeorm");
// const Apartment = require("./entities/apartment");
// const Lease = require("./entities/lease");
// const Tenant = require("./entities/tenant");
// const TenantDetails = require("./entities/tenantDetails");
// const Complaint = require("./entities/complaint");

// const AppDataSource = new DataSource({
//   type: "postgres",
//   host: "localhost",
//   port: 5432,
//   username: "postgres",
//   password: "password",
//   database: "tenant_portal",
//   synchronize: true,
//   logging: false,
//   entities: [Apartment, Lease, Tenant, TenantDetails, Complaint],
// });

// const testFetchInformation = async () => {
//   try {
//     await AppDataSource.initialize();
//     console.log("✅ Data Source has been initialized!");

//     // const apartmentRepo = AppDataSource.getRepository(Apartment);
//     const leaseRepo = AppDataSource.getRepository(Lease);
//     // const tenantRepo = AppDataSource.getRepository(Tenant);
//     // const tenantDetailsRepo = AppDataSource.getRepository(TenantDetails);

//     const lease = await leaseRepo.findOne({
//       where: { id: 1 },
//       relations: ["apartment", "tenant"],
//     });

//     console.log("lease ;", lease);
//     // Insert an apartment
//     // const newApartment = apartmentRepo.create({
//     //   apartment_number: "1001",
//     //   square_footage: 1500,
//     //   bedrooms: 4,
//     //   bathrooms: 3,
//     //   floor: 10,
//     //   notes: "Test apartment 1001",
//     // });
//     // await apartmentRepo.save(newApartment);
//     // console.log("✅ Apartment inserted:", newApartment);

//     // Insert a lease for the apartment
//     // const newLease = leaseRepo.create({
//     //   lease_start_date: "2025-01-01",
//     //   lease_end_date: "2027-01-01",
//     //   monthly_rent_in_dollars: 2500,
//     //   notes: "Test lease 1001",
//     //   apartment: newApartment, // Associate the lease with the apartment
//     // });
//     // await leaseRepo.save(newLease);
//     // console.log("✅ Lease inserted:", newLease);

//     // Insert a tenant for the lease
//     // const newTenant = tenantRepo.create({
//     //   first_name: "Alice",
//     //   last_name: "Johnson",
//     //   email: "alice.johnson@example.com",
//     //   date_of_birth: "1990-03-25",
//     //   lease: newLease, // Associate the tenant with the lease
//     // });
//     // await tenantRepo.save(newTenant);
//     // console.log("✅ Tenant inserted:", newTenant);

//     // Insert tenant details for the tenant
//     // const newTenantDetails = tenantDetailsRepo.create({
//     //   tenant_id: newTenant.id, // Associate the tenant details with the tenant
//     //   phone_number: "123-456-7890",
//     //   profile_photo: "alice_profile.jpg",
//     //   additional_information: "Alice's tenant details",
//     // });
//     // await tenantDetailsRepo.save(newTenantDetails);
//     // console.log("✅ Tenant details inserted:", newTenantDetails);

//     // Query the lease and include the associated apartment and tenant
//     // const leaseWithDetails = await leaseRepo.findOne({
//     //   where: { id: newLease.id },
//     //   relations: ["apartment", "tenant"],
//     // });

//     // if (leaseWithDetails) {
//     //   console.log("✅ Lease with associated apartment and tenant:", leaseWithDetails);
//     // } else {
//     //   console.log("⚠️ No lease found with the specified ID.");
//     // }

//     await AppDataSource.destroy();
//     console.log("✅ Data Source has been destroyed!");
//   } catch (error) {
//     console.error("❌ Error during test:", error);
//     await AppDataSource.destroy();
//   }
// };

// testFetchInformation();

const { DataSource } = require("typeorm");
const Apartment = require("./entities/apartment");
const Lease = require("./entities/lease");
const Tenant = require("./entities/tenant");
const TenantDetails = require("./entities/tenantDetails");
const Complaint = require("./entities/complaint");

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "tenant_portal",
  synchronize: true,
  logging: false,
  entities: [Apartment, Lease, Tenant, TenantDetails, Complaint],
});

const testRelationships = async () => {
  try {
    await AppDataSource.initialize();
    console.log("✅ Data Source has been initialized!");

    const tenantRepo = AppDataSource.getRepository(Tenant);
    const leaseRepo = AppDataSource.getRepository(Lease);
    const apartmentRepo = AppDataSource.getRepository(Apartment);

    // Query all tenants and include their leases and apartments
    const tenants = await tenantRepo.find({
      relations: ["complaints"],
    });

    if (tenants.length > 0) {
      tenants.forEach(tenant => {
        console.log("✅ Tenant:", tenant);
        // console.log("  Lease:", tenant.lease);
        // console.log("  Apartment:", tenant.lease ? tenant.lease.apartment : null);
      });
    } else {
      console.log("⚠️ No tenants found.");
    }

    // Query all leases and include their tenants and apartments
    // const leases = await leaseRepo.find({
    //   relations: ["tenant", "apartment"],
    // });

    // if (leases.length > 0) {
    //   leases.forEach(lease => {
    //     console.log("✅ Lease:", lease);
    //     console.log("  Tenant:", lease.tenant);
    //     console.log("  Apartment:", lease.apartment);
    //   });
    // } else {
    //   console.log("⚠️ No leases found.");
    // }

    // Query all apartments and include their leases and tenants
    // const apartments = await apartmentRepo.find({
    //   relations: ["leases", "leases.tenant"],
    // });

    // if (apartments.length > 0) {
    //   apartments.forEach(apartment => {
    //     console.log("✅ Apartment:", apartment);
    //     apartment.leases.forEach(lease => {
    //       console.log("  Lease:", lease);
    //       console.log("  Tenant:", lease.tenant);
    //     });
    //   });
    // } else {
    //   console.log("⚠️ No apartments found.");
    // }

    await AppDataSource.destroy();
    console.log("✅ Data Source has been destroyed!");
  } catch (error) {
    console.error("❌ Error during test:", error);
    await AppDataSource.destroy();
  }
};

testRelationships();

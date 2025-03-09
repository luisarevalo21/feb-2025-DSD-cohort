const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Migrations1741501491898 {
    name = 'Migrations1741501491898'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "admins" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "admins" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "admins" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "apartments" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "apartments" DROP COLUMN "rent"`);
        await queryRunner.query(`ALTER TABLE "apartments" DROP COLUMN "isAvailable"`);
        await queryRunner.query(`ALTER TABLE "lease_agreements" DROP COLUMN "apt_num"`);
        await queryRunner.query(`ALTER TABLE "lease_agreements" DROP COLUMN "tenant_id"`);
        await queryRunner.query(`ALTER TABLE "lease_agreements" DROP COLUMN "landlord_id"`);
        await queryRunner.query(`ALTER TABLE "lease_agreements" DROP COLUMN "renewal_term"`);
        await queryRunner.query(`DROP TYPE "public"."lease_agreements_renewal_term_enum"`);
        await queryRunner.query(`ALTER TABLE "lease_agreements" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."lease_agreements_status_enum"`);
        await queryRunner.query(`ALTER TABLE "lease_agreements" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "tenants" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "tenants" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "tenants" DROP COLUMN "apt_num"`);
        await queryRunner.query(`ALTER TABLE "admins" ADD "first_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "admins" ADD "last_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "apartments" ADD "apartment_number" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "apartments" ADD CONSTRAINT "UQ_a8b7311474532bc83a020a61cbc" UNIQUE ("apartment_number")`);
        await queryRunner.query(`ALTER TABLE "apartments" ADD "square_footage" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "apartments" ADD "bedrooms" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "apartments" ADD "bathrooms" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "apartments" ADD "floor" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "apartments" ADD "notes" text`);
        await queryRunner.query(`ALTER TABLE "lease_agreements" ADD "monthly_rent_in_dollars" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lease_agreements" ADD "apartment_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tenants" ADD "first_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tenants" ADD "last_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tenants" ADD "date_of_birth" date NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "tenants" DROP COLUMN "date_of_birth"`);
        await queryRunner.query(`ALTER TABLE "tenants" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "tenants" DROP COLUMN "first_name"`);
        await queryRunner.query(`ALTER TABLE "lease_agreements" DROP COLUMN "apartment_id"`);
        await queryRunner.query(`ALTER TABLE "lease_agreements" DROP COLUMN "monthly_rent_in_dollars"`);
        await queryRunner.query(`ALTER TABLE "apartments" DROP COLUMN "notes"`);
        await queryRunner.query(`ALTER TABLE "apartments" DROP COLUMN "floor"`);
        await queryRunner.query(`ALTER TABLE "apartments" DROP COLUMN "bathrooms"`);
        await queryRunner.query(`ALTER TABLE "apartments" DROP COLUMN "bedrooms"`);
        await queryRunner.query(`ALTER TABLE "apartments" DROP COLUMN "square_footage"`);
        await queryRunner.query(`ALTER TABLE "apartments" DROP CONSTRAINT "UQ_a8b7311474532bc83a020a61cbc"`);
        await queryRunner.query(`ALTER TABLE "apartments" DROP COLUMN "apartment_number"`);
        await queryRunner.query(`ALTER TABLE "admins" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "admins" DROP COLUMN "first_name"`);
        await queryRunner.query(`ALTER TABLE "tenants" ADD "apt_num" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tenants" ADD "password" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tenants" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lease_agreements" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`CREATE TYPE "public"."lease_agreements_status_enum" AS ENUM('Pending', 'Signed', 'Renewed', 'Draft')`);
        await queryRunner.query(`ALTER TABLE "lease_agreements" ADD "status" "public"."lease_agreements_status_enum" NOT NULL DEFAULT 'Draft'`);
        await queryRunner.query(`CREATE TYPE "public"."lease_agreements_renewal_term_enum" AS ENUM('Monthly', 'Bi-monthly', 'Yearly')`);
        await queryRunner.query(`ALTER TABLE "lease_agreements" ADD "renewal_term" "public"."lease_agreements_renewal_term_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lease_agreements" ADD "landlord_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lease_agreements" ADD "tenant_id" integer`);
        await queryRunner.query(`ALTER TABLE "lease_agreements" ADD "apt_num" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "apartments" ADD "isAvailable" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "apartments" ADD "rent" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "apartments" ADD "address" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "admins" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "admins" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "admins" ADD "name" character varying NOT NULL`);
    }
}

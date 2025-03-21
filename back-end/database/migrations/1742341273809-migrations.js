const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Migrations1742341273809 {
    name = 'Migrations1742341273809'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "tenants" DROP CONSTRAINT "FK_eb20a2f8a3bcdac1f9bdd2a95da"`);
        await queryRunner.query(`ALTER TABLE "tenants" DROP CONSTRAINT "REL_eb20a2f8a3bcdac1f9bdd2a95d"`);
        await queryRunner.query(`ALTER TABLE "tenants" DROP COLUMN "tenant_details_id"`);
        await queryRunner.query(`ALTER TABLE "leases" ADD "signed_at" date`);
        await queryRunner.query(`ALTER TABLE "leases" ADD "signature" text`);
        await queryRunner.query(`ALTER TABLE "tenants" ADD "phone_number" character varying`);
        await queryRunner.query(`ALTER TABLE "tenants" ADD "additional_information" character varying`);
        await queryRunner.query(`ALTER TABLE "tenants" ALTER COLUMN "date_of_birth" DROP NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "tenants" ALTER COLUMN "date_of_birth" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tenants" DROP COLUMN "additional_information"`);
        await queryRunner.query(`ALTER TABLE "tenants" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "leases" DROP COLUMN "signature"`);
        await queryRunner.query(`ALTER TABLE "leases" DROP COLUMN "signed_at"`);
        await queryRunner.query(`ALTER TABLE "tenants" ADD "tenant_details_id" integer`);
        await queryRunner.query(`ALTER TABLE "tenants" ADD CONSTRAINT "REL_eb20a2f8a3bcdac1f9bdd2a95d" UNIQUE ("tenant_details_id")`);
        await queryRunner.query(`ALTER TABLE "tenants" ADD CONSTRAINT "FK_eb20a2f8a3bcdac1f9bdd2a95da" FOREIGN KEY ("tenant_details_id") REFERENCES "tenant_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}

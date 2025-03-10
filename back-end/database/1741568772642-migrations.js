const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Migrations1741568772642 {
    name = 'Migrations1741568772642'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "leases" ("id" SERIAL NOT NULL, "lease_start_date" date NOT NULL, "lease_end_date" date NOT NULL, "monthly_rent_in_dollars" integer NOT NULL, "notes" text, "apartment_id" integer NOT NULL, CONSTRAINT "PK_2668e338ab2d27079170ea55ea2" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "leases"`);
    }
}

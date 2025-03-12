const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Migrations1741734634301 {
  name = "Migrations1741734634301";

  async up(queryRunner) {
    await queryRunner.query(`ALTER TABLE "leases" DROP CONSTRAINT "FK_90dec2f6bb5c0247dc893d96538"`);
    await queryRunner.query(`ALTER TABLE "leases" ADD "apartmentId" integer`);
    await queryRunner.query(
      `ALTER TABLE "leases" ADD CONSTRAINT "FK_d26968e9333099efd531e3b0e01" FOREIGN KEY ("apartmentId") REFERENCES "apartments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`ALTER TABLE "leases" DROP CONSTRAINT "FK_d26968e9333099efd531e3b0e01"`);
    await queryRunner.query(`ALTER TABLE "leases" DROP COLUMN "apartmentId"`);
    await queryRunner.query(
      `ALTER TABLE "leases" ADD CONSTRAINT "FK_90dec2f6bb5c0247dc893d96538" FOREIGN KEY ("apartment_id") REFERENCES "apartments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
};

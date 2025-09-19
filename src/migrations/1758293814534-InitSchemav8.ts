import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchemav81758293814534 implements MigrationInterface {
    name = 'InitSchemav81758293814534'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document" ADD "cif" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "document" ADD "createdAt" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "document" DROP COLUMN "cif"`);
    }

}

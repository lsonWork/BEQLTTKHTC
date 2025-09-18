import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchemav71758171063578 implements MigrationInterface {
    name = 'InitSchemav71758171063578'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document" ADD "createdAt" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document" DROP COLUMN "createdAt"`);
    }

}

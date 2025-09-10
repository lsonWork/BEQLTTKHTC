import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchemav41757519225224 implements MigrationInterface {
    name = 'InitSchemav41757519225224'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" ADD "role" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "role"`);
    }

}

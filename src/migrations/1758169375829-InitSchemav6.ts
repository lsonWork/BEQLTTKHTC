import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchemav61758169375829 implements MigrationInterface {
    name = 'InitSchemav61758169375829'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document" ADD "cif" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document" DROP COLUMN "cif"`);
    }

}

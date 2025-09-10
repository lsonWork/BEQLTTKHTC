import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchemav21757516626494 implements MigrationInterface {
    name = 'InitSchemav21757516626494'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "UQ_41dfcb70af895ddf9a53094515b" UNIQUE ("username")`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "account" ADD "status" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "account" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "UQ_41dfcb70af895ddf9a53094515b"`);
    }

}

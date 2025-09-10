import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchemav31757518595812 implements MigrationInterface {
    name = 'InitSchemav31757518595812'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea"`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "account" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea"`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "account" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id")`);
    }

}

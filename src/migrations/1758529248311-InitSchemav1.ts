import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchemav11758529248311 implements MigrationInterface {
    name = 'InitSchemav11758529248311'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document" DROP CONSTRAINT "FK_4a263071ada91288ce8412916e7"`);
        await queryRunner.query(`ALTER TABLE "document" DROP COLUMN "accountId"`);
        await queryRunner.query(`ALTER TABLE "document" ADD "account_id" uuid`);
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea"`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "account" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "document" DROP CONSTRAINT "PK_e57d3357f83f3cdc0acffc3d777"`);
        await queryRunner.query(`ALTER TABLE "document" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "document" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "document" ADD CONSTRAINT "PK_e57d3357f83f3cdc0acffc3d777" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "document" ADD CONSTRAINT "FK_a05e62b6b25192e8ff52fd197ed" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document" DROP CONSTRAINT "FK_a05e62b6b25192e8ff52fd197ed"`);
        await queryRunner.query(`ALTER TABLE "document" DROP CONSTRAINT "PK_e57d3357f83f3cdc0acffc3d777"`);
        await queryRunner.query(`ALTER TABLE "document" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "document" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "document" ADD CONSTRAINT "PK_e57d3357f83f3cdc0acffc3d777" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea"`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "account" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "document" DROP COLUMN "account_id"`);
        await queryRunner.query(`ALTER TABLE "document" ADD "accountId" integer`);
        await queryRunner.query(`ALTER TABLE "document" ADD CONSTRAINT "FK_4a263071ada91288ce8412916e7" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

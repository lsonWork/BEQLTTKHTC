import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchemav11758300435744 implements MigrationInterface {
    name = 'InitSchemav11758300435744'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "document" ("id" SERIAL NOT NULL, "cif" character varying NOT NULL, "name" character varying NOT NULL, "content" text NOT NULL, "createdAt" TIMESTAMP NOT NULL, "accountId" integer, CONSTRAINT "UQ_6be4f75c40f5f3878d18d9806cc" UNIQUE ("name"), CONSTRAINT "PK_e57d3357f83f3cdc0acffc3d777" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "account" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, "status" boolean NOT NULL, CONSTRAINT "UQ_41dfcb70af895ddf9a53094515b" UNIQUE ("username"), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "document" ADD CONSTRAINT "FK_4a263071ada91288ce8412916e7" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document" DROP CONSTRAINT "FK_4a263071ada91288ce8412916e7"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TABLE "document"`);
    }

}

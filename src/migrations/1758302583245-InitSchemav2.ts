import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchemav21758302583245 implements MigrationInterface {
    name = 'InitSchemav21758302583245'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document" DROP CONSTRAINT "PK_e57d3357f83f3cdc0acffc3d777"`);
        await queryRunner.query(`ALTER TABLE "document" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "document" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "document" ADD CONSTRAINT "PK_e57d3357f83f3cdc0acffc3d777" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document" DROP CONSTRAINT "PK_e57d3357f83f3cdc0acffc3d777"`);
        await queryRunner.query(`ALTER TABLE "document" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "document" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "document" ADD CONSTRAINT "PK_e57d3357f83f3cdc0acffc3d777" PRIMARY KEY ("id")`);
    }

}

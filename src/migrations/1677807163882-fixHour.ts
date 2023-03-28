import { MigrationInterface, QueryRunner } from "typeorm";

export class fixHour1677807163882 implements MigrationInterface {
    name = 'fixHour1677807163882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shedules_users_properties" DROP COLUMN "hour"`);
        await queryRunner.query(`ALTER TABLE "shedules_users_properties" ADD "hour" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shedules_users_properties" DROP COLUMN "hour"`);
        await queryRunner.query(`ALTER TABLE "shedules_users_properties" ADD "hour" TIMESTAMP NOT NULL`);
    }

}

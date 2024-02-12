import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateWork1707761695535 implements MigrationInterface {
    name = 'CreateWork1707761695535'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "WorkEntity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "imageName" character varying NOT NULL, "title" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_04ed688779cb873a9fee3055b2d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "WorkEntity" ADD CONSTRAINT "FK_7b17e7b53e0e6be4bbc10f0565f" FOREIGN KEY ("userId") REFERENCES "UserEntity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "WorkEntity" DROP CONSTRAINT "FK_7b17e7b53e0e6be4bbc10f0565f"`);
        await queryRunner.query(`DROP TABLE "WorkEntity"`);
    }

}

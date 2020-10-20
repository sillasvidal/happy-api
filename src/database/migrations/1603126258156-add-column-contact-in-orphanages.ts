import {Column, MigrationInterface, QueryRunner, TableColumn} from "typeorm";
import { string } from "yup";

export class addColumnContactInOrphanages1603126258156 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('orphanages', new TableColumn({
            name: 'whatsapp',
            type: 'varchar',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('orphanages', 'whatsapp');
    }

}

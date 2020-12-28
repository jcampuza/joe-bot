require('dotenv');
import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../entities/user';

export class adminUser1609169218689 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepo = getRepository(User);

    const user = userRepo.create({
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
    });

    await userRepo.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

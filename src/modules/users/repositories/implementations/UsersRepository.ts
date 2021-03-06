import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    const user = await this.repository.findOne({
      relations: ['games'],
      where: [{id: user_id}],
    })

    if  (!user) return new User;

    return user;

  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query(
      `
      SELECT 
        "id",
        "first_name",
        "last_name",
        "email",
        "created_at",
        "updated_at"
      FROM "users" "User"
      ORDER BY "first_name" ASC
      `); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository.query(`
    SELECT 
    "id",
    "first_name",
    "last_name",
    "email",
    "created_at",
    "updated_at"
    FROM "users" "User"
    WHERE LOWER(first_name) LIKE $1
    AND
    LOWER(last_name) LIKE $2
    `, [first_name.toLocaleLowerCase(), last_name.toLocaleLowerCase()]
    ); // Complete usando raw query
  }
}

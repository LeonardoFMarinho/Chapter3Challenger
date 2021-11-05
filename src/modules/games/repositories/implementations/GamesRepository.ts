import { getRepository, ILike, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    
    const findgames = await this.repository
      .createQueryBuilder('games')
      .where("title ILIKE (:param)", {param: `%${param}%`})
      .getMany()

      return findgames
      // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    const sql = "SELECT COUNT(*) from games"
    return this.repository.query(sql); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return this.repository
      .createQueryBuilder()
      .relation(Game, 'users')
      .of(id)
      .loadMany()
      // Complete usando query builder
  }
}

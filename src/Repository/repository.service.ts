import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common'; 

import { RepositoryDocument, Repository } from './repository.schema';

@Injectable()
export class RepositoryService {
  constructor(
    @InjectModel(Repository.name)
    private repositoryModel: Model<RepositoryDocument>,
  ) { }

  async findAllUserRepositories(
    uuid: string,
    select = {
      description: 1,
      name: 1,
      isPublic: 1,
    },
    active: boolean = true,
  ): Promise<RepositoryDocument[]> {
    const filter = {
      owner: Types.ObjectId(uuid),
      active,
    };
    return this.repositoryModel
      .find(filter)
      .select(select);
  }

  async create(
    uuid: string,
    name: string,
    description: string,
    isPublic: boolean = true,
  ): Promise<RepositoryDocument> {
    const owner = Types.ObjectId(uuid);
    const reviewers = [owner];
    const team = [owner];
    const uniqName = `${uuid}_${name}`;
    const active = true;

    const toCreate = {
      owner,
      reviewers,
      uniqName,
      team,
      active,
      description,
      isPublic,
    };

    const createdRepository = new this.repositoryModel(toCreate);
    return createdRepository.save();
  }
}

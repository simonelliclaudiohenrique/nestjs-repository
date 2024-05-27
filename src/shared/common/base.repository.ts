import { NotFoundException } from '@nestjs/common';
import { IBaseRepository } from './base.repository.interface';
import { Repository } from 'typeorm';

export class BaseRepository<T> implements IBaseRepository<T> {
  constructor(private readonly repository: Repository<T>) {}

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findOneById(id: number): Promise<T> {
    const entity = this.repository.findOneBy({ id } as any);
    if (!entity) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
    return entity;
  }

  async create(entity: T): Promise<T> {
    this.repository.save(entity);
    return entity;
  }

  async update(id: number, entity: Partial<T>): Promise<T> {
    const existingEntity = await this.findOneById(id);
    Object.assign(existingEntity, entity);
    return this.repository.save(existingEntity);
  }

  async delete(id: number): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
  }
}

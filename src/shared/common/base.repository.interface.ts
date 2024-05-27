export interface IBaseRepository<T> {
  findAll(): Promise<T[]>;
  findOneById(id: number): Promise<T>;
  create(entity: T): Promise<T>;
  update(id: number, entity: Partial<T>): Promise<T>;
  delete(id: number): Promise<void>;
}

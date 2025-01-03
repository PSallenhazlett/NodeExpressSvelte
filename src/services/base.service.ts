import { BaseRepository } from '../repository/base.repository';

export abstract class BaseService<T, TDTO> {
  abstract mapModelToDTO: (model: T) => TDTO;
  abstract mapDTOToModel: (dto: TDTO) => T;
  abstract repository: BaseRepository<T>;

  postGetAllLogic?: (models: TDTO[]) => Promise<TDTO[]>;
  postGetLogic?: (model: TDTO) => Promise<TDTO>;

  getAll = async (): Promise<TDTO[] | null> => {
    const models = await this.repository.getAll();

    if (!models) {
      return null;
    }

    let mapped = models.map(this.mapModelToDTO);

    if (this.postGetAllLogic) {
      mapped = await this.postGetAllLogic(mapped);
    }

    return mapped;
  };
  
  getSingle = async (id: number): Promise<TDTO | null> => {
    let model = await this.repository.getSingle(id);

    if (!model) {
      return null;
    }

    let dto = this.mapModelToDTO(model);

    if (this.postGetLogic) {
      dto = await this.postGetLogic(dto);
    }

    return dto;
  };
  
  create = async (model: TDTO): Promise<TDTO | null> => {
    const entity = this.mapDTOToModel(model);
    
    const newEntity = await this.repository.create(entity);

    if (!newEntity) {
      return null;
    }

    return this.mapModelToDTO(newEntity);
  }

  update = async (model: TDTO): Promise<TDTO | null> => {
    const entity = this.mapDTOToModel(model);
    
    const updatedEntity = await this.repository.update(entity);

    if (!updatedEntity) {
      return null;
    }

    return this.mapModelToDTO(updatedEntity);
  }

  delete = async (id: number): Promise<boolean> => {
    return await this.repository.delete(id);
  }
}
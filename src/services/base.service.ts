import { BaseRepository } from "../repositories/base.repository";
import { Document, FilterQuery, UpdateQuery } from "mongoose";

export class BaseService<T extends Document> {
    private repository: BaseRepository<T>;

    constructor(repository: BaseRepository<T>) {
        this.repository = repository;
    }
}

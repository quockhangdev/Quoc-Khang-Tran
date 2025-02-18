import { BaseRepository } from "../repositories/base.repository";
import { Document } from "mongoose";

export class BaseService<T extends Document> {
    private repository: BaseRepository<T>;

    constructor(repository: BaseRepository<T>) {
        this.repository = repository;
    }

    getRepository(): BaseRepository<T> {
        return this.repository;
    }
}

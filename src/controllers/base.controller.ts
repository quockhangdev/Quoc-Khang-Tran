import { Request, Response } from "express";
import { BaseService } from "../services/base.service";
import { Document } from "mongoose";

export class BaseController<T extends Document> {
    private service: BaseService<T>;

    constructor(service: BaseService<T>) {
        this.service = service;
    }

    async create(req: Request, res: Response): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async findById(req: Request, res: Response): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async findAll(req: Request, res: Response): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async update(req: Request, res: Response): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async delete(req: Request, res: Response): Promise<any> {
        throw new Error("Method not implemented.");
    }

    getService(): BaseService<T> {
        return this.service;
    }
}

import { BaseService } from "./base.service";
import { IResource } from "../interfaces/resource.interface";
import ResourceRepository from "../repositories/resource.repository";

export class ResourceService extends BaseService<IResource> {
    constructor() {
        super(ResourceRepository);
    }

    async create(resource: IResource): Promise<IResource> {
        return this.getRepository().create(resource);
    }

    async get(resourceId: string): Promise<IResource | null> {
        return this.getRepository().findById(resourceId);
    }

    async list(): Promise<IResource[]> {
        return this.getRepository().find();
    }

    async update(
        resourceId: string,
        resource: IResource,
    ): Promise<IResource | null> {
        return this.getRepository().update(resourceId, resource);
    }

    async delete(resourceId: string): Promise<IResource | null> {
        return this.getRepository().delete(resourceId);
    }
}

export default new ResourceService();

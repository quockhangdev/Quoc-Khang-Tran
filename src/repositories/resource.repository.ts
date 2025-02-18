import { BaseRepository } from "./base.repository";
import Resource from "../models/resource.model";
import { IResource } from "../interfaces/resource.interface";

export class ResourceRepository extends BaseRepository<IResource> {
    constructor() {
        super(Resource);
    }
}

export default new ResourceRepository();

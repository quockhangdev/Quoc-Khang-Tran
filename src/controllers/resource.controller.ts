import { Request, Response } from "express";
import { ResourceService } from "../services/resource.service";
import { IResource } from "../interfaces/resource.interface";
import { BaseController } from "./base.controller";
import { HttpStatusCode } from "axios";
import { StringConst } from "../constants/string.const";
import log from "../logger";

export class ResourceController extends BaseController<IResource> {
    private resourceService: ResourceService;

    constructor(resourceService: ResourceService) {
        super(resourceService);
        this.resourceService = resourceService;
    }

    async create(req: Request, res: Response) {
        try {
            const resource = await this.resourceService.create(req.body);
            return res.status(HttpStatusCode.Created).json({
                statusCode: HttpStatusCode.Created,
                statusText: StringConst.SuccessMessage,
                message: StringConst.ResourceCreatedMessage,
                data: resource,
            });
        } catch (error) {
            log.error(error);
            return res.status(HttpStatusCode.InternalServerError).json({
                statusCode: HttpStatusCode.InternalServerError,
                statusText: StringConst.FailureMessage,
                message: StringConst.InternalServerErrorMessage,
            });
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const resource = await this.resourceService.get(req.params.id);
            if (!resource) {
                return res.status(HttpStatusCode.NotFound).json({
                    statusCode: HttpStatusCode.NotFound,
                    statusText: StringConst.FailureMessage,
                    message: StringConst.ResourceNotFoundMessage,
                });
            }
            return res.status(HttpStatusCode.Ok).json({
                statusCode: HttpStatusCode.Ok,
                statusText: StringConst.SuccessMessage,
                message: StringConst.ResourceFechedMessage,
                data: resource,
            });
        } catch (error) {
            log.error(error);
            return res.status(HttpStatusCode.InternalServerError).json({
                statusCode: HttpStatusCode.InternalServerError,
                statusText: StringConst.FailureMessage,
                message: StringConst.InternalServerErrorMessage,
            });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const resources = await this.resourceService.list();
            res.status(HttpStatusCode.Ok).json({
                statusCode: HttpStatusCode.Ok,
                statusText: StringConst.SuccessMessage,
                pager: {
                    total: resources.length,
                    page: 1,
                    pageSize: 10,
                    totalPages: 1,
                },
                data: resources,
            });
        } catch (error) {
            res.status(HttpStatusCode.InternalServerError).json({
                statusCode: HttpStatusCode.InternalServerError,
                statusText: StringConst.FailureMessage,
                message: StringConst.InternalServerErrorMessage,
            });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const resource = await this.resourceService.update(req.params.id, req.body);
            if (!resource) {
                return res.status(HttpStatusCode.NotFound).json({
                    statusCode: HttpStatusCode.NotFound,
                    statusText: StringConst.FailureMessage,
                    message: StringConst.ResourceNotFoundMessage,
                });
            }
            return res.status(HttpStatusCode.Ok).json({
                statusCode: HttpStatusCode.Ok,
                statusText: StringConst.SuccessMessage,
                message: StringConst.ResourceUpdatedMessage,
                data: resource,
            });
        } catch (error) {
            log.error(error);
            return res.status(HttpStatusCode.InternalServerError).json({
                statusCode: HttpStatusCode.InternalServerError,
                statusText: StringConst.FailureMessage,
                message: StringConst.InternalServerErrorMessage,
            });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const resource = await this.resourceService.delete(req.params.id);
            if (!resource) {
                return res.status(HttpStatusCode.NotFound).json({
                    statusCode: HttpStatusCode.NotFound,
                    statusText: StringConst.FailureMessage,
                    message: StringConst.ResourceNotFoundMessage,
                });
            }
            return res.status(HttpStatusCode.Ok).json({
                statusCode: HttpStatusCode.Ok,
                statusText: StringConst.SuccessMessage,
                message: StringConst.ResourceDeletedMessage,
            });
        } catch (error) {
            log.error(error);
            return res.status(HttpStatusCode.InternalServerError).json({
                statusCode: HttpStatusCode.InternalServerError,
                statusText: StringConst.FailureMessage,
                message: StringConst.InternalServerErrorMessage,
            });
        }
    }
}

export default new ResourceController(new ResourceService());
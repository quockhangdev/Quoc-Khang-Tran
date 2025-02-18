import { Model, Document, FilterQuery, UpdateQuery } from "mongoose";

export class BaseRepository<T extends Document> {
    private model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async create(doc: Partial<T>): Promise<T> {
        return this.model.create(doc);
    }

    async findById(id: string): Promise<T | null> {
        return this.model.findById(id).exec();
    }

    async findOne(filter: FilterQuery<T>): Promise<T | null> {
        return this.model.findOne(filter).exec();
    }

    async find(filter: FilterQuery<T> = {}): Promise<T[]> {
        return this.model.find(filter).exec();
    }

    async update(id: string, update: UpdateQuery<T>): Promise<T | null> {
        return this.model.findByIdAndUpdate(id, update, { new: true }).exec();
    }

    async updateMany(
        filter: FilterQuery<T>,
        update: UpdateQuery<T>,
    ): Promise<{ nModified: number }> {
        const result = await this.model.updateMany(filter, update).exec();
        return { nModified: result.modifiedCount };
    }

    async delete(id: string): Promise<T | null> {
        return this.model.findByIdAndDelete(id).exec();
    }

    async deleteMany(
        filter: FilterQuery<T>,
    ): Promise<{ deletedCount?: number }> {
        return this.model.deleteMany(filter).exec();
    }

    async count(filter: FilterQuery<T> = {}): Promise<number> {
        return this.model.countDocuments(filter).exec();
    }

    async getPaginatedResults(
        filter: FilterQuery<T>,
        page: number,
        limit: number,
    ): Promise<T[]> {
        return this.model
            .find(filter)
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();
    }

    async exists(filter: FilterQuery<T>): Promise<boolean> {
        const doc = await this.model.findOne(filter).exec();
        return !!doc;
    }

    async getModel(): Promise<Model<T>> {
        return this.model;
    }
}

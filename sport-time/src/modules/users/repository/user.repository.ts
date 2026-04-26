import { Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../schemas/user.schema";
import { Model } from "mongoose";




export class UserRepository {
    private readonly logger = new Logger(UserRepository.name)

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async create(data: Partial<User>): Promise<UserDocument> {
        this.logger.log(`Creating user: ${data.email}`)
        const user = new this.userModel(data)
        return user.save()
    }

    async findAll(): Promise<UserDocument[]> {
        this.logger.log('Fetching all users')
        return this.userModel.find().select('-password').exec()
    }

    async findByName(name: string): Promise<UserDocument | null> {
        this.logger.log(`Finding user by name: ${name}`)
        return this.userModel.findOne({ name }).exec()
    }

    async findById(id: string): Promise<UserDocument | null> {
        this.logger.log(`Finding user by id: ${id}`)
        return this.userModel.findById(id).exec()
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
        this.logger.log(`Finding user by email: ${email}`)
        return this.userModel.findOne({ email }).exec()
    }

    async update(id: string, data: Omit<User, 'id'>): Promise<UserDocument | null> {
        this.logger.log(`Updating user: ${id}`)
        return this.userModel.findByIdAndUpdate(id, data, { new: true }).exec()
    }

    async removeByEmail(email: string): Promise<UserDocument | null> {
        this.logger.log(`Deleting user: ${email}`)
        return this.userModel.findOneAndDelete({ email }).exec()
    }

    async removeByName(name: string): Promise<UserDocument | null> {
        this.logger.log(`Deleting user: ${name}`)
        return this.userModel.findOneAndDelete({ name }).exec()
    }

}

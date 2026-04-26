import { Exclude, Expose } from "class-transformer";
import { UserRole } from "../enums/user-role.enum";


export class ResponseUserDto {

    @Expose()
    _id: string

    @Expose()
    id: string

    @Expose()
    name: string

    @Expose()
    email: string

    @Expose()
    role: UserRole

    @Expose()
    isActive: boolean

    @Expose()
    createdAt: Date

    @Exclude()
    password: string

    constructor(partial: Partial<ResponseUserDto>) {
        Object.assign(this, partial)
    }

}
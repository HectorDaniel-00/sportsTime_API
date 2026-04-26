import { IsEmail, IsLowercase, IsNotEmpty, IsString, IsStrongPassword, Length, Matches } from "class-validator"
import { UserRole } from "../enums/user-role.enum"

export class CreateUserDto {

    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name must be a string' })
    name: string

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Email must be a valid email address' })
    @Matches(/\.com$/, { message: 'The email address must end in .com.' })
    @IsLowercase({
        message: 'The email must be written entirely in lowercase letters.',
    })
    email: string

    @IsStrongPassword()
    @IsNotEmpty({ message: 'password is required' })
    @Length(6, 15, { message: 'Password must be between 6 and 15 characters' })
    @Matches(/(?=.*[a-z])/, {
        message: 'The password must contain at least one lowercase letter.',
    })
    @Matches(/(?=.*[A-Z])/, {
        message: 'The password must contain at least one uppercase letter.',
    })
    @Matches(/(?=.*\d)/, {
        message: 'The password must contain at least one number.',
    })
    password: string

}



export class CreateUserAdminDto extends CreateUserDto {
    role: UserRole
}

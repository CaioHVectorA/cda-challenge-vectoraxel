import { IsStrongPassword, IsEmail } from "class-validator";

export class CreateUserDto {
    @IsEmail({  }, { message: 'Insira um email válido!' })
    email: string
    @IsStrongPassword({ minLength: 6 }, { message: 'Insira uma senha com pelo menos seis caracteres' })
    password: string
}
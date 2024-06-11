export class CreateUserDto {
    readonly email: string;
    readonly password: string;
}

export class EditUserData {
    readonly user_picture: string | null;
    readonly user_name: string | null;
}
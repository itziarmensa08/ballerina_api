import { Role, Level, Language, WeekDay, ParentInfo, Schedule, ImageRights, BancInfo } from "../interfaces/user.interface";

export interface CreateUserDTO {
    username: string;
    email: string;
    password: string;
    name: string;
    surname: string;
    roles?: Role[];
    telephone?: string;
    dni?: string;
    catSalut?: string;
    dateBorn?: Date;
    profileImage?: string;
    address?: string;
    illness?: string;
    level?: Level;
    schedule?: Schedule[];
    parents?: ParentInfo[];
    imageRights?: ImageRights;
    language?: Language;
    bancInfo?: BancInfo;
    notifications: boolean;
}

export interface UpdateUserDTO {
    name?: string;
    surname?: string;
    email?: string;
    telephone?: string;
    dni?: string;
    catSalut?: string;
    dateBorn?: Date;
    profileImage?: string;
    address?: string;
    illness?: string;
    level?: Level;
    schedule?: Schedule[];
    parents?: ParentInfo[];
    imageRights?: ImageRights;
    language?: Language;
    bancInfo?: BancInfo;
    notifications?: boolean;
}

export interface LoginDTO {
    username: string;
    password: string;
}
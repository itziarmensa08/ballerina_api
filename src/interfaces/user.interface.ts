import { Auth } from "./auth.interface";

export interface User extends Auth {
    name: string;
    surname: string;
    email: string;
    roles: Role[];
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
    language: Language;
    bancInfo?: BancInfo; 
    notifications: Boolean;
}

export interface ParentInfo {
    name: string;
    surname: string;
    telephone?: string;
}

export interface BancInfo {
    iban: string;
    titularity: string;
}

export interface Schedule {
    day: WeekDay;
    startTime: string;
    endTime: string;
}

export interface ImageRights {
    authorizing_tutor: {
        name: string;
        dni: string
    };
    authorized: boolean;
}

export type Role = 'admin' | 'user' | 'gimnast' | 'coach';
export type Level = 'base' | 'escolar' | 'federat';
export type Language = 'ca' | 'es' | 'en';
export type WeekDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

// Extend the User interface to add a password comparison method
export interface IUser extends User, Document {
    comparePassword: (password: string) => Promise<boolean>;
}
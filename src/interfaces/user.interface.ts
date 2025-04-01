import { Auth } from "./auth.interface";

export interface User extends Auth {
    name: string;
    surname: string;
    email: string;
    role: Role;
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
}

interface ParentInfo {
    name: string;
    surname: string;
    telephone?: string;
    email?: string;
    relation: ParentRelation;
    iban: string;
    iban_titularity: string;
}

interface Schedule {
    day: WeekDay;
    startTime: string;
    endTime: string;
}

interface ImageRights {
    authorizing_tutor: {
        name: string;
        dni: string
    };
    authorized: boolean;
}

export type Role = 'admin' | 'user' | 'gimnast';
export type ParentRelation = 'mother' | 'father' | 'tutor' | 'other';
export type Level = 'base' | 'escolar' | 'federat';
export type Language = 'ca' | 'es' | 'en_US';
export type WeekDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

// Extend the User interface to add a password comparison method
export interface IUser extends User, Document {
    comparePassword: (password: string) => Promise<boolean>;
}
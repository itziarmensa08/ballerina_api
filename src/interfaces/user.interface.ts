import { Auth } from "./auth.interface";

export interface User extends Auth {
    name: string;
    surname: string;
    email: string;
    role: 'admin' | 'user';
    telephone?: string;
    dateBorn?: Date;
    profileImage?: string;
    language: 'ca' | 'es' | 'en_US';
}

// Extend the User interface to add a password comparison method
export interface IUser extends User, Document {
    comparePassword: (password: string) => Promise<boolean>;
}
import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { IUser, Language } from "../interfaces/user.interface";

const ParentInfoSchema = new Schema(
    {
        name: { type: String },
        surname: { type: String },
        telephone: { type: String }
    },
    { _id: false }
);

const BancInfoSchema = new Schema(
    {
        iban: { type: String, required: true },
        titularity: { type: String }
    },
    { _id: false }
);

const ScheduleSchema = new Schema(
    {
        day: { type: String, enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'], required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true }
    },
    { _id: false }
);

const ImageRightsSchema = new Schema(
    {
        authorizing_tutor: {
            name: { type: String, required: true },
            dni: { type: String, required: true }
        },
        authorized: { type: Boolean, required: true }
    },
    { _id: false }
);

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        surname: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        validated: { type: Boolean, default: false, required: true },
        roles: [{ type: String, enum: ["admin", "user", "gimnast", "coach"], default: [], required: true }],
        telephone: { type: String },
        dni: { type: String },
        catSalut: { type: String },
        dateBorn: { type: Date },
        address: { type: String },
        illness: { type: String },
        level: { type: String, enum: ["base", "escolar", "federat"] },
        profileImage: { type: String },
        schedule: [ScheduleSchema],
        parents: [ParentInfoSchema],
        imageRights: ImageRightsSchema,
        bancInfo: BancInfoSchema,
        language: { type: String, enum: ["ca", "es", "en"], default: "es", required: true },
        notifications: { type: Boolean, default: true, required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

// Hash the password before saving a new user or updating the password
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error: any) {
        next(error);
    }
});

// Method to compare passwords during login
UserSchema.methods.comparePassword = function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

const UserModel = model<IUser>("users", UserSchema);

export default UserModel;
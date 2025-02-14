import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../interfaces/user.interface";

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        surname: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        validated: { type: Boolean, default: false, required: true },
        role: { type: String, enum: ["admin", "user"], default: "user", required: true },
        telephone: { type: Number },
        dateBorn: { type: Date },
        profileImage: { type: String },
        language: { type: String, enum: ["ca", "es", "en_US"], default: "es", required: true }
    },
    {
        timestamps: true,
        versionKey: false,
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
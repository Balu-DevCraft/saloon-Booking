import { HydratedDocument, Types } from 'mongoose';
export declare enum UserType {
    ROOT = "root",
    ADMIN = "admin",
    USER = "user",
    EMPLOYEE = "employee"
}
export type UserDocument = HydratedDocument<User>;
export declare class User {
    _id: string;
    email: string;
    name: string;
    avatarUrl?: string;
    password?: string;
    isActive: boolean;
    userType: UserType;
    saloonId?: Types.ObjectId;
    employeeId?: string;
    otp?: string;
    lastActiveAt: Date;
    notificationCount: number;
    refreshToken?: string;
    createdBy?: Types.ObjectId;
    ownedBy?: Types.ObjectId;
    updatedBy?: Types.ObjectId;
    firebaseToken?: string;
    isDeleted: boolean;
    specialization: string[];
    workHistory: string;
    openingTimes: string;
    image: string;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, import("mongoose").Document<unknown, any, User, any> & User & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<User>, {}> & import("mongoose").FlatRecord<User> & Required<{
    _id: string;
}> & {
    __v: number;
}>;

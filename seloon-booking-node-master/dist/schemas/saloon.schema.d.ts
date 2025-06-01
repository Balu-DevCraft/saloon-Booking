import { Document, Types } from 'mongoose';
export declare class Saloon extends Document {
    name: string;
    city: string;
    place: string;
    latitude: string;
    longitude: string;
    owner: Types.ObjectId;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const SaloonSchema: import("mongoose").Schema<Saloon, import("mongoose").Model<Saloon, any, any, any, Document<unknown, any, Saloon, any> & Saloon & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Saloon, Document<unknown, {}, import("mongoose").FlatRecord<Saloon>, {}> & import("mongoose").FlatRecord<Saloon> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;

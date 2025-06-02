import { Document, Schema as MongooseSchema } from 'mongoose';
export declare class Saloon extends Document {
    name: string;
    ownerName: string;
    email: string;
    city: string;
    place: string;
    status: string;
    employees: MongooseSchema.Types.ObjectId[];
    services: {
        name: string;
        price: number;
        duration: number;
        description?: string;
    }[];
    openingTime: string;
    closingTime: string;
    ratings: {
        userId: MongooseSchema.Types.ObjectId;
        rating: number;
        review: string;
        date: Date;
    }[];
    averageRating: number;
}
export declare const SaloonSchema: MongooseSchema<Saloon, import("mongoose").Model<Saloon, any, any, any, Document<unknown, any, Saloon, any> & Saloon & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Saloon, Document<unknown, {}, import("mongoose").FlatRecord<Saloon>, {}> & import("mongoose").FlatRecord<Saloon> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;

import { Document, Types } from 'mongoose';
export declare class Review extends Document {
    userId: Types.ObjectId;
    saloonId: Types.ObjectId;
    stylistId: Types.ObjectId;
    bookingId: Types.ObjectId;
    rating: number;
    comment: string;
    stylistRating: number;
    stylistComment: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const ReviewSchema: import("mongoose").Schema<Review, import("mongoose").Model<Review, any, any, any, Document<unknown, any, Review, any> & Review & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Review, Document<unknown, {}, import("mongoose").FlatRecord<Review>, {}> & import("mongoose").FlatRecord<Review> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;

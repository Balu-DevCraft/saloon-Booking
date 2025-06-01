import { Document, Types } from 'mongoose';
export declare class Booking extends Document {
    userId: Types.ObjectId;
    saloonId: Types.ObjectId;
    employeeId: Types.ObjectId;
    bookingDate: Date;
    bookingStatus: string;
    name: string;
    phoneNumber: string;
    email: string;
    service: string;
    notes: string;
    updatedBy?: Types.ObjectId;
}
export declare const BookingSchema: import("mongoose").Schema<Booking, import("mongoose").Model<Booking, any, any, any, Document<unknown, any, Booking, any> & Booking & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Booking, Document<unknown, {}, import("mongoose").FlatRecord<Booking>, {}> & import("mongoose").FlatRecord<Booking> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;

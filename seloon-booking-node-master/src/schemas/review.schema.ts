import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Review extends Document {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Saloon', required: true })
    saloonId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    stylistId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Booking', required: true })
    bookingId: Types.ObjectId;

    @Prop({ type: Number, required: true, min: 1, max: 5 })
    rating: number;

    @Prop({ type: String, required: true })
    comment: string;

    @Prop({ type: Number, required: true, min: 1, max: 5 })
    stylistRating: number;

    @Prop({ type: String, required: true })
    stylistComment: string;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;

    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review); 
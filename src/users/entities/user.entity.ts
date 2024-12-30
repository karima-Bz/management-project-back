import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum Role {
  ADMIN= "ADMIN",
  USER= "USER",
  SUPERUSER= "SUPERUSER"
}

registerEnumType(Role, {name: 'UserRole'})

@Schema({ versionKey: false, timestamps: true })
@ObjectType({ description: 'User model' })
export class User {
  @Prop({ type: MongooseSchema.Types.ObjectId, auto: true, required: true })
  _id!: string;

  @Field(() => ID, { description: 'User ID' })
  id!: string;

  @Prop({ type: String, required: true, trim: true, unique: true })
  @Field(() => String, { description: 'User email' })
  email!: string;

  @Prop({ type: String, required: true, trim: true })
  @Field(() => String, { description: 'User name' })
  name!: string;

  @Prop({ type: String, required: true, trim: true })
  @Field(() => String, { description: 'User password' })
  password!: string;

  @Prop({ type: String, enum:Role, required: true, trim: true, default: 'USER' })
  @Field(() => Role, { description: 'User role' })
  role!: Role;

  @Prop({ type: Date, default: Date.now })
  @Field(() => Date, { nullable: true, description: 'User created date' })
  createdAt?: Date;

  @Prop({ type: Date, default: Date.now })
  @Field(() => Date, { nullable: true, description: 'User updated date' })
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

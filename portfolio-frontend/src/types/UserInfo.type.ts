import { UserEntity } from "../../../typeorm/src/entities/nextAuth.entity";

export type UserInfoType = Pick<
  UserEntity,
  "firstName" | "lastName" | "slug" | "about" | "imageMax" | "shortInfo" | "experience"
>;

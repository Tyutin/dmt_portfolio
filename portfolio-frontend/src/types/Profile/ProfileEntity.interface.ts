import { ProfileType } from "./profileType";

export interface ProfileEntityInterface {
  id: number;
  registerAt: Date;
  status: ProfileType;
  firstName: string
  lastName?: string
  shortInfo?: string
  about?: string
  experience?: string
  slug?: string
}
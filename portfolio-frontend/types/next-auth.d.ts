import NextAuth, { DefaultSession, User } from "next-auth";
import "next-auth/adapters";
import { UserEntity } from "../../typeorm/src/entities/nextAuth.entity";

declare module "next-auth/adapters" {
  interface AdapterUser extends User {
    id: string;
    email: string;
    emailVerified: Date | null;
    isAdmin: boolean;
    isBanned: boolean;
  }
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      isAdmin: boolean;
      isBanned: boolean;
      isHidden: boolean;
    } & DefaultSession["user"];
  }
}

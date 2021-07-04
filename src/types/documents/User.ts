import { CoreDocument } from "types/documents";
import { ImageDocument } from "./assets";

export interface SessionUser {
  id: string,
  collection: "users",
  ref: FaunaRef | Expr,
  roles: string[];
  isLoggedIn: boolean;
}


/**
 * The user object for the user's core data for use with NextAuth
 */
export interface UserDocument extends CoreDocument {
  username?: string;
  email?: string;
  displayName?: string;
  icon?: ImageDocument;

  roles?: string[];

  recentPlayers?: UserDocument[];

  badges?: {
    earnedAt?: Date;
    badge: any;
  }[];
  bio?: string;
  enjoysPlaying?: string[];
  activelySeeking?: string[];
  isPrivate?: boolean;

  hoursPlayed?: number;
}

import "next-auth";
import { LoginUserType } from "./auth.types";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: LoginUserType;
  }

  interface User extends LoginUserType {
    access_token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    user?: LoginUserType;
  }
}

declare module "@tanstack/react-table" {
  interface FilterFns {
    multiSelectFilter: FilterFn<unknown>;
  }
}

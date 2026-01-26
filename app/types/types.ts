import { ReactNode } from "react";

export type User = {
  email: string;
  password: string;
}

export type UserSession = {
    email: string;
  password: string;
  profilePic: string;
  username: string;
}

export type UserBoxProps = {
  icon: ReactNode,
  name: string,
  value: number,
  color: string

}

export interface Pagination {
  current_page: number;
  from: number;
  has_more_pages: boolean;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

import { JwtPayload } from "jwt-decode";
export interface JwtUserPayload extends JwtPayload {
  id: string;
  email: string;
  name: string;
}

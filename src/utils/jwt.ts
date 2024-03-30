import jwt from "jsonwebtoken";
import config from "../config/index";

interface JwtPayload {
  id: number;
  firstname: string;
  email: string;
}

export const signJwt = (payload: JwtPayload) => {
  try {
    if (!config.JWTKEY) {
      throw new Error("JWT key is not defined in the configuration");
    }
    return jwt.sign(payload, config.JWTKEY, { expiresIn: "365d" });
  } catch (error) {
    throw error;
  }
};



export const verifyJwt = async (req: any) => {
  try {
    if (!config.JWTKEY) {
      throw new Error("JWT key is not defined in the configuration");
    }

    const token = req.get("Authorization")?.split(" ")[1];
    if (!token) {
      throw new Error("Token not provided");
    }
    const payload = jwt.verify(token, config.JWTKEY) as JwtPayload;
    req.user = payload;
    return true;
  } catch (error) {
    throw new Error("Invalid Token");
  }
};
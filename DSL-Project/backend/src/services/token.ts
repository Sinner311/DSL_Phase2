import { users_role } from "@prisma/client";
import jwt from 'jsonwebtoken';

export async function genToken(payload:{email:string,role:users_role}) {
    const access_token = jwt.sign(payload,process.env.ACCESS_SECRET!, { expiresIn: '1d' , algorithm: "HS256"},);
    const refresh_token = jwt.sign(payload,process.env.REFRESH_SECRET!, { expiresIn: '1d' , algorithm: "HS256"},);
    return {access_token ,refresh_token};
}
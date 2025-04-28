import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../prismaSingleton";
export async function userAuthorization(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const accessToken =
      req.cookies.accessToken || req.headers["authorization"]?.split(" ")[1];

    console.log("userauth check");
    console.log("accessToken", accessToken, typeof accessToken);
    if (!accessToken) {
      throw new Error("please signin");
    }

    const verifiedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET!
    ) as JwtPayload;
    // console.log(verifiedToken);
    const currentTime = Date.now() / 1000;
    if (verifiedToken.exp! < currentTime) {
      throw new Error("please signin");
    }
    console.log("verifiedToken", verifiedToken);
    const user = await prisma.user.findUnique({
      where: {
        userId: verifiedToken.userId,
      },
      select: {
        userId: true,
        email: true,
      },
    });
    if (!user) {
      throw new Error("user not found");
    }
    req.user = {
      userId: user.userId,
      email: user.email,
    };
    next();
  } catch (error: any) {
    res.status(403).json({ message: error.message, error: error });
    return;
  }
}

import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../prismaSingleton";

// Middleware to check if the user is logged in
export async function userAuthorization(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Gets the access token from cookies or headers
    const accessToken =
      req.cookies.accessToken || req.headers["authorization"]?.split(" ")[1];

    // If the access token is not present, throw an error
    if (!accessToken) {
      throw new Error("please signin");
    }
    // verify the access token
    const verifiedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET!
    ) as JwtPayload;
    // console.log(verifiedToken);
    const currentTime = Date.now() / 1000;
    if (verifiedToken.exp! < currentTime) {
      throw new Error("please signin");
    }
    // Check if the user exists in the database
    // If the user does not exist, throw an error
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
    // Attach user information to the request object
    // This will be available in the next middleware or route handler
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

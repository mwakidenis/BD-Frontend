"use server";

import { jwtDecode } from "jwt-decode";

export const isTokenExpired = async (token: string): Promise<boolean> => {
  if (!token) return true;

  try {
    const decoded: { exp: number } = jwtDecode(token);

    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    console.error(error);
    return true;
  }
};

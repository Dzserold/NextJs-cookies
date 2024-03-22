"use server";
import { getIronSession } from "iron-session";
import {
  SessionData,
  defaultSession,
  sessionOptions,
} from "./lib";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const username = "John";
const isPro = true;

export const getSession = async () => {
  const session = await getIronSession<SessionData>(
    cookies(),
    sessionOptions
  );

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return session;
};

export const login = async (formData: FormData) => {
  const session = await getSession();

  const formUser = formData.get("username");
  const formPassword = formData.get("password");

  if (formUser !== username) {
    return { error: "Invalid username" };
  }

  session.userId = "1";
  session.username = username;
  session.isPro = isPro;
  session.isLoggedIn = true;

  await session.save();
  redirect("/");
};

export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/");
};

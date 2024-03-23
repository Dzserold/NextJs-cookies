"use server";
import { getIronSession } from "iron-session";
import {
  SessionData,
  defaultSession,
  sessionOptions,
} from "./lib";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

let username = "John";
let isPro = true;
let isBlocked = false;

export const getSession = async () => {
  const session = await getIronSession<SessionData>(
    cookies(),
    sessionOptions
  );

  session.isBlocked = isBlocked;
  session.isPro = isPro;

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return session;
};

export const login = async (
  prevState: { error: undefined | string },
  formData: FormData
) => {
  const session = await getSession();

  const formUser = formData.get("username");
  const formPassword = formData.get("password");

  if (formUser !== username) {
    return { error: "Invalid credentials" };
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

export const changePremium = async () => {
  const session = await getSession();
  isPro = !session.isPro;

  session.isPro = isPro;
  await session.save();
  revalidatePath("/profile");
};

export const changeUsername = async (formData: FormData) => {
  const session = await getSession();
  const newUsername = formData.get("username") as string;

  username = newUsername;
  session.username = username;
  await session.save();
  revalidatePath("/profile");
};

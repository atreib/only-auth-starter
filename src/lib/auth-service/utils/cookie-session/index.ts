import "server-only";

import type { Session } from "./types";
import { cookies } from "next/headers";
import * as encryption from "./encryption";

const SESSION_TOKEN_COOKIE_NAME = "session";

export async function createSession(session: Session) {
  const cookieStore = await cookies();
  const token = encryption.generateToken(session);
  cookieStore.set(SESSION_TOKEN_COOKIE_NAME, token);
}

export async function getSession(): Promise<Session | undefined> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_TOKEN_COOKIE_NAME);
  if (!token?.value) return undefined;
  const session = encryption.validateToken(token.value);
  if (!session) return undefined;
  return session;
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_TOKEN_COOKIE_NAME);
}

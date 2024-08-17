import { NextRequest } from "next/server";
import { updateSession } from "./app/util/auth.util";


export async function middleware(request: NextRequest) {
  return await updateSession(request);
}
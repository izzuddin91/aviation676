import { NextRequest } from "next/server";
import { updateSession } from "./app/util/auth.util";


export async function middleware(request: NextRequest) {
    console.log('reload')
    console.log(request)
  return await updateSession(request);
}
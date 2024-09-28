"use client";

import { SideMenu } from "@/app/component/side-menu";
import { isAuthAuthorized, getUserAuth, getSession } from "@/app/util/auth.util";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"
 
export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(true);
    var [name, updateName] = useState('')

    useEffect(() => {
        authCheck();
      }, []);

    async function authCheck() {
      const session = await getSession();
      console.log('check session ')
      console.log(session)
        const authorized: boolean = isAuthAuthorized();
        // console.log('authorized is ' + authorized)
        if (authorized) {
          setIsAuthorized(true);
          updateName(getUserAuth()) 
          name = getUserAuth();
        } else {
          router.push('/login')
          setIsAuthorized(false);
        }
        
      }
    
      if (isAuthorized){
        return (
          <html lang="en">
          <head>
            <title>I.Z Properties</title>
        
            <meta name="theme-color" content="#000" />
          </head>
          <body suppressHydrationWarning={true}>
          <section className="flex min-h-screen flex-col items-left bg-gray-50">
          <div className="hidden md:block">
          <div className="grid grid-cols-12 gap-1 text-left">
                <div className="col-span-2 justify-self-stretch">
                  <SideMenu />
                </div>
                <div id="plate" style={{"height": "900px"}} className="col-start-2 col-end-13 bg-white p-3 my-3 ml-2 mr-3 rounded border shadow-sm">
                  <hr className="h-px my-2 bg-gray-400 border-0 " />
                  <h1>{children}</h1>
                </div>
              </div>
          </div>
          <div className="md:hidden">
          <div className=" gap-1 text-left">
                <div className="col-span-2 justify-self-stretch">
                  <SideMenu />
                </div>
                <div id="plate" className="col-start-2 col-end-13 bg-white p-3 my-3 ml-2 mr-3 rounded border shadow-sm">
                  <hr className="h-px my-2 bg-gray-400 border-0 " />
                  <h1>{children}</h1>
                </div>
              </div>
          </div>

            </section>
          </body>
        </html>
        )
      }
      if (!isAuthorized) {
        return (
          <html lang="en">
            <body>
              <section >
              {children}
              </section>
            </body>
          </html>
    
        );
      }
  }

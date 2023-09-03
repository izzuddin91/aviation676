"use client";

import React from "react";
import { Dropdown, Navbar, Avatar } from "flowbite-react";
import { getAuth, signOut } from "firebase/auth";
import { clearAuth, getUserAuth } from "../util/auth.util";


function signOutAndRedirect (){
  // const router = useRouter();
  // console.log('logout')
  clearAuth()
  // router.push("/login");
  window.location.reload()
}

type HeaderProps = {

  name: string;
  roleCode: string;

};

export const Header = ({
  name,
}: HeaderProps) => {
  function getNameInitials(name: string): string {
    return name.match(/\b\w/g)?.join("") ?? "";
  }

  return (
    <Navbar
      fluid
      theme={{
        base: "bg-gray-300 px-2 py-2.5 border-b shadow-sm border-gray-200",
      }}
    >
      <Navbar.Brand
        href="https://flowbite-react.com"
        className="flex flex-wrap gap-2"
      >
        <Avatar img="/backoffice/icon-192x192.png" />
        <span className="self-center whitespace-nowrap text-xl font-semibold text-gray-800 g">
          Izzuddin Properties
        </span>
      </Navbar.Brand>

      <div className="flex md:order-2">
        <Dropdown
          inline
          label={
            <Avatar
              placeholderInitials={'name'}
              bordered
              color="gray"
            >
              <div className="space-y-1 font-medium text-gray-800 text-left">
                <div>
              
                </div>
                <div className="text-sm text-gray-500">
                 
                  <strong>
                  </strong>
                </div>
              </div>
            </Avatar>
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">System Admin</span>
            <span className="block truncate text-sm font-medium">
              {'name'}
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={signOutAndRedirect} >Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
};

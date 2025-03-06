import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { auth } from "@/auth";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { handleLogout } from "@/actions/auth";

const Navbar = async () => {
  const session = await auth();

  const initialLetter = session?.user?.name?.[0]?.toUpperCase() ?? "";
  return (
    <div className="fixed top-0 left-0 w-full z-50 shadow-xl h-[52px]">
      <div className="flex justify-between items-center w-full py-3 px-8 bg-primary-700 text-white">
        <div className="flex items-center gap-4 md:gap-6 ">
          <Link
            href="/dashboard"
            className="cursor-pointer hover:!text-primary-300 "
            scroll={false}
          >
            <div className="flex items-center gap-3">
              <div className="text-xl font-bold">
                VIRTUAL
                <span className="text-secondary-500 font-light hover:text-primary-300">
                  TRYON
                </span>
              </div>
            </div>
          </Link>
        </div>
        <p className="text-primary-200 hidden md:block">
          Discover your perfect outfit with our advanced virtual try-on
          <search></search>
        </p>
        {session?.user?.id ? (
          <div className="flex gap-3">
            <Avatar className="bg-secondary-600 flex items-center justify-center h-9 w-9 ring-2 ring-white/20 hover:ring-white/40 transition-all duration-200 cursor-pointer">
              <AvatarImage
                src={session?.user?.image || ""}
                alt={`${session?.user?.name || "User"}'s profile picture`}
                className="object-cover"
              />
              <AvatarFallback className=" text-white font-medium flex items-center justify-center">
                {initialLetter}
              </AvatarFallback>
            </Avatar>

            <Button
              onClick={handleLogout}
              variant="secondary"
              className="text-white bg-secondary-600 hover:bg-white hover:text-primary-700 rounded-lg"
            >
              LogOut
            </Button>
          </div>
        ) : (
          // <p>{session.user.email}</p>
          <>
            <div className="flex items-center gap-5">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="text-white border-white bg-transparent hover:bg-white hover:text-primary-700 rounded-lg"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  variant="secondary"
                  className="text-white bg-secondary-600 hover:bg-white hover:text-primary-700 rounded-lg"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

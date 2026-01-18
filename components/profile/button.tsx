"use client";

import { logOutAction } from "@/util/server-action";

export const LogOutButton = () => {
  const handleLogout = async () => {
    logOutAction();
  };
  return (
    <button className="text-profile-text text-16-26-500" onClick={handleLogout}>
      Log Out
    </button>
  );
};

'use client';

import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
       <UserButton>
        <UserButton.MenuItems>
          <UserButton.Action label="signOut" />
        </UserButton.MenuItems>
      </UserButton>

      <ModeToggle />
    </div>
  )
}

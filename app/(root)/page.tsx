
import { SignedIn, UserButton, SignedOut } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <p>belum login</p>
      </SignedOut>
    </div>
  );
}

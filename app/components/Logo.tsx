import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/FPLTurboIcon.png"
        width={50}
        height={50}
        alt="FPL Turbo Logo"
      />
    </Link>
  );
};

export default Logo;

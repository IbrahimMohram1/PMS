import React from "react";
import { Card } from "flowbite-react";
import { Button } from "flowbite-react";
import { Footer, FooterCopyright, FooterLink, FooterLinkGroup } from "flowbite-react";

export default function Login() {
  return (
    <div>
      <h2 className="bg-amber-400 text-white text-3xl">login</h2>
          <Card href="#" className="max-w-sm">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Noteworthy technology acquisitions 2021
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
      </p>
    </Card>
    <Button color="purple">Default</Button>
    <Footer container>
      <FooterCopyright href="#" by="Flowbite™" year={2022} />
      <FooterLinkGroup>
        <FooterLink href="#">About</FooterLink>
        <FooterLink href="#">Privacy Policy</FooterLink>
        <FooterLink href="#">Licensing</FooterLink>
        <FooterLink href="#">Contact</FooterLink>
      </FooterLinkGroup>
    </Footer>
    </div>
  );
}

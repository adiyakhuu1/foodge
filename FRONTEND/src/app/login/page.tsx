"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [nextStep, setStep] = useState<boolean>(false);
  const isValidStep1 = () => {
    let isValid = true;
    let checkEmail = /^[a-zA-Z0-9.-_]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
    if (!checkEmail.test(email)) {
      isValid = false;
    }
    console.log(isValid);
    return isValid;
  };
  return (
    <div className="flex items-center min-h-screen w-full justify-around">
      <div className="w-6/12 justify-items-center">
        <div className="w-4/5 flex flex-col gap-4">
          <div>
            <Button>
              <ArrowLeftIcon />
            </Button>
          </div>
          <div className="h-15">
            <h1 className="font-bold text-xl text-foreground">
              Create your account
            </h1>
            <p className="text-muted-foreground text-base">
              Sign up to explore your favorite dishes.
            </p>
          </div>
          <div>
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your email address"
              type="email"
            />
          </div>
          <div className="text-red-600 text-sm">
            {!isValidStep1() &&
              `Invalid email. Use a format like example@email.com`}
          </div>
          <div>
            <Link
              onClick={(e) => {
                if (isValidStep1()) {
                  setStep(true);
                } else {
                  setStep(false);
                }
                if (!nextStep) {
                  e.preventDefault();
                }
              }}
              href={`login?page=2`}>
              <Button
                disabled={!isValidStep1()}
                className={`w-full ${
                  !isValidStep1()
                    ? `bg-muted-foreground cursor-not-allowed text-foreground`
                    : ``
                }`}>
                Let's go
              </Button>
            </Link>
          </div>
          <div className="flex justify-center gap-4">
            <p className="text-muted-foreground">Already have an account?</p>
            <Link href={`/login`} className="text-blue-500">
              Log in
            </Link>
          </div>
        </div>
      </div>
      <div className="min-h-screen w-full overflow-hidden content-center box-border justify-items-center">
        <Image
          src={`/img/deliver.jpg`}
          alt="deliver"
          width={1000}
          height={1000}
          objectFit="cover"
        />
      </div>
    </div>
  );
}

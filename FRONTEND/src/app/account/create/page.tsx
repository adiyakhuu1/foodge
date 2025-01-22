"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  // const page = await props.params.page;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nextStep, setStep] = useState<boolean>(false);
  let errors = {
    mail: "",
    password: "",
  };
  const isValidStep1 = () => {
    let isValid = true;
    let checkEmail = /^[a-zA-Z0-9.-_]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
    if (!checkEmail.test(email)) {
      isValid = false;
      errors.mail = `Enter valid email`;
    }
    console.log(isValid);
    return isValid;
  };
  const isValidStep2 = () => {
    let isValid = true;
    // let checkpassword = /^[a-zA-Z0-9.-_]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
    if (password.length <= 7) {
      isValid = false;
      errors.password = `??`;
    }
    console.log(isValid);
    return isValid;
  };
  console.log(page);

  if (!page) {
    return (
      <div className="w-4/5 flex flex-col gap-4">
        <div>
          <Link href={`/login`}>
            <Button>
              <ArrowLeftIcon />
            </Button>
          </Link>
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
          {!isValidStep1() && errors.mail}
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
          <Link href={`/account/login`} className="text-blue-500">
            Log in
          </Link>
        </div>
      </div>
    );
  }
  return (
    page === "2" && (
      <div className="w-4/5 flex flex-col gap-4">
        <div>
          <Button>
            <ArrowLeftIcon />
          </Button>
        </div>
        <div className="h-15">
          <h1 className="font-bold text-xl text-foreground">
            Create your password
          </h1>
          <p className="text-muted-foreground text-base">
            Create your password
          </p>
        </div>
        <div>
          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            placeholder="Enter your password"
            type="password"
          />
        </div>
        <div className="text-red-600 text-sm">
          {!isValidStep2() && errors.password}
        </div>
        <div>
          <Link href={`/login?page=2`}>
            <Button
              disabled={!isValidStep2()}
              className={`w-full ${
                !isValidStep2()
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
    )
  );
}

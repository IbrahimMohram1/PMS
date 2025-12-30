import React from "react";

import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="mx-auto  w-3/4">
      <h6 className=" text-white  ">Welcome to PMS</h6>

      <h2 className=" text-amber-300 text-capitalize text-3xl ">login</h2>

      <form className="flex   flex-col gap-4 justify-center items-center my-5">
        <div className="  flex gap-y-3 flex-col w-full ">
          <div>
            <TextInput
              id="email2"
              type="email"
              placeholder="name@flowbite.com"
            />
          </div>
          <div>
            <TextInput id="password2" type="password" />
          </div>
          <div>
            <TextInput id="repeat-password" type="password" />
          </div>
        </div>
        <div className="flex justify-between w-full text-white ">
          <Link>Register Now ?</Link>
          <Link>Forget Password ?</Link>
        </div>
        <Button className="mx-auto my-3  " type="submit">
          Register new account
        </Button>
      </form>
    </div>
  );
}

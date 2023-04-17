// import Loader from "@/components/Loader";
import useAuth from "@/hooks/useAuth";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
interface Inputs {
  email: string;
  password: string;
}

const Login = () => {
  const [login, setLogin] = useState(false);
  const { signIn, signUp, user, error, setError, signInWithGoogle } = useAuth();

  const router = useRouter();

  const callbackUrl = (router.query?.callbackUrl as string) ?? "/";
  useEffect(() => {
    setTimeout(() => {
      setError(null);
    }, 3000);
  }, [error]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  if (user) {
    router.push(callbackUrl);
    return "Loading...";
  }

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
  };

  return (
    <div className="relative max-w-sm md:max-w-none flex flex-col h-screen w-screen bg-bgOffWhite md:items-center md:justify- md:bg-transparent ">
      <Head>
        <title>Marshop</title>
        <meta name="description" content="Marshop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-center w-full items-center relative shadow-xl py-5">
        <ArrowLeftIcon
          className="icon absolute left-5 "
          onClick={() => router.back()}
        />
        <Image
          src={"/assets/marshop.png"}
          height={55}
          width={84}
          loading="lazy"
          alt=""
          className="left-4 h-auto w-auto top-4 object-contain md:left-10 md:top-6"
        />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative   mt-24 space-y-8 rounded  py-10 px-6 md:mt-0 md:max-w-md md:px-14 "
      >
        <h1 className="text-2xl text-center font-semibold">Sign In</h1>
        <div className="space-y-4">
          {error && (
            <span className="flex p-1 text-md  font-light text-orange-500 transition duration-300">
              {error}
            </span>
          )}
          <label className="max-w-sm">
            <input
              type="email"
              placeholder="Email"
              className="form-input"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="p-1 text-[13px] font-light text-red-500">
                Please enter a valid email
              </span>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="Password"
              className="form-input"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="p-1 text-[13px] font-light text-red-600">
                {" "}
                {(errors && errors.password.message) ||
                  "Password is required"}{" "}
              </span>
            )}
          </label>
        </div>
        <button
          type="submit"
          className="w-full rounded-sm bg-pink py-3 font-semibold"
          onClick={() => setLogin(true)}
        >
          Sign In
        </button>
        <div className="flex text-[gray]">
          <p>New to Marshop?</p>
          <button
            className="text-pink ml-2 font-semibold hover:underline"
            onClick={() => setLogin(false)}
          >
            Sign up now
          </button>
        </div>
      </form>
      <div className="flex px-6 max-w-sm w-full">
        <button
          className="flex items-center justify-center outline outline-1  outline-[gray]/50 py-2 rounded-sm relative w-full hover:bg-[gray]/10"
          onClick={signInWithGoogle}
        >
          <FcGoogle className="absolute left-4" />
          Log In with Google
        </button>
      </div>
    </div>
  );
};

export default Login;

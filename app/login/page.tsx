"use client";
import { Alert } from "flowbite-react";
import firebase from "./../clientApp";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useState } from "react";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PrimaryTextInputWithLabel } from "./../component/input/PrimaryTextInputWithLabel";
import { HiUser, HiKey, HiInformationCircle } from "react-icons/hi";
import { PrimaryButton } from "./../component/button/PrimaryButton";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { initializeApp, getApps } from "firebase/app";
// import { setAuth } from "../util/auth.util";
import Swal from "sweetalert2";
import { setAuth } from "../util/auth.util";

// // Initialize Firebase
const auth = getAuth(firebase.app());

type FormData = {
  email: string;
  password: string;
  isLocalAccount: boolean;
};
const formSchema = yup
  .object({
    email: yup.string().required("PF Number is required"),
    password: yup.string().required("Password is required"),
    isLocalAccount: yup.boolean().default(false),
  })
  .required();

export default function Home() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(formSchema),
  });

  const [message, setMessage] = useState("");

  const onSubmit: SubmitHandler<FormData> = async (data) => {

      firebase
      .auth()
      // test acc -> ("asd@email.com", "test123")
      .signInWithEmailAndPassword(data.email, data.password)
      .then(async (value) => {
        console.log(value)
        if (value.user) {
          setAuth(data.email, data.password);
          router.push("/dashboard");
        }
      }).catch((err)=> {
        console.log('not found')
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href="">Either your email or password is wrong.</a>'
        })
      })

  };

  return (
    <div className="p-5 h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto w-1/3">
        <div className="w-full bg-white rounded-lg shadow mt-0">
          <div className="p-8 space-y-10">
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
              Sign in Property Management App
            </h1>

            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <PrimaryTextInputWithLabel
                label="Email"
                name="email"
                icon={HiUser}
                placeholder="user@email.com"
                type="text"
                required
                errors={errors}
                register={register}
              ></PrimaryTextInputWithLabel>
              <PrimaryTextInputWithLabel
                label="Password"
                name="password"
                icon={HiKey}
                placeholder="Password"
                type="password"
                required
                errors={errors}
                register={register}
              />
              {message && (
                <Alert color="failure" icon={HiInformationCircle}>
                  <span>
                    <p>{message}</p>
                  </span>
                </Alert>
              )}
              <PrimaryButton
                type="submit"
                className="mt-3"
                isProcessing={isSubmitting}
                disabled={isSubmitting}
              >
                Login
              </PrimaryButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

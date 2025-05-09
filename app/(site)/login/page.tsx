"use client";
import { Alert } from "flowbite-react";
import firebase from "../../clientApp";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useState } from "react";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PrimaryTextInputWithLabel } from "../../component/input/PrimaryTextInputWithLabel";
import { HiUser, HiKey, HiInformationCircle } from "react-icons/hi";
import { PrimaryButton } from "../../component/button/PrimaryButton";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import { useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import { login } from "../../util/auth.util";
import secureLocalStorage from "react-secure-storage";

// Initialize Firebase
const auth = getAuth(firebase.app());

type FormData = {
  email: string;
  password: string;
  isLocalAccount: boolean;
};

const formSchema = yup
  .object({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
    isLocalAccount: yup.boolean().default(false),
  })
  .required();

export default function Home() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const role = searchParams.get("role"); // Get the 'role' query parameter

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(async (value) => {
        if (value.user) {
          login(data.email, data.password, value.user.uid);
          secureLocalStorage.setItem("role", role!);
          if (role == "admin") {
            router.push("/admin/dashboard");
          } else {
            router.push("/houseList");
          }
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Either your email or password is wrong.",
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-6">
      <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 bg-white rounded-lg shadow">
        <div className="p-6 sm:p-8 space-y-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 text-center">
            Sign in as: {role}
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
            />
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
              className="mt-4"
              isProcessing={isSubmitting}
              disabled={isSubmitting}
            >
              Login
            </PrimaryButton>
          </form>
        </div>
      </div>
    </div>
  );
}

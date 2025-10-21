"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
// import { auth } from "../../clientApp";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "@/app/clientApp";

const auth = getAuth(app);

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      // For now, just log data to the console
      console.log("Registration data:", data);
     await createUserWithEmailAndPassword(auth, data.email, data.password)
      // You can later send it to Firestore or your API endpoint here
      setSuccessMsg("Registration successful! ✈️");
    } catch (error: any) {
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Create Your Account ✈️
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full p-2 border rounded-lg"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 border rounded-lg"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 characters" },
              })}
              className="w-full p-2 border rounded-lg"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {errorMsg && <p className="text-red-500 text-center">{errorMsg}</p>}
          {successMsg && (
            <p className="text-green-600 text-center">{successMsg}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            {loading ? "Processing..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

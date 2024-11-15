import { useForm } from "react-hook-form";
// import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function TestValidate() {
  let userSchema = yup
  .object({
    firstName: yup.string().required("First Name Required"),
    lastName: yup.string().required("Last Name Required"),
    email: yup
      .string()
      .email("Invalid Email Format")
      .required("Email Required"),
    address: yup
      .string()
      .min(5, "Address must be at least 10 characters long")
      .required("Address Required"),
  })
  .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const handleFormSubmit = (data) => {
    console.log(data)
  }

  return (
    <div className="sm:w-1/2 w-full h-[100vh] flex flex-col gap-4 items-center justify-between  bg-slate-50 pt-8">
      <header className="text-center">
        <h1 className="sm:text-8xl text-4xl text-green-800 mb-4 font-extrabold">
          Solar Title
        </h1>
        <p>Basic info about the app in subtitle under web name</p>
      </header>

      <div className="border-2 w-full  h-full  items-center border-slate-300 rounded-md bg-green-100">
        <h1 className="sm:text-4xl text-center l text-2xl my-10  text-green-800 font-bold underline">
          Request an Appointment
        </h1>
        <form
          onSubmit={handleSubmit((data) => {
           handleFormSubmit(data)
          })}
          className=" sm:ml-5 sm:items-start flex flex-col space-y-10  w-11/12 mx-auto"
        >
          <div className="sm:flex sm:gap-3 flex-grow w-full flex flex-col gap-6">
            <input
              className={`p-2 border rounded-lg  ${
                errors.firstName
                  ? "border-red-500 placeholder-red-500"
                  : "border-slate-300"
              }`}
              type="text"
              {...register("firstName")}
              placeholder={errors.firstName?.message || "First Name"}
            />

            <input
              className={`border rounded-lg p-2 ${
                errors.lastName
                  ? "border-red-500 placeholder-red-500"
                  : "border-slate-300"
              }`}
              type="text"
              {...register("lastName")}
              placeholder={errors.lastName?.message || "Last Name"}
            />
          </div>

          <input
            className={`flex-grow w-full border rounded-lg p-2 ${
              errors.email
                ? "border-red-500 placeholder-red-500"
                : "border-slate-300"
            }`}
            type="text"
            {...register("email")}
            placeholder={errors.email?.message || "Email"}
          />
          {errors.email?.message && (
					<div className='alert alert-danger'>
						{errors.email?.message}
					</div>
				)}
          <input
            className={`flex-grow w-full border rounded-lg p-2 ${
              errors.address
                ? "border-red-500 placeholder-red-500"
                : "border-slate-300"
            }`}
            type="text"
            {...register("address")}
            placeholder={errors.address?.message || "Address"}
          />
          <button
            type="submit"
            className="sm:ml-auto flex-grow w-full  bg-slate-800 rounded-lg text-slate-50 text-md py-4 mt-6 mx-auto"
          >
            Select a time{" "}
          </button>
        </form>
      </div>
      <p className="mb-4 text-lg">
        City Hall Employee?{" "}
        <a className="underline text-blue-500" href="/">
          Sign In
        </a>
      </p>
    </div>
  );
}

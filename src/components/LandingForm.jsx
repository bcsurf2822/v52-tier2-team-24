import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DateForm from "./DateForm";

import GoogleAutoComplete from "./customInputs/GoogleAutocomplete";

import { APIProvider } from "@vis.gl/react-google-maps";

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

import { AppointmentConfirmation } from "./AppointmentConfirmation";
import { TimeslotConfirmation } from "./TimeslotConfirmation";

export default function TestValidate() {
  //states for appointment and timeslot modals
  const [isTimeslotModalOpen, setIsTimeslotModalOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [addressStatus, setAddressStatus] = useState(null);
  const [addressMessage, setAddressMessage] = useState(null);
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
      // Adding date and time validation for the dateform

      dateTime: yup.string().required("Date and time are required"),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError, //to manually set errors

    clearErrors, //to clear errors
    setValue, //to set value
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const handleFormSubmit = (data) => {
    //checking if the time was picked
    if (!data.dateTime) {
      setError("dateTime", {
        type: "manual",
        message: "Date and time slot required",
      });
      return;
    }

    localStorage.setItem("userInput", JSON.stringify(data));
    reset();
    //show appointment confirmation modal after form submission
    setIsAppointmentModalOpen(true);
  };

  const openTimeSlotModal = () => {
    setIsTimeslotModalOpen(true);
  };

  const handleCancel = () => {
    setAddressMessage(null);
    setAddressStatus(null);
    reset();
    setIsAppointmentModalOpen(false);
  };

  return (
    <div className="w-full flex flex-col gap-4 items-center     pt-8">
      <form
        onSubmit={handleSubmit((data) => {
          handleFormSubmit(data);
        })}
        className=" sm:ml-5 sm:items-start flex text-lg  flex-col w-11/12 border p-2  max-w-5xl"
      >
        <div className="sm:flex-row gap-2  flex-grow w-full flex flex-col   ">
          <div className="sm:w-1/2 ">
            <p className="ml-2 font-bold mb-2">First Name *</p>
            <input
              className={`w-full pl-2 border mb-4  py-2 rounded-lg  focus:outline-slate-400 ${
                errors.firstName
                  ? "border-red-500 placeholder-red-500"
                  : "border-slate-300"
              }`}
              type="text"
              {...register("firstName")}
              placeholder={errors.firstName?.message || "Enter Your Name"}
            />
          </div>
          <div className="sm:w-1/2 ">
            <p className="ml-2 font-bold mb-2">Last Name *</p>
            <input
              className={`w-full  border mb-4   rounded-lg pl-2 py-2 focus:outline-slate-400 ${
                errors.lastName
                  ? "border-red-500 placeholder-red-500"
                  : "border-slate-300"
              }`}
              type="text"
              {...register("lastName")}
              placeholder={errors.lastName?.message || "Enter Your Last Name"}
            />
          </div>
        </div>

        <div className="sm:flex-row gap-2 flex-grow w-full flex flex-col  ">
          <div className="sm:w-1/2 ">
            <p className="ml-2 font-bold mb-2">Email *</p>
            <input
              className={`w-full  pl-2 py-2 mb-4    border rounded-lg focus:outline-slate-400  ${
                errors.email
                  ? "border-red-500 placeholder-red-500"
                  : "border-slate-300 "
              }`}
              type="text"
              {...register("email")}
              placeholder={errors.email?.message || "Enter Your  Email"}
            />
          </div>
          <div className="sm:w-1/2 ">
            <p className="ml-2 font-bold mb-2">Address *</p>
            <APIProvider apiKey={GOOGLE_API_KEY}>
              <GoogleAutoComplete
                setAddressStatus={setAddressStatus}
                setAddressMessage={setAddressMessage}
                setValue={setValue}
                errors={errors.address}
              />
            </APIProvider>
            <div className="flex justify-end">
              {addressStatus && (
                <span className="loading loading-spinner loading-sm"></span>
              )}
              {addressMessage !== null && (
                <p
                  className={`${
                    addressMessage === true ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {addressMessage === true
                    ? "Address Validated"
                    : addressMessage === false
                    ? "Address Not Validated"
                    : addressMessage}
                </p>
              )}
            </div>
          </div>
        </div>

        <p className="ml-2 font-bold mb-2">Preferred Timeslot</p>
        <DateForm
          setValue={setValue} //passing setValues and registering function to DateFomr
          clearErrors={clearErrors}
          register={register}
          openTimeSlotModal={openTimeSlotModal}
        />
        {/* Error message will pop up if date/time hasn't been picket */}
        {errors.dateTime && (
          <p className="text-red-500 ml-2 mt-1">{errors.dateTime?.message}</p>
        )}
        <div className="sm:flex-row sm:w-1/2 sm:mt-10 flex flex-col sm:justify-start gap-2  mt-5">
          <button
            type="submit"
            className=" w-full font-bold  bg-green-600 rounded-lg text-slate-50 text-xl  py-4 "
          >
            Submit{" "}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className=" border-2 border-slate-600  w-full  rounded-lg  text-xl font-bold  py-4 "
          >
            Cancel{" "}
          </button>
        </div>
      </form>
      {/* Show TimeslotConfirmation Modal after date selection */}
      {isTimeslotModalOpen && (
        <TimeslotConfirmation
          closeModal={() => setIsTimeslotModalOpen(false)}
        />
      )}

      {/* Show AppointmentConfirmation Modal after form submission */}
      {isAppointmentModalOpen && (
        <AppointmentConfirmation
          closeModal={() => setIsAppointmentModalOpen(false)}
        />
      )}
      {/* </div > */}
    </div>
  );
}

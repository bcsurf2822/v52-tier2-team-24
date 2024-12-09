import  { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
// import TimePicker from 'react-time-picker';
import "react-datepicker/dist/react-datepicker.css";

const DateForm = ({ setValue, clearErrors, register, openTimeSlotModal }) => {
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [appointmentTime, setAppointmentTime] = useState("");

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     console.log("Appointment Date:", appointmentDate);
  //     console.log("Appointment Time:", appointmentTime);
  //   };

  useEffect(() => {
    // initial time
    const initialTime = getNextAvailableTime(new Date());
    setAppointmentTime(initialTime);
    combineDateTime(appointmentDate, initialTime);
  }, []);

  const handleDateChange = (date) => {
    setAppointmentDate(date);
    const nextAvailableTime = getNextAvailableTime(date);
    setAppointmentTime(nextAvailableTime);
    combineDateTime(date, nextAvailableTime);

    //opens timeslot modal once date is selected
    openTimeSlotModal();
  };

  const handleTimeChange = (e) => {
    const time = e.target.value;
    setAppointmentTime(time);
    combineDateTime(appointmentDate, time);
  };

  const formatDate = (date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const combineDateTime = (date, time) => {
    if (date && time) {
      const formattedDate = formatDate(date);
      const combinedDateTime = `${formattedDate} ${time}`;
      setValue("dateTime", combinedDateTime);
      clearErrors("dateTime");
    }
  };

  const getNextAvailableTime = (date) => {
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    let hour = isToday ? now.getHours() + 1 : 9; // if today, starting from next hour, otherwise next day 9am
    hour = Math.max(9, Math.min(18, hour)); // hours between 9 and 18
    return `${hour % 12 || 12}:00 ${hour >= 12 ? "PM" : "AM"}`;
  };

  const generateTimeOptions = () => {
    const times = [];
    const now = new Date();
    const isToday = appointmentDate.toDateString() === now.toDateString();
    const startHour = isToday ? now.getHours() + 1 : 9; // starting from next hour if today

    for (let hour = startHour; hour <= 18; hour++) {
      const suffix = hour < 12 ? "AM" : "PM";
      const hour12 = hour > 12 ? hour - 12 : hour;
      const formattedTime = `${hour12}:00 ${suffix}`;
      times.push(formattedTime);
    }
    return times;
  };

  return (
    <div className="sm:flex-row sm:w-1/2 flex flex-col w-full gap-2">
      <div>
        <DatePicker
          className="w-full py-1.5 pl-2 rounded-lg border border-slate-400"
          selected={appointmentDate}
          onChange={handleDateChange}
          dateFormat="MMMM d, yyyy"
          placeholderText="Select Date"
          //   required
          minDate={new Date()}
        />
      </div>
      <div className="w-full sm:w-1/2">
        <select
          className="w-full pl-2 py-2 mb-4 border rounded-lg focus:outline-slate-400"
          //   id="appointmentTime"
          value={appointmentTime}
          onChange={handleTimeChange}
          //   required
        >
          {/* <option value="">Select Time</option> */}
          {generateTimeOptions().map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
      <input
        type="hidden"
        {...register("dateTime")}
        value={
          appointmentDate && appointmentTime
            ? `${
                appointmentDate.toISOString().split("T")[0]
              } ${appointmentTime}`
            : ""
        }
      />
    </div>
  );
};

export default DateForm;

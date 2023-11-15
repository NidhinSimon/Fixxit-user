import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const DateModal = ({ handleclose }) => {
  const [value, setValue] = useState("");
  const [selectedTime, setSelectedTime] = useState(null);

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const handleSubmitdate = (value, selectedTime) => {
    if (selectedTime) {
      const selectedDay = dayjs(value);
      const formattedDate = selectedDay.format("dddd, MMMM D, YYYY");
      toast.success(`Selected time is ${formattedDate} ${selectedTime}`);
      handleclose(selectedTime, formattedDate);
    } else {
      toast.error("Please select a time.");
    }
  };

  const formattedDate = value
    ? dayjs(value).format("dddd, MMMM D, YYYY")
    : dayjs().format("dddd, MMMM D, YYYY");
  const allotedTimes = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
  ];

  const currentHour = value ? dayjs(value).hour() : dayjs().hour();
  const selectedDay = dayjs(value);
  const tomorrow = selectedDay.add(1, "day");

  return (
    <div>
      <Toaster />
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="relative bg-white rounded-lg shadow p-6 md:p-8 w-80 sm:w-3/5">
          <div className="flex justify-center">
            <DatePicker
              className="w-full h-10"
              value={value}
              onChange={(newValue) => setValue(newValue)}
              defaultValue={dayjs()}
              minDate={tomorrow}
              views={["year", "month", "day"]}
            />
          </div>
          <div className="text-center mt-3">
            <p className="text-lg font-semibold text-indigo-600"> {formattedDate}</p>
          </div>
          <div className="mt-5">
            <h1 className="text-2xl font-semibold text-indigo-600 text-center">Time Slot</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 justify-items-center mt-5">
              {allotedTimes.map((time, index) => {
                const timeHour = dayjs(time, "h:mm A").hour();
                return (
                  <div
                    key={index}
                    className={`bg-indigo-100 w-28 sm:w-36 rounded-lg h-10 cursor-pointer ${
                      timeHour <= currentHour
                        ? "text-gray-400 cursor-not-allowed"
                        : selectedTime === time
                        ? "text-white hover:scale-105 duration-300 bg-indigo-700"
                        : ""
                    }`}
                    onClick={() =>
                      timeHour > currentHour && handleTimeClick(time)
                    }
                  >
                    <p className="text-center mt-2">{time}</p>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center mt-5">
              <button
                onClick={() => handleSubmitdate(value, selectedTime)}
                className="bg-indigo-600 w-32 sm:w-40 h-10 rounded-lg text-white hover:bg-indigo-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateModal;

"use client";
import { useState } from "react";
import useTicketStore from "../state/store";
import { sendData } from "@/lib/actions";
import TicketFlowButton from "./TicketFlowButton";

const GuestInfo = ({ handleNextClick, handleBackClick, reservationId }) => {
  const { vipTickets, regularTickets } = useTicketStore();
  const totalGuests = vipTickets + regularTickets;

  const [guestInfo, setGuestInfo] = useState(Array(totalGuests).fill({ firstname: "", lastname: "", email: "" }));

  const handleChange = (index, field, value) => {
    const updatedGuestInfo = [...guestInfo];
    updatedGuestInfo[index] = { ...updatedGuestInfo[index], [field]: value };
    setGuestInfo(updatedGuestInfo);
  };

  const isGuestComplete = (guest) => {
    return guest.firstname.trim() && guest.lastname.trim() && guest.email.trim();
  };

  const isFormComplete = guestInfo.every(isGuestComplete);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormComplete) {
      await sendData(guestInfo, reservationId);
      handleNextClick();
    } else {
      alert("Venligst udfyld alle felter");
    }
  };

  return (
    <div>
      <h1 className="text-center">Udfyld Information</h1>
      <form onSubmit={handleSubmit}>
        {guestInfo.map((guest, index) => (
          <div key={index} className={`mb-4 border-2 p-4 rounded ${isGuestComplete(guest) ? "border-green-500" : "border-accent"}`}>
            <h3>Guest {index + 1}</h3>
            <div className="flex flex-col gap-2">
              <label>
                First Name:
                <input type="text" value={guest.firstname} onChange={(e) => handleChange(index, "firstname", e.target.value)} className="border p-2 rounded w-full" />
              </label>
              <label>
                Last Name:
                <input type="text" value={guest.lastname} onChange={(e) => handleChange(index, "lastname", e.target.value)} className="border p-2 rounded w-full" />
              </label>
              <label>
                Email:
                <input type="email" value={guest.email} onChange={(e) => handleChange(index, "email", e.target.value)} className="border p-2 rounded w-full" />
              </label>
            </div>
          </div>
        ))}
        <div className="flex justify-self-center gap-5">
          <TicketFlowButton handleClick={handleBackClick} action="Tilbage" />
          <TicketFlowButton handleClick={handleSubmit} action="Videre" />
        </div>
      </form>
    </div>
  );
};

export default GuestInfo;

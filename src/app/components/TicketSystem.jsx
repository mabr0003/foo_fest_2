"use client";
import { useState, useEffect } from "react";
import TicketSelector from "../components/TicketSelector";
import CampingSelector from "../components/CampingSelector";
import GuestInfo from "../components/GuestInfo";
import Payment from "../components/Payment";
import ReservationComplete from "./ReservationComplete";
import { reserveSpot, fullfillReservation } from "@/lib/api";
import useTicketStore from "../state/store";
import Recepit from "./Receipt";

const TicketSystem = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [timer, setTimer] = useState(null);
  const [timerStarted, setTimerStarted] = useState(false);
  const [reservationId, setReservationId] = useState(null);

  const { selectedSpot, vipTickets, regularTickets } = useTicketStore();
  const totalTickets = vipTickets + regularTickets;

  // Timer fra ChatGPT
  useEffect(() => {
    let interval;
    if (timerStarted && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer, timerStarted]);

  const handleNextClick = async () => {
    if (currentStep === 2) {
      if (!selectedSpot) {
        alert("Please select a camping spot before proceeding.");
        return;
      }

      try {
        const result = await reserveSpot(selectedSpot.area, totalTickets);

        console.log("Reservation:", result);

        if (result.message) {
          setReservationId(result.id);
          setTimer(300);
          setTimerStarted(true);
          setCurrentStep((prevStep) => prevStep + 1);
        } else {
          alert("Reservationen fejlede. Prøv igen.");
        }
      } catch (error) {
        console.error(error);
        alert("Der skete en fejl. Prøv igen.");
      }
    } else if (currentStep === 4) {
      try {
        if (reservationId) {
          const result = await fullfillReservation(reservationId);
          console.log("Reservation:", result);
          setCurrentStep((prevStep) => prevStep + 1);
        }
      } catch (error) {
        console.error(error);
        alert("Køb ikke gennemført. Prøv igen.");
      }
    } else {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handleBackClick = () => {
    setCurrentStep((prevStep) => Math.max(1, prevStep - 1));
  };

  return (
    <div className={currentStep > 1 && currentStep !== 5 ? `md:grid md:grid-cols-[4fr_1fr] md:gap-5` : ""}>
      {/* Timer fra ChatGPT*/}
      <div className={timer > 0 && currentStep !== 5 ? `border-2 border-black px-5 py-5 justify-self-start row-start-1` : ""}>
        {timer > 0 && currentStep !== 5 ? (
          <p className="">
            Du har{" "}
            <span className="bayon">
              {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}
            </span>{" "}
            til at færdiggøre din reservation
          </p>
        ) : (
          ""
        )}
      </div>
      <div className="row-start-2">
        {currentStep === 1 && (
          <section>
            <TicketSelector handleNextClick={handleNextClick} />
          </section>
        )}
        {currentStep === 2 && (
          <section>
            <CampingSelector handleNextClick={handleNextClick} handleBackClick={handleBackClick} />
          </section>
        )}
        {currentStep === 3 && (
          <section>
            <GuestInfo handleNextClick={handleNextClick} handleBackClick={handleBackClick} reservationId={reservationId} />
          </section>
        )}
        {currentStep === 4 && (
          <section>
            <Payment handleNextClick={handleNextClick} handleBackClick={handleBackClick} />
          </section>
        )}
        {currentStep === 5 && (
          <section>
            <ReservationComplete />
          </section>
        )}
      </div>
      {currentStep > 1 && currentStep !== 5 && (
        <div className="self_start row-start-2">
          <Recepit />
        </div>
      )}
    </div>
  );
};

export default TicketSystem;

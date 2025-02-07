import { useState } from "react";
import TicketFlowButton from "./TicketFlowButton";

const Payment = ({ handleNextClick, handleBackClick }) => {
  const [formData, setFormData] = useState({
    cartholder: "",
    cardnumber: "",
    date: "",
    cvc: "",
  });

  const isFormFilled = formData.cartholder.trim() && formData.cardnumber.trim() && formData.date.trim() && formData.cvc.trim();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePaymentClick = () => {
    if (!isFormFilled) {
      alert("Alle felter skal udfyldes, før du kan fortsætte.");
      return;
    }
    handleNextClick();
  };

  return (
    <div>
      <h1>Betaling</h1>
      <div className="md:grid grid-cols-[2fr_1fr]">
        <form className="flex flex-col gap-8 justify-self-start mb-8">
          <label>
            Kortholder *
            <input type="text" name="cartholder" value={formData.cartholder} onChange={handleChange} className="border p-2 rounded w-full" />
          </label>
          <label>
            Kortnummer *
            <input type="text" name="cardnumber" value={formData.cardnumber} onChange={handleChange} className="border p-2 rounded w-full" />
          </label>
          <div className="flex gap-5">
            <label>
              Dato *
              <input type="text" name="date" value={formData.date} onChange={handleChange} className="border p-2 rounded w-full" />
            </label>
            <label>
              CVC *
              <input type="text" name="cvc" value={formData.cvc} onChange={handleChange} className="border p-2 rounded w-full" />
            </label>
          </div>
        </form>
      </div>
      <div className="flex justify-self-center gap-5">
        <TicketFlowButton handleClick={handleBackClick} action="Tilbage" />
        <TicketFlowButton handleClick={handlePaymentClick} action="Gennemfør betaling" />
      </div>
    </div>
  );
};

export default Payment;

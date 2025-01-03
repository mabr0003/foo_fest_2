import Receipt from "./Receipt";
import TicketFlowButton from "./TicketFlowButton";

const Payment = ({ handleNextClick, handleBackClick }) => {
  return (
    <div>
      <h1>Betaling</h1>
      <div className="md:grid grid-cols-[2fr_1fr]">
        <form className="flex flex-col gap-8 justify-self-start mb-8">
          <label>
            Kortholder *
            <input type="text" className="border p-2 rounded w-full" />
          </label>
          <label>
            Kortnummer *
            <input type="text" className="border p-2 rounded w-full" />
          </label>
          <div className="flex gap-5">
            <label>
              Dato *
              <input type="email" className="border p-2 rounded w-full" />
            </label>
            <label>
              CVC *
              <input type="email" className="border p-2 rounded w-full" />
            </label>
          </div>
        </form>
        <div>
          <Receipt />
        </div>
      </div>
      <div className="flex justify-self-center gap-5">
        <TicketFlowButton handleClick={handleBackClick} action="Tilbage" />
        <TicketFlowButton handleClick={handleNextClick} action="Gennemfør betaling" />
      </div>
    </div>
  );
};

export default Payment;

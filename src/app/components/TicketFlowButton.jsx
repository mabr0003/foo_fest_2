import { IoIosArrowRoundForward } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";
const TicketFlowButton = ({ handleClick, action }) => {
  return (
    <button className="bayon text-xl border border-black rounded-lg px-5 flex items-center my-8" type="button" onClick={handleClick}>
      {action.toLowerCase() === "tilbage" && (
        <span>
          <IoIosArrowRoundBack size={30} />
        </span>
      )}
      {action}
      {action.toLowerCase() !== "tilbage" && (
        <span>
          <IoIosArrowRoundForward size={30} />
        </span>
      )}
    </button>
  );
};

export default TicketFlowButton;

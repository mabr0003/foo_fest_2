"use client";
import useTicketStore from "../state/store";
import TicketFlowButton from "./TicketFlowButton";

const TicketSelector = ({ handleNextClick }) => {
  const { vipTickets, regularTickets, increaseTicket, decreaseTicket } = useTicketStore();

  const handleNext = () => {
    if (vipTickets === 0 && regularTickets === 0) {
      alert("Venligst vælg mindst 1 billet før du går videre.");
    } else {
      handleNextClick();
    }
  };

  return (
    <div>
      <h1 className="text-center">Vælg Billetter</h1>
      <div className="md:grid grid-cols-2">
        <div className="self-center md:justify-self-center">
          <div className="bayon flex gap-10 bg-accent px-5 py-3 rounded-lg justify-between mb-3 self-start">
            <h3>VIP 1299,-</h3>
            <div className="flex gap-2 bg-white px-2 rounded-lg">
              <button onClick={() => decreaseTicket("VIP")}>-</button>
              <span className="bg-slate-100 px-2 min-w-8 grid justify-items-center">{vipTickets}</span>
              <button onClick={() => increaseTicket("VIP")}>+</button>
            </div>
          </div>
          <div className="bayon flex gap-10 bg-accent px-5 py-3 rounded-lg justify-between self-start">
            <h3>Regular 799,-</h3>
            <div className="flex gap-2 bg-white px-2 rounded-lg">
              <button onClick={() => decreaseTicket("Regular")}>-</button>
              <span className="bg-slate-100 px-2 min-w-8 grid justify-items-center">{regularTickets}</span>
              <button onClick={() => increaseTicket("Regular")}>+</button>
            </div>
          </div>
          <div>
            <TicketFlowButton handleClick={handleNext} action="Videre" />
          </div>
        </div>
        <div className="bayon justify-self-end mt-8">
          <h3 className="text-2xl">Hvad får du med?</h3>
          <div className="flex flex-col gap-2 mb-8 mt-3">
            <h3 className="text-xl">VIP</h3>
            <p className="bayon">Alt fra regular-biletten plus:</p>
            <ul className="list-disc">
              <li>Adgang til eksklusiv VIP-lounge med komfortable siddepladser og privat bar</li>
              <li>Gratis mjød eller vikingedrik ved ankomst</li>
              <li>Forreste pladser til koncerter og shows</li>
              <li>Meet-and-greet med optrædende eller reenactment-grupper</li>
              <li>Adgang til særaktiviteter, fx bueskydning med eksperter eller en tur i en vikingebåd</li>
              <li>Gratis festivalmerchandise, fx en t-shirt eller krus med Asgårds Drømme-logo</li>
              <li>VIP-toiletter (ingen kø, bedre faciliteter)</li>
              <li>Mad- og drikkekuponer til brug i festivalområdet</li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl">Regular</h3>
            <ul className="list-disc">
              <li>Adgang til festivalen alle dage</li>
              <li>Adgang til koncerter og aktiviteter</li>
              <li>Fri adgang til vikingemarkedet</li>
              <li>Mulighed for at deltage i workshops (fx runeskrift, skjoldmaling)</li>
              <li>Adgang til fælles spiseområder</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketSelector;

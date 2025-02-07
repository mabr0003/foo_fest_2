"use client";
import { useEffect, useState } from "react";
import useTicketStore from "../state/store";
import { getAvailableSpots } from "@/lib/api";
import GoGreen from "./GoGreen";
import TicketFlowButton from "./TicketFlowButton";

const CampingSelector = ({ handleNextClick, handleBackClick }) => {
  const { tentPrices, increaseTent, decreaseTent, selectedSpot, selectSpot, twoPersonTentCount, threePersonTentCount } = useTicketStore();

  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSpots() {
      setLoading(true);
      const availableSpots = await getAvailableSpots();
      setSpots(availableSpots);
      setLoading(false);
    }
    fetchSpots();
  }, []);

  return (
    <div className="grid">
      <h1 className="text-center flex justify-self-center">
        Vælg Campingområde <span className="text-xl">*</span>
      </h1>
      <div className="justify-self-center my-4">
        <GoGreen />
      </div>
      {loading ? (
        <p>Loading camping spots...</p>
      ) : (
        <div className="bayon flex flex-col md:grid grid-cols-5 gap-5">
          {spots.map((spot, index) => (
            <button
              key={spot.area}
              className={`w-full py-5 md:py-10 rounded-lg flex flex-col items-center bg-accent border-4 ${selectedSpot?.area === spot.area && spot.available > 0 ? "border-green-600" : "border-transparent"}`}
              style={{
                gridColumn: index === 0 ? "1" : index === 1 ? "3" : index === 2 ? "5" : index === 3 ? "2" : index === 4 ? "4" : "",
                gridRow: index < 3 ? "1" : index < 5 ? "2" : "",
              }}
              onClick={() => selectSpot(spot)}
            >
              <span>{spot.area}</span>
              <span className="text-gray-400">{spot.available === 0 ? "UDSOLGT" : `${spot.available} pladser tilbage`}</span>
            </button>
          ))}
        </div>
      )}
      <div className="justify-self-center mt-8">
        <h3 className="bayon text-center text-xl">Tilkøb telte</h3>
        <div className="flex flex-col gap-4">
          <div className="w-full bayon flex gap-10  px-5 py-3 rounded-lg justify-between mb-3 self-start">
            <h3>2 Personers telt {tentPrices["2-person"]},-</h3>
            <div className="flex gap-2 px-2 rounded-lg border-2 border-black">
              <button onClick={() => decreaseTent("2-person")}>-</button>
              <span className="px-2 min-w-8 grid justify-items-center">{twoPersonTentCount}</span>
              <button onClick={() => increaseTent("2-person")}>+</button>
            </div>
          </div>

          <div className="w-full bayon flex gap-10 px-5 py-3 rounded-lg justify-between mb-3 self-start">
            <h3>3 Personers telt {tentPrices["3-person"]},-</h3>
            <div className="flex gap-2 px-2 rounded-lg border-2 border-black">
              <button onClick={() => decreaseTent("3-person")}>-</button>
              <span className="px-2 min-w-8 grid justify-items-center">{threePersonTentCount}</span>
              <button onClick={() => increaseTent("3-person")}>+</button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-self-center gap-5">
        <TicketFlowButton handleClick={handleBackClick} action="Tilbage" />
        <TicketFlowButton handleClick={handleNextClick} action="Videre" />
      </div>
    </div>
  );
};

export default CampingSelector;

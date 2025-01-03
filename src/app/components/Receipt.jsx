import useTicketStore from "../state/store";
const Recepit = () => {
  const { vipTickets, regularTickets, RegularPrice, VipPrice, tentPrices, reservation, selectedSpot, twoPersonTentCount, threePersonTentCount, goGreen } = useTicketStore();
  const goGreenPrice = 249;
  const twoPersonTentTotal = tentPrices["2-person"] * twoPersonTentCount;
  const threePersonTentTotal = tentPrices["3-person"] * threePersonTentCount;
  const totalSum = RegularPrice + VipPrice + goGreenPrice + reservation + twoPersonTentTotal + threePersonTentTotal;
  return (
    <div className="bayon bg-white px-3 py-5 flex flex-col gap-5">
      <div className="flex flex-col">
        <h3 className="text-2xl mb-2">Biletter</h3>
        <div className="flex justify-between text-gray-500 text-sm">
          <span>{regularTickets === 0 ? "" : `Regular x ${regularTickets}`}</span>
          <span>{regularTickets === 0 ? "" : `${RegularPrice},-`}</span>
        </div>
        <div className="flex justify-between text-gray-500 text-sm">
          <span>{vipTickets === 0 ? "" : `VIP x ${vipTickets}`}</span>
          <span>{vipTickets === 0 ? "" : `${VipPrice},-`}</span>
        </div>
      </div>
      <div>
        <h3 className="text-2xl mb-2">Camp</h3>
        <div className="text-gray-500 text-sm">{selectedSpot.area}</div>
      </div>
      {twoPersonTentCount > 0 || threePersonTentCount > 0 ? (
        <div>
          <h3 className="text-2xl mb-2">Telt</h3>
          {twoPersonTentCount > 0 && (
            <div className="flex justify-between text-gray-500 text-sm">
              <span>{`2 personers x ${twoPersonTentCount}`}</span>
              <span>{`${twoPersonTentTotal},-`}</span>
            </div>
          )}
          {threePersonTentCount > 0 && (
            <div className="flex justify-between text-gray-500 text-sm">
              <span>{`3 personers x ${threePersonTentCount}`}</span>
              <span>{`${threePersonTentTotal},-`}</span>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
      <div>
        {goGreen ? (
          <div className="flex justify-between text-gray-500 text-sm">
            <span>Go Green</span>
            <span>{`${goGreenPrice},-`}</span>
          </div>
        ) : (
          ""
        )}

        <div className="flex justify-between text-gray-500 text-sm">
          <span>Reservationsgebyr</span>
          <span>{`${reservation},-`}</span>
        </div>
      </div>

      <div className="flex justify-between border-t-2 border-black text-xl py-4">
        <span>Total</span>
        <span>{`${totalSum},-`}</span>
      </div>
    </div>
  );
};

export default Recepit;

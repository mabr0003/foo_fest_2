import Recepit from "./Receipt";
const ReservationComplete = () => {
  return (
    <div>
      <div className="text-center">
        <h1>Tak for bestillingen</h1>
        <h3 className="bayon my-6">Du modtager en ordrerbekræftelse snarest</h3>
      </div>
      <Recepit />
    </div>
  );
};

export default ReservationComplete;

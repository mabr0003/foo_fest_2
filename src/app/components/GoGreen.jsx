import useTicketStore from "../state/store";
const GoGreen = () => {
  const { goGreen, toggleGoGreen } = useTicketStore();
  return (
    <div className="bayon flex items-center gap-3">
      <h3>Go Green 249,-</h3>
      <button className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${goGreen ? "bg-green-500 border-green-500 text-white" : "border-gray-800"}`} onClick={toggleGoGreen}>
        {goGreen && "✓"}
      </button>
    </div>
  );
};

export default GoGreen;

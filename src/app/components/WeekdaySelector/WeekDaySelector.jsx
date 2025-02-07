import "./weekdaySelector.css";

const WeekDaySelector = ({ weekdays, selectedDay, setSelectedDay }) => {
  return (
    <div className="bayon flex flex-col gap-3 md:grid grid-cols-7 grid-rows-2 m-auto md:justify-items-center weekdays text-xl border-b-2 border-black py-3">
      {weekdays.map((day) => (
        <button key={day.id} onClick={() => setSelectedDay(day.id)} className={`${selectedDay === day.id ? "button_container button_dot" : ""}`}>
          {day.label}
        </button>
      ))}
    </div>
  );
};

export default WeekDaySelector;

"use client";
import { useState, useEffect } from "react";
import { getBands, getSchedule } from "@/lib/api";
import Link from "next/link";

const LineUpSchedule = () => {
  const [bands, setBands] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [selectedDay, setSelectedDay] = useState("mon");

  useEffect(() => {
    async function fetchData() {
      const bandsData = await getBands();
      const scheduleData = await getSchedule();
      setBands(bandsData);
      setSchedule(scheduleData);
    }

    fetchData();
  }, []);

  const weekdays = [
    { id: "mon", label: "Mandag" },
    { id: "tue", label: "Tirsdag" },
    { id: "wed", label: "Onsdag" },
    { id: "thu", label: "Torsdag" },
    { id: "fri", label: "Fredag" },
    { id: "sat", label: "Lørdag" },
    { id: "sun", label: "Søndag" },
  ];

  const getBandsForSelectedDay = () => {
    const bandsPlayingToday = new Set();
    for (const sceneSchedule of Object.values(schedule)) {
      const slots = sceneSchedule[selectedDay] || [];
      slots.forEach((slot) => bandsPlayingToday.add(slot.act));
    }
    return bandsPlayingToday;
  };

  const bandsPlayingToday = getBandsForSelectedDay();
  return (
    <div>
      <main>
        <section className="line_ups">
          <div className="mb-10 grid">
            <h2 className="text-center">Line-ups</h2>
            <div className="bayon flex flex-col gap-3 md:grid grid-cols-7 grid-rows-2 m-auto md:justify-items-center weekdays text-xl border-b-2 border-black py-3">
              {weekdays.map((day) => (
                <button key={day.id} onClick={() => setSelectedDay(day.id)} className={`${selectedDay === day.id ? "button_container button_dot" : ""}`}>
                  {day.label}
                </button>
              ))}
            </div>
          </div>

          <ul className="bayon band_list">
            {bands.map((band) => (
              <li key={band.name} className={`px-2 ${bandsPlayingToday.has(band.name) ? "bg-accent transition-colors rounded-lg" : ""}`}>
                <Link href={`/bands/${band.slug}`}>{band.name}</Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid">
          <h2 className="text-center">Program</h2>
          <div className="bayon flex flex-col gap-3 md:grid grid-cols-7 grid-rows-2 m-auto md:justify-items-center weekdays text-xl border-b-2 border-black py-3">
            {weekdays.map((day, index) => (
              <button key={day.id} onClick={() => setSelectedDay(day.id)} className={`${index < 4 ? `row-start-1` : `row-start-2`} ${selectedDay === day.id ? "button_container button_dot" : ""}`}>
                {day.label}
              </button>
            ))}
          </div>

          <div className="bayon md:grid grid-cols-3 gap-10 mt-10">
            {Object.entries(schedule).map(([scene, sceneSchedule]) => (
              <div key={scene} className="mb-10">
                <h3 className="text-3xl">{scene}</h3>
                <ul className="line-up">
                  {sceneSchedule[selectedDay]?.map((slot, index) => (
                    <li key={index} className="flex flex-col border-black border-b py-3">
                      <span>{slot.act}</span>
                      <span>
                        {slot.start} - {slot.end}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default LineUpSchedule;

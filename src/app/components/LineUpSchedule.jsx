"use client";

import { useState, useEffect } from "react";
import { getBands, getSchedule } from "@/lib/api";

import WeekDaySelector from "./WeekdaySelector/WeekDaySelector";
import BandList from "./BandList/BandList";

const LineUpSchedule = () => {
  const [bands, setBands] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [selectedDay, setSelectedDay] = useState("mon");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBands, setFilteredBands] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const bandsData = await getBands();
      const scheduleData = await getSchedule();
      setBands(bandsData);
      setSchedule(scheduleData);
      setFilteredBands(bandsData);
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

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setFilteredBands(bands);
    } else {
      const filtered = bands.filter((band) => band.name.toLowerCase().includes(query));
      setFilteredBands(filtered);
    }
  };

  return (
    <div>
      <main>
        <section className="line_ups">
          <div className="mb-10 grid">
            <h2 className="text-center">Line-ups</h2>
            <WeekDaySelector weekdays={weekdays} selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
          </div>

          <div className="mb-6">
            <input type="text" placeholder="Søg efter bands.." value={searchQuery} onChange={handleSearch} className="border-2 rounded-lg px-4 py-2" />
          </div>

          <BandList bands={filteredBands} bandsPlayingToday={bandsPlayingToday} />
        </section>

        <section className="grid">
          <h2 className="text-center">Program</h2>
          <WeekDaySelector weekdays={weekdays} selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
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

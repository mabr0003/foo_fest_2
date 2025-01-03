import Hero from "./components/Hero";
import LineUpSchedule from "./components/LineUpSchedule";

export default function Home() {
  return (
    <div>
      <Hero header="Asgaards Drømme" text="En uforglemmelig oplevelse fyldt med musik, fællesskab og magiske øjeblikke!" />
      <main>
        <LineUpSchedule />
      </main>
    </div>
  );
}

import TicketSystem from "../components/TicketSystem";

import Hero from "../components/Hero";

export default function Tickets() {
  return (
    <div>
      <Hero header="Køb Biletter" text="Køb billetter til dig selv og dine venner!" />
      <main>
        <TicketSystem />
      </main>
    </div>
  );
}

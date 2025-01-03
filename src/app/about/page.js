import Hero from "../components/Hero";

export default function About() {
  return (
    <div>
      <Hero header="Om os" text="Læs mere om Asgaards Drømme og om hvad der gør os til den bedste vikingefestival i norden!" />
      <main className="max-w-prose m-auto flex flex-col gap-5">
        <section>
          <h1>Læs om os her</h1>
          <p>Velkommen til Asgaards Drømme, en festival hvor gamle vikingetraditioner møder moderne musik og kultur! Vi fejrer vores fælles historie, styrke og fællesskab gennem musik, kunst og en magisk atmosfære. Inspireret af vikingernes opdagelsesrejser og deres kærlighed til fest og samvær, skaber vi en festival, der forener folk fra alle hjørner af verden. Her kan du opleve både vikingemusik, moderne hits og et væld af aktiviteter, der bringer den gamle nordiske kultur til live.</p>
        </section>
        <section>
          <h1>NON-PROFIT ORGANISATION</h1>
          <p>Som en non-profit organisation arbejder vi for at skabe en festival, der ikke kun fejrer musikken, men også vores kulturarv. Al indtjening fra festivalen går til at støtte projekter, der bevarer og fremmer vikingehistorien og nordisk kultur, samtidig med at vi skaber en platform for både nye og etablerede kunstnere. Vores mål er at give deltagerne en autentisk og uforglemmelig oplevelse, der hædrer de vikingetidens værdier som mod, ære og fællesskab.</p>
        </section>
        <section>
          <h1>VORES NARKOTIKA POLITIK</h1>
          <p>Som vikinger respekterede vi hinandens grænser og sørgede for et stærkt og sundt fællesskab. Hos Asgaard Drømme følger vi de samme principper. Vi har en streng politik mod brug af narkotika for at sikre en tryg og respektfuld festivaloplevelse for alle. Sammen med vores sikkerhedspersonale og samarbejde med lokale myndigheder arbejder vi for at skabe en festival, hvor musik og samvær er i centrum, og hvor alle kan føle sig velkomne og sikre.</p>
        </section>
      </main>
    </div>
  );
}

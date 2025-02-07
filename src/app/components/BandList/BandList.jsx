import "./bandList.css";
import Link from "next/link";

const BandList = ({ bands, bandsPlayingToday }) => {
  return (
    <ul className="bayon band_list">
      {bands.map((band) => (
        <li key={band.name} className={`px-2 ${bandsPlayingToday.has(band.name) ? "bg-accent transition-colors rounded-lg" : ""}`}>
          <Link href={`/bands/${band.slug}`}>{band.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default BandList;

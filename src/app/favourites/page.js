"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);

    if (isClient) {
      const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(savedFavorites);
    }
  }, [isClient]);

  const removeFromFavorites = (slug) => {
    const updatedFavorites = favorites.filter((band) => band.slug !== slug);
    setFavorites(updatedFavorites);

    if (isClient) {
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  if (favorites.length === 0) {
    return (
      <div>
        <div className="p-4">
          <button onClick={() => router.back()} className="px-4 py-1 border-2 border-black rounded-lg">
            <IoIosArrowRoundBack size={30} />
          </button>
        </div>
        <div className="p-20 text-center">
          <h1>Mine Favoritter</h1>
          <p>Du har ingen favoritter endnu!</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="p-4">
        <button onClick={() => router.back()} className="px-4 py-1 border-2 border-black rounded-lg">
          <IoIosArrowRoundBack size={30} />
        </button>
      </div>
      <div className="p-20">
        <h1 className="text-2xl font-bold mb-6">Mine Favoritter</h1>
        <ul className="space-y-4">
          {favorites.map((band) => (
            <li key={band.slug} className="flex items-center gap-4">
              <img src={band.logo.startsWith("https://") ? band.logo : `https://jade-aspiring-termite.glitch.me/logos/${band.logo}`} alt={`${band.name} logo`} className="w-16 h-16 object-cover rounded" />
              <div className="flex-grow">
                <a href={`/bands/${band.slug}`} className="text-blue-500 hover:underline text-lg">
                  {band.name}
                </a>
                <p className="text-sm text-gray-500">{band.genre}</p>
              </div>
              <button onClick={() => removeFromFavorites(band.slug)} className="bg-red-500 text-white px-4 py-2 rounded">
                Fjern
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

import { useState } from "react";
import useLoginStore from "../state/login";

export default function LoginModal({ onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const setLogIn = useLoginStore((state) => state.setLogIn);

  const handleLogin = () => {
    if (username === "admin" && password === "password") {
      setLogIn();
      setError("");
      onClose();
    } else {
      setError("Forkert brugernavn eller kodeord");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center ">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl mb-4">Log ind</h2>
        <div className="mb-4">
          <label className="block mb-2">Brugernavn</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="border p-2 w-full" />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Kodeord</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full" />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex justify-between">
          <button onClick={handleLogin} className="px-4 py-2 border-2 border-black rounded-lg">
            Log ind
          </button>
          <button onClick={onClose} className="text-gray-500">
            Luk
          </button>
        </div>
      </div>
    </div>
  );
}

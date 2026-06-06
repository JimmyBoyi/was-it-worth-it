import { useEffect, useState } from "react";

type Session = {
  id: string;
  betAmount: number;
  result: number;
  color: string;
  profit: number;
};

export default function App() {
  const [bet, setBet] = useState(10);
  const [history, setHistory] = useState<Session[]>([]);
  const [loading, setLoading] = useState(false);

  const API = "http://localhost:3001";

  async function spin() {
    setLoading(true);

    const res = await fetch(`${API}/roulette/spin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ betAmount: bet })
    });

    const data = await res.json();

    setHistory([data, ...history]);
    setLoading(false);
  }

  async function loadHistory() {
    const res = await fetch(`${API}/roulette/history`);
    const data = await res.json();
    setHistory(data);
  }

  useEffect(() => {
    loadHistory();
  }, []);

  return (
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          Roulette Simulator 🎲
        </h1>

        <input
            type="number"
            value={bet}
            onChange={(e) => setBet(Number(e.target.value))}
            className="border p-2 w-full mb-2"
        />

        <button
            onClick={spin}
            disabled={loading}
            className="bg-black text-white px-4 py-2 w-full"
        >
          {loading ? "Spinning..." : "Spin"}
        </button>

        <div className="mt-6 space-y-2">
          {history.map((s) => (
              <div key={s.id} className="border p-2">
                <div>Result: {s.result}</div>
                <div>Color: {s.color}</div>
                <div>Profit: {s.profit}</div>
              </div>
          ))}
        </div>
      </div>
  );
}
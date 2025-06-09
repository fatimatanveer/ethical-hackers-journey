import React, { useState } from "react";

const logEntries = [
  { id: 1, entry: "User admin logged in from 10.0.0.2", suspicious: false },
  { id: 2, entry: "Failed login from 192.168.56.101", suspicious: true },
  { id: 3, entry: "User root accessed db.customers", suspicious: false },
  { id: 4, entry: "Multiple failed logins from 5.188.206.105", suspicious: true },
];

export default function LogAnalysisMiniGame({ onComplete }: { onComplete: (success: boolean) => void }) {
  const [flags, setFlags] = useState<boolean[]>(logEntries.map(() => false));
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);

  const handleToggle = (i: number) => {
    setFlags(flags => flags.map((f, idx) => idx === i ? !f : f));
  };

  const handleSubmit = () => {
    let score = 0;
    logEntries.forEach((log, i) => {
      if (flags[i] === log.suspicious) score++;
      else score--;
    });
    const passed = score >= logEntries.length - 1; // e.g. 3/4 correct
    setSuccess(passed);
    setSubmitted(true);
    setTimeout(() => {
      onComplete(passed);
    }, 1200);
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-xl border border-cyan-700">
      <h2 className="text-lg mb-3 font-bold text-cyan-400">Log Analysis Mini-game</h2>
      <p className="mb-3">Flag all suspicious log entries below. When finished, click Submit.</p>
      <ul className="mb-4">
        {logEntries.map((log, i) => (
          <li key={log.id} className="mb-2">
            <label>
              <input
                type="checkbox"
                checked={flags[i]}
                onChange={() => handleToggle(i)}
                className="mr-2"
                disabled={submitted}
              />
              {log.entry}
            </label>
          </li>
        ))}
      </ul>
      <button
        className="bg-cyan-700 hover:bg-cyan-800 text-white font-semibold px-5 py-2 rounded"
        onClick={handleSubmit}
        disabled={submitted}
      >
        Submit
      </button>
      {submitted && (
        <div className={`mt-4 text-lg font-bold ${success ? "text-green-400" : "text-red-400"}`}>
          {success ? "Success! Suspicious entries flagged correctly." : "Incorrect. Try again next time!"}
        </div>
      )}
    </div>
  );
}

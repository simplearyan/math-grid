"use client"
import { useState } from "react";


interface CalculatorProps {
  a: number;
  b: number;
}

export default function Calculator({ a: initialA, b: initialB }: CalculatorProps) {
  const [a, setA] = useState(initialA);
  const [b, setB] = useState(initialB);

  return (
    <div className="p-4 border rounded-lg max-w-xs space-y-2 bg-gray-50">
      <div className="flex items-center gap-2">
        <label>
          A:{" "}
          <input
            type="number"
            value={a}
            onChange={e => setA(Number(e.target.value))}
            className="border px-2 py-1 rounded w-16"
          />
        </label>
        <label>
          B:{" "}
          <input
            type="number"
            value={b}
            onChange={e => setB(Number(e.target.value))}
            className="border px-2 py-1 rounded w-16"
          />
        </label>
      </div>
      <div>
        <span className="font-semibold">Sum:</span> {a + b}
      </div>
    </div>
  );
}
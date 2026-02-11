import { useState } from "react";

export default function LinkGeneratorPage() {
  const [customerName, setCustomerName] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [oldLimit, setOldLimit] = useState("");
  const [newLimit, setNewLimit] = useState("");
  const [type, setType] = useState("limit"); // "limit" or "prequalified"
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleGenerate = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    try {
      const params = new URLSearchParams({
        customerName,
        referenceId,
        oldLimit,
        newLimit,
        type
      });
      const resp = await fetch(`http://localhost:5038/api/LinkGenerator?${params}`);
      if (!resp.ok) throw new Error("Failed to generate link");
      const data = await resp.json();
      setResult(data);
    } catch {
      setError("Failed to generate link. Please check your backend and try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <form onSubmit={handleGenerate} className="bg-white rounded-xl shadow p-8 space-y-4 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Link Generator</h2>
        <div className="flex gap-4 mb-2">
          <label className="flex items-center gap-2">
            <input type="radio" checked={type==="limit"} onChange={()=>setType("limit")}/>
            Limit Increase
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" checked={type==="prequalified"} onChange={()=>setType("prequalified")}/>
            Prequalified Card
          </label>
        </div>
        <input className="w-full border px-3 py-2 rounded" placeholder="Customer Name" value={customerName} onChange={e=>setCustomerName(e.target.value)} required />
        <input className="w-full border px-3 py-2 rounded" placeholder="Reference ID" value={referenceId} onChange={e=>setReferenceId(e.target.value)} required />
        <input className="w-full border px-3 py-2 rounded" placeholder="Old Limit (KES)" value={oldLimit} onChange={e=>setOldLimit(e.target.value)} required />
        <input className="w-full border px-3 py-2 rounded" placeholder="New Limit (KES)" value={newLimit} onChange={e=>setNewLimit(e.target.value)} required />
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded font-bold">Generate Link</button>
        {error && <p className="text-red-600 font-semibold">{error}</p>}
      </form>
      {result && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mt-6 w-full max-w-xl">
          <h3 className="font-bold text-lg mb-2">Generated Message</h3>
          <textarea className="w-full p-2 border rounded mb-2" rows={6} value={result.message} readOnly />
          <a href={result.link} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline font-semibold">Test Link</a>
        </div>
      )}
    </div>
  );
}

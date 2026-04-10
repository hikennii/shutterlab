import { useState, useEffect } from "react";

export default function App() {
  const [budget, setBudget] = useState("");
  const [useCase, setUseCase] = useState("");
  const [minISO, setMinISO] = useState("");
  const [minMP, setMinMP] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [frame, setFrame] = useState("");
  const [features, setFeatures] = useState([]);
  const [ebayPrices, setEbayPrices] = useState({});
  const [showResults, setShowResults] = useState(false);

  const cameras = [
    {
      name: "Sony ZV-E10",
      use: ["vlog"],
      iso: 32000,
      mp: 24.2,
      frame: "apsc",
      manufacturer: "sony",
      features: ["log", "4k"]
    },
    {
      name: "Canon EOS R50",
      use: ["photo"],
      iso: 32000,
      mp: 24.2,
      frame: "apsc",
      manufacturer: "canon",
      features: ["4k"]
    },
    {
      name: "Sony a6400",
      use: ["photo","video"],
      iso: 32000,
      mp: 24.2,
      frame: "apsc",
      manufacturer: "sony",
      features: ["log", "4k"]
    },
    {
      name: "Sony A7II",
      use: ["photo"],
      iso: 25600,
      mp: 24.3,
      frame: "full",
      manufacturer: "sony",
      features: ["ibis", "4k", "log"]
    },
    {
      name: "Canon EOS R100",
      use: ["photo"],
      iso: 12800,
      mp: 24.1,
      frame: "apsc",
      manufacturer: "canon",
      features: ["4k"]
    },
    {
      name: "Fujifilm X-T3",
      use: ["photo", "video"],
      iso: 12800,
      mp: 26.1,
      frame: "apsc",
      manufacturer: "fujifilm",
      features: ["film", "4k", "log"]
    },
    {
      name: "Fujifilm X-T2",
      use: ["photo", "video"],
      iso: 12800,
      mp: 24.3,
      frame: "apsc",
      manufacturer: "fujifilm",
      features: ["film", "4k", "log"]
    }
  ];

  const toggleFeature = (feature) => {
    if (features.includes(feature)) {
      setFeatures(features.filter((f) => f !== feature));
    } else {
      setFeatures([...features, feature]);
    }
  };

  const getEbayPriceNumber = (cam) => {
    const raw = ebayPrices[cam.name];
    if (!raw || raw === "N/A" || raw === "Unavailable") return null;
    const num = Number(raw.replace(/[^0-9]/g, ""));
    return isNaN(num) ? null : num;
  };

  const getEbayPrice = async (name) => {
    try {
      const res = await fetch("/api/price", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) throw new Error();

      const data = await res.json();

      if (data.error) {
        setEbayPrices((prev) => ({
          ...prev,
          [name]: "Unavailable",
        }));
        return;
      }

      setEbayPrices((prev) => ({
        ...prev,
        [name]: data.price,
      }));
    } catch {
      setEbayPrices((prev) => ({
        ...prev,
        [name]: "N/A",
      }));
    }
  };

  const results = cameras.filter((cam) => {
    const price = getEbayPriceNumber(cam);

    return (
      (budget === "" ||
        price === null ||
        Math.abs(price - Number(budget)) <= 200) &&
      (useCase === "" ||
        useCase === "hybrid" ||
        cam.use.includes(useCase)) &&
      (minISO === "" || cam.iso >= minISO) &&
      (minMP === "" || cam.mp >= minMP) &&
      (frame === "" || cam.frame === frame) &&
      (manufacturer === "" || cam.manufacturer === manufacturer) &&
      (features.length === 0 ||
        features.every((f) => (cam.features || []).includes(f)))
    );
  });

  useEffect(() => {
    if (!showResults) return;

    results.slice(0, 2).forEach((cam) => {
      if (!ebayPrices[cam.name]) {
        getEbayPrice(cam.name);
      }
    });
  }, [results, showResults]);

  return (
    <div>
      <h1>Camera Picker</h1>

      <p>Budget:</p>
      <input
        type="number"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
      />

      <p>Use case:</p>
      <select onChange={(e) => setUseCase(e.target.value)}>
        <option value="">Select use case</option>
        <option value="photo">Photography</option>
        <option value="video">Video</option>
        <option value="hybrid">Hybrid</option>
        <option value="vlog">Vlogging</option>
      </select>

      <input type="number" placeholder="Min ISO" onChange={(e) => setMinISO(e.target.value)} />
      <input type="number" placeholder="Min Megapixel" onChange={(e) => setMinMP(e.target.value)} />

      <p>Frame:</p>
      <select onChange={(e) => setFrame(e.target.value)}>
        <option value="">Select frame</option>
        <option value="full">Full Frame</option>
        <option value="apsc">APS-C</option>
        <option value="mft">Micro Four Thirds</option>
        <option value="1inch">1 Inch</option>
      </select>

      <p>Manufacturer:</p>
      <select onChange={(e) => setManufacturer(e.target.value)}>
        <option value="">Select manufacturer</option>
        <option value="sony">Sony</option>
        <option value="canon">Canon</option>
        <option value="fujifilm">Fujifilm</option>
      </select>

      <p>Features:</p>

      <label><input type="checkbox" onChange={() => toggleFeature("log")} />Log</label>
      <label><input type="checkbox" onChange={() => toggleFeature("film")} />Film</label>
      <label><input type="checkbox" onChange={() => toggleFeature("ibis")} />IBIS</label>
      <label><input type="checkbox" onChange={() => toggleFeature("4k")} />4K</label>

      <button onClick={() => setShowResults(true)}>Find Cameras</button>

      {showResults &&
        results.map((cam, index) => (
          <div key={index}>
            <p>{cam.name}</p>
            {ebayPrices[cam.name] ? (
              <p>Market Price: {ebayPrices[cam.name]}</p>
            ) : (
              <p>Loading price...</p>
            )}
            <a
              href={`https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(cam.name)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on eBay
            </a>
            <hr />
          </div>
        ))}
    </div>
  );
}
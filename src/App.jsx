import { useState, useEffect } from "react";

import cameras from "./data/cameras";

export default function App() {
  const [budget, setBudget] = useState("");
  const [useCase, setUseCase] = useState("");
  const [minISO, setMinISO] = useState("");
  const [minMP, setMinMP] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [frame, setFrame] = useState("");
  const [features, setFeatures] = useState([]);
  const [ebayImages, setEbayImages] = useState({});
  const [ebayPrices, setEbayPrices] = useState({});
  const [showResults, setShowResults] = useState(false);


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
      const res = await fetch("/api/ebay", {
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
      setEbayImages((prev) => ({
        ...prev,
        [name]: data.image,
      }));
    } catch {
      setEbayPrices((prev) => ({
        ...prev,
        [name]: "N/A",
      }));
      setEbayImages((prev) => ({
        ...prev,
        [name]: null,
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

      <br /><br />

      <p>Use case:</p>
      <select onChange={(e) => setUseCase(e.target.value)}>
        <option value="">Select use case</option>
        <option value="Photo">Photography</option>
        <option value="Video">Video</option>
        <option value="Hybrid">Hybrid</option>
        <option value="Vlog">Vlogging</option>
      </select>

      <br /><br />
      <p>Minimum ISO:</p>
      <input type="number" id="minIso" placeholder="Min ISO" onChange={(e) => setMinISO(e.target.value)} />
      <br /><br />
      <p>Minimum Megapixel:</p>
      <input type="number" id="minMP" placeholder="Min Megapixel" onChange={(e) => setMinMP(e.target.value)} />

      <br /><br />
      
      <p>Frame:</p>
      <select onChange={(e) => setFrame(e.target.value)}>
        <option value="">Select frame</option>
        <option value="Full Frame">Full Frame</option>
        <option value="APS-C">APS-C</option>
        <option value="Micro Four Thirds">Micro Four Thirds</option>
        <option value="1 Inch">1 Inch</option>
      </select>

      <br /><br />

      <p>Manufacturer:</p>
      <select onChange={(e) => setManufacturer(e.target.value)}>
        <option value="">Select manufacturer</option>
        <option value="Sony">Sony</option>
        <option value="Canon">Canon</option>
        <option value="Fujifilm">Fujifilm</option>
      </select>

      <br /><br />

      <p>Features:</p>

      <label><input type="checkbox" onChange={() => toggleFeature("Log")} />Log</label>
      <label><input type="checkbox" onChange={() => toggleFeature("Film Emulation")} />Film Emulation</label>
      <label><input type="checkbox" onChange={() => toggleFeature("IBIS")} />IBIS</label>
      <label><input type="checkbox" onChange={() => toggleFeature("4K")} />4K</label>

      <br /><br />

      <button onClick={() => setShowResults(true)}>Find Cameras</button>

      {showResults &&
        results.map((cam, index) => (
          <div key={index}>
            <p>{cam.name}</p>
            <img
              src={
                ebayImages[cam.name] ??
                "https://via.placeholder.com/150?text=No+Image"
              }
              alt={cam.name}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/150?text=No+Image";
              }}
              style={{ width: "150px", borderRadius: "8px" }}
            />
            {ebayPrices[cam.name] ? (
              <p>Market Price: ~{ebayPrices[cam.name]}</p>
            ) : (
              <p>Loading price...</p>
            )}
            <p>ISO: {cam.iso}</p>
            <p>Megapixels: {cam.mp}</p>
            <p>Frame: {cam.frame}</p>
            <p>Use: {cam.use.join(", ")}</p>
            <p>Features: {cam.features.join(", ")}</p>
            <p>Manufacturer: {cam.manufacturer}</p>
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
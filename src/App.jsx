import { useState, useEffect } from "react";

import cameras from "./data/cameras";
import fallbackImg from "./assets/fallback.png";
import logo from "./assets/logo.png";
import budgetIcon from "./assets/budget.png";
import usecaseIcon from "./assets/usecase.png";
import isoIcon from "./assets/iso.png";
import mpIcon from "./assets/megapixel.png";
import frameIcon from "./assets/frame.png";
import manufacturerIcon from "./assets/manufacturer.png";
import featuresIcon from "./assets/feature.png";

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
        useCase === "Photo & Video" &&
        cam.use.includes("Photo") && cam.use.includes("Video")) &&
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

    results.slice(0, 10).forEach((cam) => {
      if (!ebayPrices[cam.name]) {
        getEbayPrice(cam.name);
      }
    });
  }, [results, showResults]);

  return (
  <div>
    <div className="header">
      <img src={logo} alt="Logo"/>
      <h1>ShutterLab</h1>
    </div>
    <div className="layout">
      <div className="sidebar">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", transform: "translateX(-10px)" }}>
          <img src={budgetIcon} alt="Budget" style={{ width: "50px"}}/>
          <p>Budget:</p>
        </div>
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", transform: "translateX(-10px)"}}>
          <img src={usecaseIcon} alt="Use case" style={{ width: "50px"}}/>
          <p>Use case:</p>
        </div>
        <select onChange={(e) => setUseCase(e.target.value)}>
          <option value="">Select use case</option>
          <option value="Photo">Photography</option>
          <option value="Video">Video</option>
          <option value="Photo & Video">Photo & Video</option>
          <option value="Vlog">Vlogging</option>
        </select>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", transform: "translateX(-10px)"}}>
          <img src={isoIcon} alt="ISO" style={{ width: "50px"}}/>
          <p>Minimum ISO:</p>
        </div>
        <input type="number" id="minIso" placeholder="Min ISO" onChange={(e) => setMinISO(e.target.value)} />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", transform: "translateX(-10px)"}}>
          <img src={mpIcon} alt="Megapixel" style={{ width: "50px"}}/>
          <p>Minimum Megapixel:</p>
        </div>
        <input type="number" id="minMP" placeholder="Min Megapixel" onChange={(e) => setMinMP(e.target.value)} />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", transform: "translateX(-10px)"}}>
          <img src={frameIcon} alt="Frame" style={{ width: "50px"}}/>
          <p>Frame:</p>
        </div>
        <select onChange={(e) => setFrame(e.target.value)}>
          <option value="">Select frame</option>
          <option value="Full Frame">Full Frame</option>
          <option value="APS-C">APS-C</option>
          <option value="Micro Four Thirds">Micro Four Thirds</option>
          <option value="1 Inch">1 Inch</option>
        </select>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", transform: "translateX(-10px)"}}>
          <img src={manufacturerIcon} alt="Manufacturer" style={{ width: "50px"}}/>
          <p>Manufacturer:</p>
        </div>

        <select onChange={(e) => setManufacturer(e.target.value)}>
          <option value="">Select manufacturer</option>
          <option value="Sony">Sony</option>
          <option value="Canon">Canon</option>
          <option value="Fujifilm">Fujifilm</option>
        </select>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", transform: "translateX(-5px)"}}>
          <img src={featuresIcon} alt="Features" style={{ width: "50px"}}/>
          <p>Features:</p>
        </div>

        <label><input type="checkbox" onChange={() => toggleFeature("Log")} />Log</label>
        <label><input type="checkbox" onChange={() => toggleFeature("Film Emulation")} />Film Emulation</label>
        <label><input type="checkbox" onChange={() => toggleFeature("IBIS")} />IBIS</label>
        <label><input type="checkbox" onChange={() => toggleFeature("4K")} />4K</label>
        <br/><br/>
        <button className="findCameras" onClick={() => setShowResults(true)}>Find Cameras</button>
      </div>
      <div className="results">
        {!showResults ? (
        <p style={{ textAlign: "center", marginTop: "250px", color: "#777"}}>
          Select your preferences and click "Find Cameras" to see results
        </p>
      ) : (
        results.slice(0,10).map((cam, index) => (
          <div key={index}>
              <p>{cam.name}</p>
              <img
                src={
                  ebayImages[cam.name] ??
                  fallbackImg
                }
                alt={cam.name}
                onError={(e) => {
                  e.target.src = fallbackImg;
                }}
                style={{ width: "120px", borderRadius: "8px" }}
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
          ))
        )}
        </div>
      </div>
    </div>
  );
}
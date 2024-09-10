import React, { useState, useEffect } from "react";

// Main Simulation Component
const Simulation = () => {
  const [result, setResult] = useState("");
  const [path1, setPath1] = useState([]);
  const [path2, setPath2] = useState([]);

        useEffect(() => {
            const fetchPath1 = async () => {
              try {
                const response1 = await fetch("http://192.168.137.101:5007/path2");
                if (!response1.ok) throw new Error("Failed to fetch path2");
                const path1Data = await response1.json();
                console.log("Path1 Data:", path1Data);
                setPath1(path1Data);
              } catch (error) {
                console.error("Error fetching path1:", error);
                setResult(`Error: ${error.message}`);
              }
            };
          
            fetchPath1();
          }, []); // Empty dependency array ensures it runs only once after the initial render
        
          useEffect(() => {
            const fetchPath2 = async () => {
              try {
                const response2 = await fetch("http://192.168.137.101:5007/path");
                if (!response2.ok) throw new Error("Failed to fetch path");
                const path2Data = await response2.json();
                console.log("Path2 Data:", path2Data);
                setPath2(path2Data);
              } catch (error) {
                console.error("Error fetching path2:", error);
                setResult(`Error: ${error.message}`);
              }
            };
          
            fetchPath2();
          }, []); // Empty dependency array ensures it runs only once after the initial render
          

  const startSimulation = () => {
    
     simulateASV1(path1); // Check if path1 has data
    simulateASV2(path2); // Check if path2 has data
  }

  const simulateASV1 = (path) => {
    const simulationDiv = document.getElementById("simulation1");
    const asvElement = document.createElement("div");
    asvElement.className = "asv w-2 h-2 bg-red-500 rounded-full absolute z-20";
    simulationDiv.appendChild(asvElement);

    let index = 0;
    const moveASV = () => {
      if (index < path.length) {
        const point = path[index];
        const nextPoint = path[index + 1];
        const scale = 2e5;
        const x = (point.lon - path[0].lon) * scale + simulationDiv.clientWidth / 2;
        const y = (point.lat - path[0].lat) * scale + simulationDiv.clientHeight / 2;

        console.log(`ASV1 Moving to: (${x}px, ${y}px)`); // Log movement
        asvElement.style.transform = `translate(${x}px, ${y}px)`;

        if (nextPoint) {
          drawLine(
            x,
            y,
            (nextPoint.lon - path[0].lon) * scale + simulationDiv.clientWidth / 2,
            (nextPoint.lat - path[0].lat) * scale + simulationDiv.clientHeight / 2
          );
        }

        index++;
        setTimeout(moveASV, 300);
      }
    };

    const drawLine = (x1, y1, x2, y2) => {
      const line = document.createElement("div");
      line.className = "absolute bg-lightgreen h-0.5 z-10";
      const length = Math.hypot(x2 - x1, y2 - y1);
      const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
      line.style.width = `${length}px`;
      line.style.transform = `translate(${x1}px, ${y1}px) rotate(${angle}deg)`;
      simulationDiv.appendChild(line);
    };

    moveASV();
  };

  const simulateASV2 = (path) => {
    const simulationDiv = document.getElementById("simulation2");
    const asvElement = document.createElement("div");
    asvElement.className = "asv w-2 h-2 bg-red-500 rounded-full absolute z-20";
    simulationDiv.appendChild(asvElement);

    const oilShip = document.querySelector(".oil-ship");
    const scale = 2e5;

    setInitialPosition(asvElement, oilShip);

    let index = 0;
    let isReturning = false;

    const moveASV = () => {
      if (index < path.length) {
        const point = path[index];
        const nextPoint = path[index + 1];
        const x = (point.lon - path[0].lon) * scale + simulationDiv.clientWidth / 2;
        const y = (point.lat - path[0].lat) * scale + simulationDiv.clientHeight / 2;

        console.log(`ASV2 Moving to: (${x}px, ${y}px)`); // Log movement
        asvElement.style.transform = `translate(${x}px, ${y}px)`;

        if (index === Math.floor(path.length / 2) && !isReturning) {
          setResult("ASV tank full, returning to oil responder's ship and will come again.");
          isReturning = true;
          moveToOilShip(() => {
            asvElement.style.transform = `translate(${x}px, ${y}px)`;
            index++;
            setTimeout(moveASV, 100);
          });
          return;
        }

        if (isReturning && index === path.length - 1) {
          setResult("Phase 1 completed");
          moveToOilShip(() => {
            alert("Phase 1 completed");
          });
          return;
        }

        if (nextPoint) {
          drawLine(
            x,
            y,
            (nextPoint.lon - path[0].lon) * scale + simulationDiv.clientWidth / 2,
            (nextPoint.lat - path[0].lat) * scale + simulationDiv.clientHeight / 2
          );
        }

        index++;
        setTimeout(moveASV, 100);
      }
    };

    const setInitialPosition = (asv, oilShip) => {
      const oilShipRect = oilShip.getBoundingClientRect();
      const simulationRect = simulationDiv.getBoundingClientRect();
      const oilShipX = oilShipRect.left - simulationRect.left;
      const oilShipY = oilShipRect.top - simulationRect.top;
      console.log(`ASV2 Initial Position: (${oilShipX}px, ${oilShipY}px)`); // Log initial position
      asv.style.transform = `translate(${oilShipX}px, ${oilShipY}px)`;
    };

    const drawLine = (x1, y1, x2, y2) => {
      const line = document.createElement("div");
      line.className = "absolute bg-blue-400 h-2 z-10";
      const length = Math.hypot(x2 - x1, y2 - y1);
      const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
      line.style.width = `${length}px`;
      line.style.transform = `translate(${x1}px, ${y1}px) rotate(${angle}deg)`;
      simulationDiv.appendChild(line);
    };

    const moveToOilShip = (callback) => {
      const oilShipRect = oilShip.getBoundingClientRect();
      const simulationRect = simulationDiv.getBoundingClientRect();
      const oilShipX = oilShipRect.left - simulationRect.left;
      const oilShipY = oilShipRect.top - simulationRect.top;
      asvElement.style.transform = `translate(${oilShipX}px, ${oilShipY}px)`;
      setTimeout(() => {
        if (callback) callback();
      }, 500);
    };

    moveASV();
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <button
        id="startBtn"
        onClick={startSimulation}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Start Simulation
      </button>
      <div className="flex mt-6 gap-6">
        <div className="flex flex-col items-center">
          <h2 className="mb-2">Concentric Circle Strategy</h2>
          <div
            id="simulation1"
            className="w-96 h-96 border border-black bg-black relative overflow-hidden"
          ></div>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="mb-2">Real-Time Simulation</h2>
          <div
            id="simulation2"
            className="w-96 h-96 relative overflow-hidden bg-gradient-to-b from-gray-500 via-gray-600 to-blue-400"
          >
            <div className="oil-ship w-3 h-3 bg-blue-500 rounded-full absolute top-2 right-2"></div>
          </div>
        </div>
      </div>
      <p id="result" className="mt-4 text-center text-lg">{result}</p>
    </div>
  );
};

export default Simulation;

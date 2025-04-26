
"use client"; // Ensures useState and hooks work properly in Next.js

import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FaTrash } from "react-icons/fa"; // Trash icon
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./globals.css"; // Ensure global styling is applied


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Home() {
  const [activities, setActivities] = useState([]);
  const [type, setType] = useState("Food");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [quantity, setQuantity] = useState("");

  // Activity lists
  const foodOptions = [
    "Nuts", "Fruits", "Junk Food", "Vegetables", "Protein Shake",
    "Rice", "Chocolate", "Eggs", "Chicken", "Milk"
  ];
  const offScreenOptions = [
    "Reading", "Meditation", "Walking", "Exercise", "Cooking",
    "Dancing", "Yoga", "Socializing", "Gardening", "Music"
  ];
  const onScreenOptions = [
    "Netflix", "Gaming", "YouTube", "Social Media", "Work on PC",
    "Online Shopping", "Scrolling Reels", "Coding", "Virtual Meetings", "Online Learning"
  ];

  const dopamineValues = {
    Nuts: 50, Fruits: 40, "Junk Food": 200, Vegetables: 60, "Protein Shake": 70,
    Rice: 45, Chocolate: 180, Eggs: 80, Chicken: 100, Milk: 60,
    Reading: 40, Meditation: 30, Walking: 45, Exercise: 50, Cooking: 60,
    Dancing: 90, Yoga: 35, Socializing: 120, Gardening: 55, Music: 110,
    Netflix: 210, Gaming: 220, YouTube: 200, "Social Media": 250, "Work on PC": 100,
    "Online Shopping": 190, "Scrolling Reels": 250, Coding: 120, "Virtual Meetings": 90, "Online Learning": 110
};


  const addActivity = () => {
    if (!selectedActivity || !quantity  || quantity <= 0) return;
    const newActivity = {
      name: selectedActivity,
      type: type,
      quantity: quantity,
      dopamine: dopamineValues[selectedActivity] * parseInt(quantity),
    };
    setActivities([...activities, newActivity]);
    setSelectedActivity("");
    setQuantity("");
    
  };

  const deleteActivity = (index) => {
    setActivities(activities.filter((_, i) => i !== index));
  };

  const totalDopamine = activities.reduce((sum, act) => sum + act.dopamine, 0);

  const data = {
    labels: activities.map((act) => act.name),
    datasets: [
      {
        label: "Dopamine Levels",
        data: activities.map((act) => act.dopamine),
        borderColor: "green",
        backgroundColor: "rgba(0, 255, 0, 0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Dopamine Levels Across Activities", // Graph Title
        font: {
          size: 18, // Adjust font size if needed
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Activities", // X-Axis Label
          font: {
            size: 14,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Dopamine Levels", // Y-Axis Label
          font: {
            size: 14,
          },
        },
      },
    },
  };
  

  const handleDownload = () => {
    const graphElement = document.querySelector(".graph-container");
    html2canvas(graphElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 190, 100);
      pdf.save("dopamine_tracker.pdf");
    });
  };

  

  return (
    <div className="container">
           <div className="spacing"></div> 
      <h1 className="app-title">DOPA-TRACK🧠</h1>
      <div className="spacing2"></div> 
      <p className="dopamine-info">
        Dopamine is a neurotransmitter responsible for motivation and pleasure. 
        Excess dopamine from unhealthy habits can lead to addiction, while a balanced 
        level keeps you focused and productive. Use this app to track and improve your habits!
      </p>
      <div className="spacing2"></div> 
      <div className="input-section">
        <select className="dropdown" onChange={(e) => setType(e.target.value)}>
          <option value="Off-Screen">Off-Screen Activity</option>
          <option value="On-Screen">On-Screen Activity</option>
          <option value="Food">Food</option>
        </select>

        <select
          className="dropdown"
          value={selectedActivity}
          onChange={(e) => setSelectedActivity(e.target.value)}
        >
          <option value="">Select {type}</option>
          {(type === "Food" ? foodOptions : type === "Off-Screen" ? offScreenOptions : onScreenOptions).map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <input
          className="input-box"
          type="number"
          placeholder={`Enter ${type === "Food" ? "Quantity" : "Hours"}`}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <button className="add-button" onClick={addActivity}>
          Add {type}
        </button>
      </div>

      <div className="spacing"></div> {/* Added spacing */}

      <h2 className="activity-header">Your Activities:</h2>
      
      <div className="activity-list">
        {activities.map((act, index) => (
          <div
            key={index}
            className={`activity-card ${act.type === "Food" ? "food-card" : act.type === "Off-Screen" ? "off-screen-card" : "on-screen-card"}`}
          >
            {act.name} ({act.type}) - {act.quantity} {act.type === "Food" ? (act.quantity > 1 ? "items" : "item") : "hours"} | Dopamine: {act.dopamine}

            <FaTrash
              className={`delete-icon ${act.type === "Food" ? "green-trash" : act.type === "Off-Screen" ? "blue-trash" : "red-trash"}`}
              onClick={() => deleteActivity(index)}
            />
          </div>
        ))}
      </div>

      <h3 className="total-dopamine">Total Dopamine: {totalDopamine}</h3>

      <div className="spacing"></div> {/* Added spacing */}

      <div className="graph-container">
      <Line data={data} options={options} />
        <div className="spacing2"></div> 
        <p className="axis-labels">X-Axis: Activities   |  Y-Axis: Dopamine Levels</p>
      </div>
      <div className="spacing2"></div> 
      <button className="download-button" onClick={handleDownload}>
        Download 
      </button>

      <div className="spacing"></div> {/* Added spacing */}
    </div>
  );
}






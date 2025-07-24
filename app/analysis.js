"use client"; // Ensures useState and hooks work properly in Next.js

import { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation"; // For potential navigation back
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

export default function Analysis() {
  const [savedGraphs, setSavedGraphs] = useState({});

  useEffect(() => {
    // Simulate fetching saved graphs from the main page (in a real app, this would come from a state management solution or props)
    const storedGraphs = JSON.parse(localStorage.getItem("savedGraphs") || "{}");
    setSavedGraphs(storedGraphs);
  }, []);

  const getDailyData = (dayActivities) => {
    if (!dayActivities || dayActivities.length === 0) return { labels: [], data: [] };
    return {
      labels: dayActivities.map((act) => act.name),
      datasets: [
        {
          label: "Dopamine Levels",
          data: dayActivities.map((act) => act.dopamine),
          borderColor: "green",
          backgroundColor: "rgba(0, 255, 0, 0.2)",
          tension: 0.4, // Slight curve for quirky feel
        },
      ],
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
  };

  return (
    <div className="container analysis-page">
      <div className="spacing"></div>
      <h1 className="app-title">Analysis</h1>
      <div className="spacing2"></div>

      <div className="graph-blocks">
        {[...Array(7)].map((_, index) => {
          const dayKey = `day${index + 1}`;
          const dayActivities = savedGraphs[dayKey] || [];
          const data = getDailyData(dayActivities);
          return (
            <div key={dayKey} className="graph-block">
              <h3 className="day-title">Day {index + 1}</h3>
              <div className="mini-graph">
                <Line data={data} options={options} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="spacing"></div>

      <div className="report-section">
        <h2 className="section-title">Report</h2>
        <p className="section-content">Detailed insights will appear here after analysis.</p>
      </div>

      <div className="spacing"></div>

      <div className="suggestion-section">
        <h2 className="section-title">Suggestions</h2>
        <p className="section-content">Personalized tips will be provided here.</p>
      </div>

      <div className="spacing"></div>
    </div>
  );
}
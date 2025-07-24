// "use client"; // Ensures useState and hooks work properly in Next.js

// import { useEffect, useState, useRef } from "react";
// import { Line, Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
// } from "chart.js";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import "../globals.css"; // Updated to point to root globals.css

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement
// );

// export default function Analysis() {
//   const [savedGraphs, setSavedGraphs] = useState({});
//   const [isLoading, setIsLoading] = useState(true); // Add loading state
//   const pageRef = useRef(null); // Ref for capturing the entire page

//   useEffect(() => {
//     // Load saved graphs from localStorage
//     const storedGraphs = localStorage.getItem("savedGraphs");
//     if (storedGraphs) {
//       setSavedGraphs(JSON.parse(storedGraphs));
//     } else {
//       console.log("No saved graphs found in localStorage");
//     }
//     setIsLoading(false); // Set loading to false after data is loaded
//   }, []);

//   const getDailyData = (dayActivities) => {
//     if (!dayActivities || dayActivities.length === 0) return { labels: [], data: [] };
//     return {
//       labels: dayActivities.map((act) => act.name),
//       datasets: [
//         {
//           label: "Dopamine Levels",
//           data: dayActivities.map((act) => act.dopamine),
//           borderColor: "green",
//           backgroundColor: "rgba(0, 255, 0, 0.2)",
//           tension: 0.4,
//         },
//       ],
//     };
//   };

//   // Aggregate total dopamine per day
//   const dailyTotals = Array(7)
//     .fill()
//     .map((_, index) => {
//       const dayKey = `day${index + 1}`;
//       const dayActivities = savedGraphs[dayKey] || [];
//       return dayActivities.reduce((sum, act) => sum + (act.dopamine || 0), 0);
//     });

//   // Calculate weekly total dopamine
//   const weeklyTotal = dailyTotals.reduce((sum, total) => sum + total, 0);

//   // Analyze activity types and quantities
//   const analyzeActivities = () => {
//     const activitySummary = { Food: 0, "Off-Screen": 0, "On-Screen": 0 };
//     const activityTime = { Food: 0, "Off-Screen": 0, "On-Screen": 0 };
//     const activityDetails = { Food: [], "Off-Screen": [], "On-Screen": [] };

//     Object.values(savedGraphs).forEach((dayActivities) => {
//       dayActivities.forEach((act) => {
//         activitySummary[act.type] += act.dopamine || 0;
//         activityTime[act.type] += parseInt(act.quantity);
//         activityDetails[act.type].push({ name: act.name, quantity: parseInt(act.quantity), dopamine: act.dopamine });
//       });
//     });

//     // Identify dominant and extreme activities
//     const insights = [];
//     for (const [type, total] of Object.entries(activityTime)) {
//       if (total > 10) { // High usage threshold
//         insights.push(`${type} activities total ${total} ${type === "Food" ? "items" : "hours"}, which may indicate overuse.`);
//       }
//       const highDopamineActs = activityDetails[type].filter(act => act.dopamine > 200);
//       if (highDopamineActs.length > 0) {
//         insights.push(`High dopamine spikes detected in ${type} from ${highDopamineActs.map(act => act.name).join(", ")}.`);
//       }
//     }

//     return { summary: activitySummary, time: activityTime, details: activityDetails, insights };
//   };

//   const { summary, time, details, insights } = analyzeActivities();

//   // Define activity limits
//   const limits = {
//     low: 0,
//     moderate: 3,
//     high: 6
//   };

//   // Personalized suggestions based on activity analysis
//   let suggestions = [];
//   if (weeklyTotal < 500) {
//     suggestions.push("Consider adding 1 hour of walking or reading to boost dopamine naturally.");
//   } else if (weeklyTotal >= 500 && weeklyTotal < 1000) {
//     suggestions.push("Maintain balance with 2 hours of exercise and limit screen time to 3 hours daily.");
//   } else {
//     suggestions.push("Reduce high-dopamine activities; limit gaming to 1 hour and try 30 minutes of meditation.");
//   }

//   // Add type-specific suggestions
//   for (const [type, total] of Object.entries(time)) {
//     if (total > limits.high) {
//       if (type === "On-Screen") {
//         const gamingTime = details[type].find(act => act.name === "Gaming")?.quantity || 0;
//         if (gamingTime > 3) {
//           suggestions.push(`Reduce gaming to 1 hour and replace with 30 minutes of walking.`);
//         }
//       } else if (type === "Food") {
//         suggestions.push(`Cut back on food intake to 3 items daily and add 1 hour of light exercise.`);
//       }
//     } else if (total > limits.moderate) {
//       suggestions.push(`Moderate ${type.toLowerCase()} activities to 3 ${type === "Food" ? "items" : "hours"} daily.`);
//     }
//   }

//   const trendData = {
//     labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
//     datasets: [
//       {
//         label: "Weekly Dopamine Trend",
//         data: dailyTotals,
//         borderColor: "#ff6384",
//         backgroundColor: "rgba(255, 99, 132, 0.2)",
//         tension: 0.4,
//       },
//     ],
//   };

//   const trendOptions = {
//     responsive: true,
//     plugins: {
//       legend: { position: "top" },
//       title: {
//         display: true,
//         text: "Weekly Dopamine Trend",
//         font: { size: 18 },
//       },
//     },
//     scales: {
//       y: {
//         title: {
//           display: true,
//           text: "Dopamine Levels",
//           font: { size: 14 },
//         },
//       },
//     },
//   };

//   const dopaminePieData = {
//     labels: ["Food", "Off-Screen", "On-Screen"],
//     datasets: [
//       {
//         data: [summary.Food, summary["Off-Screen"], summary["On-Screen"]],
//         backgroundColor: ["#80ff63ff", "#36A2EB", "#ff5656ff"],
//         hoverOffset: 4,
//       },
//     ],
//   };

//   const timePieData = {
//     labels: ["Food", "Off-Screen", "On-Screen"],
//     datasets: [
//       {
//         data: [time.Food, time["Off-Screen"], time["On-Screen"]],
//         backgroundColor: ["#80ff63ff", "#36A2EB", "#ff5656ff"],
//         hoverOffset: 4,
//       },
//     ],
//   };

//   const pieOptions = {
//     responsive: true,
//     plugins: {
//       legend: { position: "top" },
//       title: { display: false },
//     },
//   };

//   const handleDownloadPDF = () => {
//     const input = pageRef.current;
//     html2canvas(input, { scale: 2, useCORS: true, allowTaint: true }).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF("p", "mm", "a4");
//       const width = pdf.internal.pageSize.getWidth();
//       const height = (canvas.height * width) / canvas.width;
//       pdf.addImage(imgData, "PNG", 0, 0, width, height);
//       pdf.save("dopamine_analysis_report.pdf");
//     });
//   };

//   if (isLoading) {
//     return <div className="container">Loading...</div>; // Show loading state
//   }

//   return (
//     <div className="container analysis-page" ref={pageRef}>
//       <div className="spacing"></div>
//       <h1 className="app-title" style={{ fontSize: "2.5em", fontWeight: "bold" }}>Analysis Report</h1>
//       <div className="spacing2"></div>

//       <div className="graph-blocks" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }} >
//         {[...Array(7)].map((_, index) => {
//           const dayKey = `day${index + 1}`;
//           const dayActivities = savedGraphs[dayKey] || [];
//           const data = getDailyData(dayActivities);
//           return (
//             <div key={dayKey} className="graph-block" style={{ width: '300px', height: '250px' }}>
//               <h3 className="day-title">Day {index + 1}</h3>
//              <div className="mini-graph" style={{ height: '180px' }}>
//                 <Line data={data} options={{ responsive: true, maintainAspectRatio: false }} />
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <div className="spacing"></div>

//       <div className="pie-charts" style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap' }}>
//         <div className="pie-chart">
//           <h3 className="chart-title">Dopamine by Activity Type</h3>
//           <Pie data={dopaminePieData} options={pieOptions} />
//         </div>
//         <div className="pie-chart">
//           <h3 className="chart-title">Time/Quantity by Activity Type</h3>
//           <Pie data={timePieData} options={pieOptions} />
//         </div>
//       </div>

//       <div className="spacing"></div>

//       <div className="trend-section">
//         <h2 className="section-title">Weekly Trend</h2>
//         <p className="section-content">Total Dopamine for the Week: {weeklyTotal}</p>
//         <div className="trend-graph" style={{ display: 'flex', justifyContent: 'center' }}>
//   <div style={{ width: '80%', maxWidth: '700px' }}>
//     <Line data={trendData} options={trendOptions} />
//   </div>
// </div>

//         <p className="section-content">Average/Expected Range: 500–1000 (balanced dopamine levels)</p>
//       </div>

//       <div className="spacing"></div>

//       <div className="issues-section">
//         <h2 className="section-title">Issues</h2>
//         <ul>
//   {insights.map((insight, index) => (
//     <li key={index} className="section-content">⚠️ {insight}</li>
//   ))}
// </ul>

//       </div>

//       <div className="spacing"></div>

//      <h2 className="section-title" style={{ marginTop: "2rem" }}>Suggestions</h2>
// <ul style={{ paddingLeft: "1.5rem" }}>
//   {suggestions.map((suggestion, index) => (
//     <li key={index} style={{ marginBottom: "0.5rem", fontSize: "1.05rem" }}>
//       💡 {suggestion}
//     </li>
//   ))}
// </ul>


//       <div className="spacing"></div>
//       <button className="download-button" onClick={handleDownloadPDF}>
//         Download PDF
//       </button>
//       <div className="spacing"></div>
//     </div>
//   );
// }




"use client";

import { useEffect, useState, useRef } from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "../globals.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Analysis() {
  const [savedGraphs, setSavedGraphs] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // New Refs for multi-page PDF
  const graphSectionRef = useRef(null);
  const pieTrendSectionRef = useRef(null);
  const suggestionSectionRef = useRef(null);

  useEffect(() => {
    const storedGraphs = localStorage.getItem("savedGraphs");
    if (storedGraphs) {
      setSavedGraphs(JSON.parse(storedGraphs));
    }
    setIsLoading(false);
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
          tension: 0.4,
        },
      ],
    };
  };

  const dailyTotals = Array(7)
    .fill()
    .map((_, index) => {
      const dayKey = `day${index + 1}`;
      const dayActivities = savedGraphs[dayKey] || [];
      return dayActivities.reduce((sum, act) => sum + (act.dopamine || 0), 0);
    });

  const weeklyTotal = dailyTotals.reduce((sum, total) => sum + total, 0);

  const analyzeActivities = () => {
    const activitySummary = { Food: 0, "Off-Screen": 0, "On-Screen": 0 };
    const activityTime = { Food: 0, "Off-Screen": 0, "On-Screen": 0 };
    const activityDetails = { Food: [], "Off-Screen": [], "On-Screen": [] };

    Object.values(savedGraphs).forEach((dayActivities) => {
      dayActivities.forEach((act) => {
        activitySummary[act.type] += act.dopamine || 0;
        activityTime[act.type] += parseInt(act.quantity);
        activityDetails[act.type].push({
          name: act.name,
          quantity: parseInt(act.quantity),
          dopamine: act.dopamine,
        });
      });
    });

    const insights = [];
    for (const [type, total] of Object.entries(activityTime)) {
      if (total > 10) {
        insights.push(`${type} activities total ${total} ${type === "Food" ? "items" : "hours"}, which may indicate overuse.`);
      }
      const highDopamineActs = activityDetails[type].filter((act) => act.dopamine > 200);
      if (highDopamineActs.length > 0) {
        insights.push(`High dopamine spikes detected in ${type} from ${highDopamineActs.map((act) => act.name).join(", ")}.`);
      }
    }

    return { summary: activitySummary, time: activityTime, details: activityDetails, insights };
  };

  const { summary, time, details, insights } = analyzeActivities();

  const limits = { low: 0, moderate: 3, high: 6 };

  let suggestions = [];
  if (weeklyTotal < 500) {
    suggestions.push("Consider adding 1 hour of walking or reading to boost dopamine naturally.");
  } else if (weeklyTotal >= 500 && weeklyTotal < 1000) {
    suggestions.push("Maintain balance with 2 hours of exercise and limit screen time to 3 hours daily.");
  } else {
    suggestions.push("Reduce high-dopamine activities; limit gaming to 1 hour and try 30 minutes of meditation.");
  }

  for (const [type, total] of Object.entries(time)) {
    if (total > limits.high) {
      if (type === "On-Screen") {
        const gamingTime = details[type].find((act) => act.name === "Gaming")?.quantity || 0;
        if (gamingTime > 3) {
          suggestions.push(`Reduce gaming to 1 hour and replace with 30 minutes of walking.`);
        }
      } else if (type === "Food") {
        suggestions.push(`Cut back on food intake to 3 items daily and add 1 hour of light exercise.`);
      }
    } else if (total > limits.moderate) {
      suggestions.push(`Moderate ${type.toLowerCase()} activities to 3 ${type === "Food" ? "items" : "hours"} daily.`);
    }
  }

  const trendData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: [
      {
        label: "Weekly Dopamine Trend",
        data: dailyTotals,
        borderColor: "#ff6384",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const trendOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Weekly Dopamine Trend",
        font: { size: 18 },
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Dopamine Levels",
          font: { size: 14 },
        },
      },
    },
  };

  const dopaminePieData = {
    labels: ["Food", "Off-Screen", "On-Screen"],
    datasets: [
      {
        data: [summary.Food, summary["Off-Screen"], summary["On-Screen"]],
        backgroundColor: ["#80ff63ff", "#36A2EB", "#ff5656ff"],
        hoverOffset: 4,
      },
    ],
  };

  const timePieData = {
    labels: ["Food", "Off-Screen", "On-Screen"],
    datasets: [
      {
        data: [time.Food, time["Off-Screen"], time["On-Screen"]],
        backgroundColor: ["#80ff63ff", "#36A2EB", "#ff5656ff"],
        hoverOffset: 4,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: false },
    },
  };

  // ✅ Multi-page download
  const handleDownloadPDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();

    const addSectionToPDF = async (ref, addNewPage) => {
      const canvas = await html2canvas(ref.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pageWidth) / imgProps.width;
      if (addNewPage) pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, 0, pageWidth, imgHeight);
    };

    await addSectionToPDF(graphSectionRef, false);      // Page 1
    await addSectionToPDF(pieTrendSectionRef, true);    // Page 2
    await addSectionToPDF(suggestionSectionRef, true);  // Page 3

    pdf.save("dopamine_analysis_report.pdf");
  };

  if (isLoading) return <div className="container">Loading...</div>;

  return (
    <div className="container analysis-page">
      <div className="spacing"></div>
      <h1 className="app-title" style={{ fontSize: "2.5em", fontWeight: "bold" }}>Analysis Report</h1>
      <div className="spacing2"></div>

      <div ref={graphSectionRef} className="graph-blocks" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {[...Array(7)].map((_, index) => {
          const dayKey = `day${index + 1}`;
          const dayActivities = savedGraphs[dayKey] || [];
          const data = getDailyData(dayActivities);
          return (
            <div key={dayKey} className="graph-block" style={{ width: '300px', height: '250px' }}>
              <h3 className="day-title">Day {index + 1}</h3>
              <div className="mini-graph" style={{ height: '180px' }}>
                <Line data={data} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>
          );
        })}
      </div>

      <div ref={pieTrendSectionRef}>
        <div className="spacing"></div>
        <div className="pie-charts" style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div className="pie-chart">
            <h3 className="chart-title">Dopamine by Activity Type</h3>
            <Pie data={dopaminePieData} options={pieOptions} />
          </div>
          <div className="pie-chart">
            <h3 className="chart-title">Time/Quantity by Activity Type</h3>
            <Pie data={timePieData} options={pieOptions} />
          </div>
        </div>

        <div className="spacing"></div>
        <div className="trend-section">
          <h2 className="section-title">Weekly Trend</h2>
          <p className="section-content">Total Dopamine for the Week: {weeklyTotal}</p>
          <div className="trend-graph" style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '80%', maxWidth: '700px' }}>
              <Line data={trendData} options={trendOptions} />
            </div>
          </div>
          <p className="section-content">Average/Expected Range: 500–1000 (balanced dopamine levels)</p>
        </div>
      </div>

      <div ref={suggestionSectionRef}>
        <div className="spacing"></div>
        <div className="issues-section">
          <h2 className="section-title">Issues</h2>
          <ul>
            {insights.map((insight, index) => (
              <li key={index} className="section-content">⚠️ {insight}</li>
            ))}
          </ul>
        </div>

        <div className="spacing"></div>
        <h2 className="section-title" style={{ marginTop: "2rem" }}>Suggestions</h2>
        <ul style={{ paddingLeft: "1.5rem" }}>
          {suggestions.map((suggestion, index) => (
            <li key={index} style={{ marginBottom: "0.5rem", fontSize: "1.05rem" }}>
              💡 {suggestion}
            </li>
          ))}
        </ul>
      </div>

      <div className="spacing"></div>
      <button className="download-button" onClick={handleDownloadPDF}>
        Download PDF
      </button>
      <div className="spacing"></div>
    </div>
  );
}

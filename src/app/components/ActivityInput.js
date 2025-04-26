"use client"; // Ensures this component runs on the client side

import { useState } from "react";

const ActivityInput = ({ addActivity }) => {
  const [activity, setActivity] = useState({
    name: "",
    category: "screen", // Default category
    duration: "",
    quantity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivity((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!activity.name || (!activity.duration && !activity.quantity)) return;

    addActivity(activity);
    setActivity({ name: "", category: "screen", duration: "", quantity: "" });
  };

  return (
    <div className="activity-input">
      <h3>Add Activity</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Activity Name"
          value={activity.name}
          onChange={handleChange}
          required
        />
        
        <select name="category" value={activity.category} onChange={handleChange}>
          <option value="screen">Screen Activity</option>
          <option value="offline">Offline Activity</option>
          <option value="food">Food</option>
        </select>

        {activity.category === "food" ? (
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={activity.quantity}
            onChange={handleChange}
            required
          />
        ) : (
          <input
            type="number"
            name="duration"
            placeholder="Duration (hrs)"
            value={activity.duration}
            onChange={handleChange}
            required
          />
        )}

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default ActivityInput;

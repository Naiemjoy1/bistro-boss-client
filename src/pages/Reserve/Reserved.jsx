// Client-side changes (React.js)

import React, { useState, useEffect } from "react";
import axios from "axios";

const PhysicsSection = () => {
  const [capacity, setCapacity] = useState(2);
  const [checked, setChecked] = useState(false);
  const [reservationName, setReservationName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch capacity and reservation status
    axios.get("/reservation").then((res) => {
      setCapacity(res.data.capacity);
      setChecked(res.data.checked);
    });
  }, []);

  const handleCheck = () => {
    axios
      .post("/reserve", { section: "Physics", capacity })
      .then((res) => {
        setCapacity(capacity - 1);
        setChecked(true);
        setError("");
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  const handleCancel = () => {
    axios
      .post("/cancel", { section: "Physics" })
      .then((res) => {
        setCapacity(capacity + 1);
        setChecked(false);
        setError("");
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  const handleConfirm = () => {
    axios
      .post("/confirm", { section: "Physics", name: reservationName })
      .then((res) => {
        // Handle confirmation success
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  return (
    <div>
      <h2>Physics Section</h2>
      <p>Capacity: {capacity}</p>
      <input
        type="checkbox"
        checked={checked}
        onChange={checked ? handleCancel : handleCheck}
        disabled={capacity === 0 || checked}
      />
      <label>{checked ? "Reserved" : "Check to reserve"}</label>
      {checked && (
        <>
          <input
            type="text"
            placeholder="Enter your name"
            value={reservationName}
            onChange={(e) => setReservationName(e.target.value)}
          />
          <button onClick={handleConfirm}>Confirm Reservation</button>
        </>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default PhysicsSection;

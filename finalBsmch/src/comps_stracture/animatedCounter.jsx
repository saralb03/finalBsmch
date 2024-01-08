// AnimatedCounter.jsx

import React, { useState, useEffect } from "react";

const AnimatedCounter = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let currentCount = 0;
    const duration = 2000; // You can adjust the duration as needed
    const increment = value > 0 ? 1 : -1;
    const step = Math.abs(Math.floor(duration / value));

    const timer = setInterval(() => {
      currentCount += increment;
      setCount(currentCount);

      if (currentCount === value) {
        clearInterval(timer);
      }
    }, step);

    return () => clearInterval(timer);
  }, [value]);

  return <span className="display-4">{count}</span>;
};

export default AnimatedCounter;

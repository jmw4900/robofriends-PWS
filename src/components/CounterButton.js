import React, { useState } from "react";

const CounterButton = React.memo(color => {
  const [count, setCount] = useState(0);

  const updateCount = () => {
    setCount(count => {
      return count + 1;
    });
  };

  return (
    <button
      style={{
        color: { color }
      }}
      onClick={updateCount}
    >
      Count: {count}
    </button>
  );
});

export default CounterButton;

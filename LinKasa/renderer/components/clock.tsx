import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);

    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  function tick() {
    setTime(new Date());
  }

  return (
    <Typography variant="h5" fontWeight={{}} component="div">
      {time.toLocaleTimeString()}
    </Typography>
  );
}

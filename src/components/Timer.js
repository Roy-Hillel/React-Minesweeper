import React, { useState, useEffect } from "react"
let timeIntervalId
export default function Timer({ gameOver, sendTime }) {
  let [time, setTime] = useState(0)

  useEffect(() => {
    function incrementTime() {
      setTimeout(() => {
        let newTime = time + 1
        setTime(newTime)
      }, 1000)
    }
    if (time < 999 && !gameOver) incrementTime()
    else {
      sendTime(time)
    }
  }, [time])

  return (
    <div style={{ color: "black", fontSize: 20, paddingLeft: 30 }}>
      <span style={{ paddingRight: 10 }}>⏰</span>
      {time} s
    </div>
  )
}

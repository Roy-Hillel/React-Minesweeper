import React, { useState, useEffect } from "react"
import "./Modal.css"

export default function Modal({ restartGame, gameResult, timeResult }) {
  const [render, setRender] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setRender(true)
    }, 1000)
  }, [])

  const WinSection = () => {
    return (
      <div id="gameOverImage" className="won">
        <div className="title">
          You Win! &nbsp; &nbsp; &nbsp;&nbsp; ⏰ {timeResult} s
        </div>
      </div>
    )
  }
  const LoseSection = () => {
    return (
      <div id="gameOverImage" className="lost">
        <div className="title">
          You Lost... &nbsp; &nbsp; &nbsp;&nbsp; ⏰ &nbsp;{timeResult} s
        </div>
      </div>
    )
  }
  return (
    <div
      style={{
        opacity: render ? 1 : 0,
        height: "100%",
        width: "50%",
        position: "absolute",
        background: "rgba(0,0,0,0.5)",
      }}
    >
      {gameResult ? <WinSection /> : <LoseSection />}
      <div className="tryAgain" onClick={restartGame}>
        ↻ &nbsp; Play Again
      </div>
    </div>
  )
}

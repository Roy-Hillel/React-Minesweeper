import React from "react"
import "./Cell.css"

export default function Cell({ difficulty, details, updateFlag, revealCell }) {
  const revealedNumbers = {
    1: "#1976d2",
    2: "#388d3c",
    3: "#d33030",
    4: "#7c21a2",
    5: "#1976d2",
    6: "#1976d2",
    else: "white",
  }
  const cellStyle = {
    background: details.revealed
      ? details.value === "X"
        ? "#f79d85"
        : revealedColor(details.x, details.y)
      : unRevealedColor(details.x, details.y),
    color:
      details.value <= 6
        ? revealedNumbers[details.value]
        : revealedNumbers["else"],
  }
  const difficultyClass =
    difficulty === 0 ? "easy" : difficulty === 1 ? "medium" : "hard"
  const classes = `cell ${difficultyClass}`

  return (
    <div>
      <div
        onContextMenu={(e) => updateFlag(e, details.x, details.y)}
        onClick={() => revealCell(details.x, details.y)}
        style={cellStyle}
        className={classes}
      >
        {details.value === "Y"
          ? "🌸"
          : !details.revealed && details.flagged
          ? "📍"
          : details.revealed && details.value !== 0
          ? details.value === "X"
            ? "👹"
            : details.value
          : details.revealed
          ? "👼🏻"
          : ""}
      </div>
    </div>
  )
}

function revealedColor(x, y) {
  if (x % 2 === 0 && y % 2 === 0) {
    return "#d4b597"
  } else if (x % 2 === 0 && y % 2 !== 0) {
    return "#e3c19e"
  } else if (x % 2 !== 0 && y % 2 === 0) {
    return "#e3c19e"
  } else {
    return "#d4b597"
  }
}

function unRevealedColor(x, y) {
  if (x % 2 === 0 && y % 2 === 0) {
    return "#a2d149"
  } else if (x % 2 === 0 && y % 2 !== 0) {
    return "#aad751"
  } else if (x % 2 !== 0 && y % 2 === 0) {
    return "#aad751"
  } else {
    return "#a2d149"
  }
}

import "./Game.css"
import { useState } from "react"
import Board from "../Board"
import Diff from "../Difficulty"

const Game = () => {
  const [diffG, setDiffG] = useState(0)
  const changeDiff = (diff) => {
    setDiffG(diff)
  }
  return (
    <div>
      <h1 style={{ display: "flex" }}>Minesweeper</h1>{" "}
      <Diff changeDiff={changeDiff} />
      <Board diff={diffG} />
    </div>
  )
}

export default Game

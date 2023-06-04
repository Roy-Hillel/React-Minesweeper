import * as React from "react"
import { useState } from "react"
import "@coreui/coreui/dist/css/coreui.min.css"
import {
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from "@coreui/react"

const Difficulty = (props) => {
  const [diff, setDiff] = useState(0)
  const handleOnChange = (d) => {
    setDiff(d)
    props.changeDiff(d)
    console.log(`diff set to : ${diff}`)
  }
  return (
    <div style={{ display: "flex", marginTop: "30px" }}>
      <CDropdown>
        <CDropdownToggle color="secondary">Choose difficulty</CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem onClick={() => handleOnChange(0)}>Easy</CDropdownItem>
          <CDropdownItem onClick={() => handleOnChange(1)}>
            Medium
          </CDropdownItem>
          <CDropdownItem onClick={() => handleOnChange(2)}>Hard</CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </div>
  )
}

export default Difficulty

import React from 'react'
import { moveClockwise, moveCounterClockwise } from '../state/action-creators'
import { connect } from 'react-redux'

function Wheel(props) {
  const wheelArr = ['','','','','','']
  console.log(props)
  const handleClick = (direction) =>{
    direction==="up"?props.moveClockwise():props.moveCounterClockwise()
  }
  return (
    <div id="wrapper">
      <div id="wheel">
        {wheelArr.map((cog, idx)=>{
          return <div key={idx} className={idx===props.wheel?"cog active":"cog"} style={{ "--i": idx }}>{idx===props.wheel?"B":cog}</div>
        })}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={()=>handleClick("up")} >Counter clockwise</button>
        <button id="clockwiseBtn" onClick={()=>handleClick("down")}>Clockwise</button>
      </div>
    </div>
  )
}

export default connect(st=>st, {moveClockwise, moveCounterClockwise})(Wheel);

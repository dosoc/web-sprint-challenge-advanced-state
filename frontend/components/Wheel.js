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
        {/* <div className="cog active" style={{ "--i": 0 }}>B</div>
        <div className="cog" style={{ "--i": 1 }}></div>
        <div className="cog" style={{ "--i": 2 }}></div>
        <div className="cog" style={{ "--i": 3 }}></div>
        <div className="cog" style={{ "--i": 4 }}></div>
        <div className="cog" style={{ "--i": 5 }}></div>--i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={()=>handleClick("up")} >Counter clockwise</button>
        <button id="clockwiseBtn" onClick={()=>handleClick("down")}>Clockwise</button>
      </div>
    </div>
  )
}

export default connect(st=>st, {moveClockwise, moveCounterClockwise})(Wheel);

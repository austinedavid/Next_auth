"use client"
import React, {useState} from 'react'

const Substring = () => {
    const[expanded, setexpanded] = useState(false)
    const[getcolor, setgetcolor] = useState("white")
    const ourString = "the people that said that we won't make it are actually the one suffering from it now, thank God for life at last"
    const subString = ourString.substring(0,40)
    const cancatedDot = subString.concat("...")
    const handleClick = ()=>{
        setexpanded((prev)=> !prev)
    }
    return (
    <div style={{width: "230px", border: "1px solid black", height: "200px", padding: 3, backgroundColor: getcolor}}>
        <input type='color' onChange={(e)=>setgetcolor(e.target.value)}/>
        <p>
            {ourString.length > 40 && !expanded? cancatedDot :ourString } 
            <span style={{color: "blue", cursor: "pointer", marginLeft: 2}} onClick={handleClick}>{expanded? "see less": "see more"}</span>
        </p>
        <p>{getcolor}</p>
        <input type='text'/>
    </div>
  )
}

export default Substring
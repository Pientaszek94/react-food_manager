import React, { useState } from 'react'
import '../styles/favourites.scss'
import Posts from './Posts'

function Favourites(props) {
        
    const [catIndex, setCatIndex]=useState(0)
    const categories=["recipes","tips"]

  return (
    <div className="favourites">
        {
            categories.map((key, index)=>(
                <button key={index} style={{borderBottom:`${catIndex==index?"2px solid orange":"none"}`}} 
                        onClick={()=>setCatIndex(index)} className=''>{key.charAt(0).toUpperCase()+key.slice(1)}</button>
            ))
        }
        <div className="carousel-container">
            <div className="slider" 
                style={{marginLeft:`${-100 * catIndex}%`}}>
                {
                    categories.map((key, index)=>(
                        <div className='slides' style={{opacity:`${catIndex==index?"1":"0"}`}} key={index}>
                            Here You can see Your favourite {key}
                            {
                                key=="recipes"
                                ?<Posts {...props}/>
                                :null
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Favourites
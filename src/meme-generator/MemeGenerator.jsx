import React, { useEffect, useState } from "react";
import Header from './Header';
import './meme.css'

function MemeGenerator () {
        
    const [counter, setCounter] = useState(0)
    const [randomImg, setRandomImg] = useState("https://cdn.kapwing.com/samples/5bca3d1f902b224bc06e48aa.jpg")
    const [data, setData] = useState([])
    const [pageCounter, setPageCounter] = useState(1)

    useEffect(() => {
        fetch(`/api/${pageCounter}`)
          .then((res) => res.json())
          .then((data) => setData(Object.values(data)));
      }, [pageCounter]);

    const handleGenerate = (event) => {
        event.preventDefault()
        setCounter(prevCounter => prevCounter < data.length - 1 ? prevCounter + 1 : 0)
        // console.log(data)
        setRandomImg(data[counter])
    }
    
    const incrementPageCounter = (event) => {
        event.preventDefault()
        setPageCounter(prevPageCounter => prevPageCounter + 1)
        setCounter(0)
        // setRandomImg(data[counter])
    }

    return ( 
        <div>
            <Header />
            <div className="meme-form">

                <div className="progress">
                    <div className="progress-bar bg-success" role="progressbar" aria-valuemin="0" aria-valuemax="100"
                        style={{"width": ((counter / data.length) * 100) + "%"}}>
                    </div>
                </div>
                <br/>
                <button className="btn btn-primary" onClick={handleGenerate}>
                    Generate
                </button>
                <button className="btn btn-success ml-2" onClick={incrementPageCounter}>
                    <i className="fa fa-refresh" aria-hidden="true" />
                </button>
            </div>
            <div className="meme">
                {randomImg ? <img src={randomImg} alt=""/> : <div>"Loading..."</div>}
            </div>
        </div>
    )
}

export default MemeGenerator;
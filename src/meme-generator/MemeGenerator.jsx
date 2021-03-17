import React, { useEffect, useState } from 'react';
import Header from './Header';
import './meme.css'
import Loader from 'react-loader-spinner';

function MemeGenerator () {
        
    const [counter, setCounter] = useState(0)
    const [randomImg, setRandomImg] = useState(null)
    const [data, setData] = useState([])
    const [apiPageCounter, setApiPageCounter] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        handleIsLoading()
        fetch(`/api/${apiPageCounter}`)
        .then((res) => res.json())
        .then((data) => setData(Object.values(data)))
    }, [apiPageCounter]);

    useEffect(() => {
        setRandomImg(data[counter])
    }, [data, counter])

    const handleGenerate = (event) => {
        event.preventDefault()
        setCounter(prevCounter => prevCounter + 1 < data.length ? prevCounter + 1 : 0)
    }
    
    const incrementapiPageCounter = () => {
        setApiPageCounter(prevapiPageCounter => prevapiPageCounter + 1)
        setCounter(0)
    }

    const handleIsLoading = () => {
        setIsLoading(true)
        setTimeout(() => {setIsLoading(false)}, 800)
    }

    return ( 
        <div>
            <Header />
            <div className="meme-form">

                <div className="progress">
                    <div className="progress-bar bg-success" role="progressbar" aria-valuemin="0" aria-valuemax="100"
                        style={{"width": ((counter / (data.length - 1)) * 100) + "%"}}>
                    </div>
                </div>
                <br/>
                <button className={"btn btn-success w-10 " + (isLoading ? "disabled" : "")} onClick={incrementapiPageCounter}>
                    <i className="fa fa-refresh mr-2" aria-hidden="true" />Get More
                </button>
                <button className={"btn btn-primary ml-2 w-10 " + (isLoading ? "disabled" : "")} onClick={handleGenerate}>Next
                    <i className="fa fa-arrow-right ml-2" aria-hidden="true" />
                </button>
            </div>
            {isLoading ? 
                <div className="loader-div">
                    <Loader type="ThreeDots" color="#00BFFF" height={100} width={100} timeout={750} />
                </div> :
                <div className="meme">
                    {randomImg ? <img src={randomImg} alt=""/> : <div><Loader type="ThreeDots" color="#00BFFF" height={100} width={100}/></div>}
                </div>
            }
        </div>
    )
}

export default MemeGenerator;
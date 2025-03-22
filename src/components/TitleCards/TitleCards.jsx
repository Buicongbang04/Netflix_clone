import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';



const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([]);

  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MjlkYzk3ZWFhZDU0NDYyM2Q2ODkyZDYzOWFjOTA2MiIsIm5iZiI6MTc0MjY1ODc5MS44MjQsInN1YiI6IjY3ZGVkY2U3ZTJiZDEzNWZjYWY1NDEzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oKsY3WPVpbtPnklwiDpXqxckDPxQGu9vgb_-SdJuJCQ'
    }
  };
  
  fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));

  const handleWheel = (e) => {
        e.preventDefault();
        cardsRef.current.scrollLeft += e.deltaY;
  }
  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel', handleWheel)
  }, [])

  return (
    <div className='titlecards'>
      <h2>{title ? title :"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards

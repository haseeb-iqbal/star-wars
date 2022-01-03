import React from "react";
import './movie-card.styles.scss';
import { useNavigate } from "react-router-dom";
 const MovieCard = (props) => 
     {
        let navigate = useNavigate();
        return(
            <div className="card">
                <div className='description' >
                    <div className="title">
                    {props.movieName}
                    </div>
                    <img src={process.env.PUBLIC_URL + './Images/Posters/episode1.jpg'} className="poster"onClick={()=>{navigate(`/movie/${props.movieId}`)}}/>

                </div>
                <div className="button-container">
                    <button className="movie-buttons" onClick={()=>props.onFavouriteClick(props.episodeId)}>{props.isFavourite ?'Unfavourite':'Favourite'}</button>
                    <button className="movie-buttons" onClick={()=>{navigate(`/movie/${props.movieId}`)}}>View Details</button>
                </div>
            </div>
        )
    };

export default MovieCard;
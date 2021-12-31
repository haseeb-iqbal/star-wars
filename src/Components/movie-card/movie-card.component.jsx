import React from "react";
import './movie-card.styles.scss';
import { useNavigate } from "react-router-dom";

 const MovieCard = (props) => 
     {
        let navigate = useNavigate();
        return(
            <div className="card">
                <div className='description' onClick={()=>{navigate(`/movie/${props.movieId}`)}}>
                    {props.movieName}
                </div>
                <div className="favourite-button">
                    <button onClick={()=>props.onFavouriteClick(props.episodeId)}>{props.isFavourite ?'Unfavourite':'Favourite'}</button>
                </div>
            </div>
        )
    };
export default MovieCard;
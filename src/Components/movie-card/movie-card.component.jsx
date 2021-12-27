import React from "react";
import './movie-card.styles.scss';

 const MovieCard = (props) => (
    <div className="card">
        <div className='description' >
            {props.movieName}
        </div>
        <div className="favourite-button">
            <button onClick={()=>props.onFavouriteClick(props.movieId)}>{props.isFavourite ?'Unfavourite':'Favourite'}</button>
        </div>
    </div>);

export default MovieCard;
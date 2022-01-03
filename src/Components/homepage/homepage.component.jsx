import React from "react";
import "./homepage.styles.scss";
import MovieCard from "../movie-card/movie-card.component";

class HomePage extends React.Component{
    constructor()
    {
        super();
        this.state={
            apiResponse:null,
            searchField:'',
            titles:null,
            favouriteMovies: []
        };
    }
    componentDidMount()
    {
        fetch('https://swapi.dev/api/films')
        .then(response=>response.json())
        .then(response => this.setState({apiResponse:response}));
    }

    displayMovieCard= () => {
        if(this.state.apiResponse!=null){
            const {apiResponse, searchField}=this.state;
            var filteredMovies =[];
            //Adding favourite movies first
            this.state.favouriteMovies.forEach(favouriteMovieId=>{
                    console.log(apiResponse.results.find(movie=> favouriteMovieId===movie.episode_id));
                    filteredMovies.push(apiResponse.results.find(movie=> ( favouriteMovieId==movie.episode_id)));
                });
            //Adding unfavourited movies
            apiResponse.results.forEach(movie=>
                {
                    if(!filteredMovies.includes(movie))
                    {
                        filteredMovies.push(movie);
                    }
                }
            );
            filteredMovies = filteredMovies.filter(movie=>
                this.GetFullMovieTitle(movie).toLowerCase().includes(searchField.toLocaleLowerCase()));
            console.log(filteredMovies);
            return filteredMovies.map(movie =><MovieCard movieName ={this.GetFullMovieTitle(movie)} isFavourite={this.state.favouriteMovies.includes(movie.episode_id)} 
                episodeId = {movie.episode_id} key = {movie.episode_id} onFavouriteClick ={this.onFavouriteClick} movieId={this.getMovieNumber(movie.url)}/>);
        }
    }

    GetFullMovieTitle(movie)
    {
        var toRoman = require('roman-numerals').toRoman;
        let movieInRoman = toRoman(movie.episode_id );
        return "Episode " + movieInRoman+": " +movie.title;
    }
    
    getMovieNumber(movieUrl)
    {
        let i =movieUrl.length-2;
        while(movieUrl[i]!= '/')
        {
            i--;
        }
        return movieUrl.substring(i+1,movieUrl.length-1);
    }

    onFavouriteClick = (movieId) =>{
        if(!this.state.favouriteMovies.includes(movieId))
        {
            this.setState(prevState=>
            ({favouriteMovies:[...prevState.favouriteMovies, movieId ]}));
        }
        else
        {
            this.setState((prevState)=>(
                {favouriteMovies: prevState.favouriteMovies.filter(id=>id!=movieId)}
            ));
        }
    }
    
  handleChange = e =>{
    this.setState({searchField:e.target.value});
  }

    render() {
    return(
    <div className="container">
        <div className="navbar">
            <div>(Placeholder Navbar)</div>
            <div>News</div>
            <div>Blog</div>
            <div>Community</div>
            <div>Games</div>
            <div>Videos</div>
        </div>
        <div className="lower-container">
            <div className="content">
                <input type="search" placeholder="search movie" className="search-bar" onChange={this.handleChange}/>
                <div className="movie-container">{this.displayMovieCard()}</div>    
            </div>
        </div>
    </div>
    )};
}

export default HomePage;
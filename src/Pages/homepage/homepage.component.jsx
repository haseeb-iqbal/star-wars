import React from "react";
import "./homepage.styles.scss";
import MovieCard from "../../Components/movie-card/movie-card.component";
import LoadingShadow from "../../Components/loading-shadow/loading-shadow.component";
import { GetFullMovieTitle } from "../../Utilities/utils";

class HomePage extends React.Component{
    constructor()
    {
        super();
        this.state={
            apiResponse:null,
            searchField:'',
            titles:null,
            favouriteMovies: [],
            featuresText:null,
            isLoaded:false
        };
    }
    componentDidMount()
    {
        //Loading fvourites from local storage if present
        var favouriteMovies=localStorage.getItem('favourite-movies');
        if(favouriteMovies!=null){
            this.setState({
                favouriteMovies:JSON.parse(favouriteMovies)
            });
        }

        //Fetching data to display
        fetch('/Data/Features.txt')
        .then((file) => file.text())
        .then(text  => {this.setState({featuresText:text})});

        fetch('https://swapi.dev/api/films')
        .then(response=>response.json())
        .then(response => this.setState({apiResponse:response,isLoaded:true}));

    }

    displayMovieCard= () => {
        if(this.state.apiResponse!=null){
            const {apiResponse, searchField}=this.state;
            var filteredMovies =[];
            //Adding favourite movies first
            this.state.favouriteMovies.forEach(favouriteMovieId=>{
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
            //filtering according to search
            filteredMovies = filteredMovies.filter(movie=>
                GetFullMovieTitle(movie).toLowerCase().includes(searchField.toLocaleLowerCase()));
            if(filteredMovies.length==0)
            {
                return <span>Movie not found</span>;
            }
            else{
                return filteredMovies.map(movie =><MovieCard movieName ={GetFullMovieTitle(movie)} isFavourite={this.state.favouriteMovies.includes(movie.episode_id)} 
                        episodeId = {movie.episode_id} key = {movie.episode_id} onFavouriteClick ={this.onFavouriteClick} movieId={this.getMovieNumber(movie.url)}/>);
            }
        }
    }

    
    getMovieNumber(movieUrl)
    {
        //getting MovieId via the url
        let i =movieUrl.length-2;
        while(movieUrl[i]!= '/')
        {
            i--;
        }
        return movieUrl.substring(i+1,movieUrl.length-1);
    }

    onFavouriteClick = (movieId) =>{
        //updating local storage and favouritng or unfavouriting
        var updateLocalStorage= ()=>localStorage.setItem('favourite-movies',JSON.stringify( this.state.favouriteMovies));
        if(!this.state.favouriteMovies.includes(movieId))
        {
            this.setState(prevState=>
            ({favouriteMovies:[...prevState.favouriteMovies, movieId ]}),updateLocalStorage);
        }
        else
        {
            this.setState((prevState)=>(
                {favouriteMovies: prevState.favouriteMovies.filter(id=>id!=movieId)}
            ),updateLocalStorage);
        }
    }
    
  handleChange = e =>{
    this.setState({searchField:e.target.value});
  }

    render() {
    if(this.state.isLoaded)
        return(
            <div className="main-container">

                <div className="lower-container">
                    <div className="content">
                        <input type="search" placeholder="search movie" className="search-bar" onChange={this.handleChange}/>
                        <div className="movie-container">{this.displayMovieCard()}</div>
                        <div className="features-container">{this.state.featuresText}</div>        
                    </div>
                </div>
            </div>
    )
    else
        return (<LoadingShadow/>)
        
    
}

}

export default HomePage;
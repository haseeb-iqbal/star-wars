import React from "react";
import "./flex-container.styles.scss";
import Logo from '../../assets/logo.png';
import MovieCard from "../movie-card/movie-card.component";

class FlexContainer extends React.Component{
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
        // console.log("getting swap");
        fetch('https://swapi.dev/api/films')
        .then(response=>response.json())
        .then(response => this.setState({apiResponse:response}
            // ,()=>{console.log(this.state.apiResponse.results[0].title)}
            ));
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
                movie.title.toLowerCase().includes(searchField.toLocaleLowerCase()));

            return filteredMovies.map(movie =><MovieCard movieName ={movie.title} isFavourite={this.state.favouriteMovies.includes(movie.episode_id)} 
                movieId = {movie.episode_id} key = {movie.episode_id} onFavouriteClick ={this.onFavouriteClick} />);
        }
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
    var buttons=[]; 
    for(var i=0;i<100;i++)
    {
        buttons.push(<button key={i} className="flexItem">button{i}</button>)
    }
    return(
    <div className="container">
         <header className="header">
            <img src={Logo} className="main-logo"/>
        </header>
        <div className="navbar">
            <div>link1</div>
            <div>link2</div>
            <div>link3</div>
        </div>
        <div className="lower-container">
            <div className="sidebar">
                <div>link1</div>
                <div>link2</div>
                <div>link3</div>
            </div>
            <div className="content">
                <input type="search" placeholder="search movie" className="search-bar" onChange={this.handleChange}/>
                {this.displayMovieCard()}
            </div>
        </div>
        {/* <div className="container">
                {buttons}
        </div> */}
    </div>
    )};
}

export default FlexContainer;
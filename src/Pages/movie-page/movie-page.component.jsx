import React from "react";
import './movie-page.styles.scss'
import { withRouter } from "../../Utilities/withRouter.component";
import moment from 'moment'
import CharacterTooltip from "../../Components/character-tooltip/character-tooltip.component";
import LoadingShadow from "../../Components/loading-shadow/loading-shadow.component";
import { GetFullMovieTitle } from "../../Utilities/utils";

class MoviePage extends React.Component {
    constructor()
    {
        super();
        this.state={
            filmApiResponse:null,
            characterApiResponse:[],
            maxCharacters:40
        }
    }

    componentDidMount()
    {
        fetch(`https://swapi.dev/api/films/${this.props.params.movieId}/`)
        .then(response=>response.json())
        .then(response => this.setState({filmApiResponse:response}
            ,()=>{
                console.log(this.state.filmApiResponse);
                this.getCharacterinfo();
            }
            ));
    }

    getCharacterinfo =() =>{
        console.log(this.state.filmApiResponse.characters);
        for(let i =0;i <this.state.maxCharacters && i< this.state.filmApiResponse.characters.length ;i++)
        {
            let characterAddress = this.state.filmApiResponse.characters[i];
            fetch(characterAddress)
            .then(response=>response.json())
            .then(response => this.setState( prevState => ({
                characterApiResponse: [...prevState.characterApiResponse, response ]
            })
                // ,()=>{console.log(this.state.characterApiResponse)}
                ));
        };
    }
        
    renderCharacters()
    {
        let innerTable=[];
        for(let i=0;i<this.state.characterApiResponse.length;i+=3)
        {
            let rowItems=[];
            for(let j=0;j<3 && j+i<this.state.characterApiResponse.length;j++)
            {
                rowItems.push(<td className="character-grid-item" key={j}><CharacterTooltip characterInfo={this.state.characterApiResponse[i+j]} key={i+j}/></td>)
            }
            // <CharacterTooltip characterInfo={this.state.characterApiResponse[i+j]} key={i+j}/>
            innerTable.push(<tr key={i}>{rowItems}</tr>);

        }

        return <table><tbody>{innerTable}</tbody></table>;
    }

    showFilmInfo()
    {
        if( this.state.filmApiResponse != null )
        {
            if(this.state.characterApiResponse.length === this.state.filmApiResponse.characters.length || this.state.characterApiResponse.length === this.state.maxCharacters )
            {
                return (
                    <span>
                        
                        <div className="backbutton-container">
                            <button className="MovieButton" onClick={()=>{this.props.navigate("/")}}>Back</button>
                        </div>
                        <div className="summary">
                            <h1>{GetFullMovieTitle(this.state.filmApiResponse)}</h1>
                            {console.log(this.state.filmApiResponse.episode_id)}
                            <div className="poster-container">
                                <img src={process.env.PUBLIC_URL + `/Images/Posters/episode${this.state.filmApiResponse.episode_id}.jpg` } className="poster" />
                            </div>
                            <span>{this.state.filmApiResponse.opening_crawl}</span>
                        </div>
                        
                        <div className="additional-info">
                            <div className="director-info-container">
                                <div>
                                    Director: {this.state.filmApiResponse.director}
                                </div>
                                <div>
                                    Producer: {this.state.filmApiResponse.producer}
                                </div>
                                <div>
                                    Release date: {moment(this.state.filmApiResponse.release_date).format('MMMM Do YYYY')}
                                </div>
                            </div>
                            <div className="character-info-container">
                                <h3 className="character-heading">Characters</h3>
                                <div className="character-info-text">Hover over character names to see info</div>
                                {this.renderCharacters()}
                            </div>
                        </div>
                </span>)
            }
        }
        return (<LoadingShadow/>);
    }

    render(){
        return (
            <div className="description">
                {this.showFilmInfo()}
            </div>);
    }
}

export default withRouter(MoviePage);
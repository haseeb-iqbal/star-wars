

export const GetFullMovieTitle = (movie) =>
{
    var toRoman = require('roman-numerals').toRoman;
    let movieInRoman = toRoman(movie.episode_id );
    return "Episode " + movieInRoman+": " +movie.title;
};
import React from 'react';
import './movie.css';
import Movie from './movie'
import Services from '../../services/main'

class Movies extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        movies: [],
        favMovies: this.getFavMovies()
      };
    }
    componentDidMount() {
      this.initMovies();
    }

    initMovies = () => {
      Services.getMovies().then(res => {
       this.setState({movies: res})
      });
    }
    
    getFavMovies = () => {
      return Services.loadFromStorage('favMovies');
    }

    toggleFavMovieslist = (movieTitle) => {
      var temFavList = this.state.favMovies;
      var exist = this.state.favMovies.indexOf(movieTitle)
      if (exist >= 0) {
        temFavList.splice(exist,1);
      } else {
        temFavList.push(movieTitle)
      }
      this.setState({
        favMovies: temFavList
      })
      Services.saveToStorage('favMovies', temFavList)
    }

    render() {
      if (this.state.movies) {
        return (
          <div className="movies-container">
          { this.state.movies.map((movie, idx) => {
            return <Movie key={idx} movie={movie} toggleFavMovieslist={this.toggleFavMovieslist}/>
          })}
          </div> 
        );
      }
    }
  }

export default Movies;

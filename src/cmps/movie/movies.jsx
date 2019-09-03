import React from 'react';
import { connect } from "react-redux";

import './movie.css';
import Movie from './movie';
import Services from '../../services/main';
import {addMovies} from '../../js/actions/index';
import Spinner from '../Spinner';


function mapDispatchToProps(dispatch) {
  return {
    addMovies: movies => dispatch(addMovies(movies))
  };
}
class MoviesConnect extends React.Component {
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
       this.setState({movies: res});
       console.log('movies',this.state.movies);
       this.props.addMovies({ movies: this.state.movies });
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
      if (this.state.movies.length === 0) return  <Spinner />
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
const Movies = connect(null, mapDispatchToProps)(MoviesConnect);
export default Movies;

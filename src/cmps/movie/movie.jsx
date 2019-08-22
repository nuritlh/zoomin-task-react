import React from 'react';
import './movie.css';

import Services from '../../services/main'

class Movie extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isFavfoite: this.initFlag()
      };
    }

    initFlag = () => {
      var favMovies = Services.loadFromStorage('favMovies');
      if (favMovies) {
        var isFavInit = favMovies.indexOf(this.props.movie.title);
        if (isFavInit >= 0) {
          return true
        } 
        else return false
      }
    }

    toggleFavfoite  = (movieTitle) => {
      this.setState({
        isFavfoite: !this.state.isFavfoite
      })
      this.props.toggleFavMovieslist(movieTitle)
    }
    
    componentDidUpdate(prevProps, prevState) {
      if (prevProps.movie.posterUrl !== this.props.movie.posterUrl) {
        this.renderMoviePster();
      }
    }

    renderMoviePster = () => {
      var imgPoster;
      if(this.props.movie.posterUrl === 'N/A') {
        imgPoster = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLjKQTZbtyzXulIDXR-Gg9y4jzrGdvw6voJWgf2rZ0dwkJ_rbV';
      } else {
        imgPoster = this.props.movie.posterUrl;
      }
      return (
        <img className="poster" src={imgPoster} alt="poster"/> 
      )
    }

    render() {
      return (
        <>
        <div className="movie-container">
            <div >
              {this.props.movie.title}
            </div>
            <div>
              Year : {this.props.movie.release_date}
            </div>
            <div>
              Director : {this.props.movie.director}
            </div>
            <div>{this.renderMoviePster()}</div>
            <div className="custom-control custom-checkbox mb-3">
              <input type="checkbox" className="custom-control-input pointer" id={this.props.movie.title}
                name={this.props.movie.title} defaultChecked={this.state.isFavfoite} 
                onChange={ () => this.toggleFavfoite(this.props.movie.title)}/>
              <label  className="custom-control-label pointer" htmlFor={this.props.movie.title}>Favfoite!</label>
            </div>
          </div>
        </>
      );
    }
  }

export default Movie;

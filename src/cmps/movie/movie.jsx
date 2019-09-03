import React from 'react';
import { connect } from "react-redux";
import moment from 'moment';


import Services from '../../services/main';
import {selecteMovie} from '../../js/actions/index';
import Modal from '../modal/modal';

import './movie.css';
import '../modal/modal.css';


function mapDispatchToProps(dispatch) {
  return {
    selecteMovie: currentMovie => dispatch(selecteMovie(currentMovie))
  };
}

class MovieConnecmt extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isFavfoite: this.initFlag(),
        currentMovie: {},
        isShowing: false,
        imgPoster : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLjKQTZbtyzXulIDXR-Gg9y4jzrGdvw6voJWgf2rZ0dwkJ_rbV'
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
      this.props.selectMovie(movieTitle)
    }
    componentDidUpdate(prevProps, prevState) {
        this.renderMoviePster();
        // if(!this.props.movie.posterUrl === 'N/A') {
        //   this.setState({imgPoster: this.props.movie.posterUrl});
        // }
    }

    renderMoviePster = () => {
      var imgPoster;
      if(this.props.movie.posterUrl === 'N/A') {
        imgPoster = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLjKQTZbtyzXulIDXR-Gg9y4jzrGdvw6voJWgf2rZ0dwkJ_rbV';
      } else {
        imgPoster = this.props.movie.posterUrl;
        // this.setState({imgPoster});
      }
      
      return (
        <img className="poster" src={imgPoster} alt="poster"/> 
      )
    }

    selectMovie = (event) => {
      event.preventDefault();
      this.setState({
        currentMovie: this.props.movie,
        isShowing: true,
      },
      () => {
        this.props.selecteMovie({ currentMovie: this.state.currentMovie });
      });
    }

    renderModal = () => {
      if(this.state.isShowing) {
        return (
          <Modal
            className="modal"
            show={this.state.isShowing}
            close={this.closeModalHandler}
            movie={this.props.movie}
            imgPoster={this.state.imgPoster}>
          </Modal>
        )
      }
    }
    closeModalHandler = () => {
      this.setState({
          isShowing: false
      });
    }

    render() {
      return (
        <>
        <div className="movie-container" onClick={this.selectMovie}>
            <div >
              {this.props.movie.title}
            </div>
            <div>
              Year : {moment(this.props.movie.release_date).format("MMM Do YY")}
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
          {this.renderModal()}
        </>
      );
    }
  }

const Movie = connect(null, mapDispatchToProps)(MovieConnecmt);
export default Movie;

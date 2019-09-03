import React from 'react';
import moment from 'moment';

import './modal.css';

const modal = (props) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={props.close}>&times;</span>
                <div className="details-wrapper">
                    <div className="image content">
                        <div className="ui medium image">
                            <img src={props.movie.posterUrl} alt="movie poster"/>
                        </div>
                    </div>
                    <p></p>
                    <div className="description">
                        <div className="ui header">{props.movie.title}</div>
                        <p>Created: {moment(props.movie.release_date).format("MMM Do YY")}</p>
                        <p>Director: {props.movie.director}</p>
                        <p>Producer: {props.movie.producer}</p>
                        <p>Opening Crawl:</p>
                        <p>{props.movie.opening_crawl}</p>
                    </div>
                </div>
                <div className="actions">
                    <div className="ui black deny button" onClick={props.close}>
                        close
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default modal;


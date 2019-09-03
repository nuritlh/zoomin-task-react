import React from 'react';

const Spinner = (props) => {
    return (
        <div className="ui active dimmer">
            <div className="ui big text loader">
                <p>{props.message}</p>
            </div>
        </div>
    )
};

Spinner.defaultProps = {
    message : 'Loading...'
}
export default Spinner;
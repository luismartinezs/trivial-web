import React from 'react';

class Error extends React.Component {
    render() {
        return (
            <div className='start'>
                <p>There was some issue trying to get the questions :( <br/>
                Check your internet connection or try again later</p>
            </div>
        );
    }
}

export default Error;
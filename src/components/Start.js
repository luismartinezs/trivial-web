import React from 'react';
import { Button } from 'react-bootstrap';

class Start extends React.Component {
    render() {
        return (
            <div className='start'>
                <h1>Trivial Game</h1>
                <p>Answer 10 random questions about {this.props.category} and try to score as high as you can!</p>
                <Button className='btn-cta' data-btn-play>Play</Button>
            </div>
        );
    }
}

export default Start;
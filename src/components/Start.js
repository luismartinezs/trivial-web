import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Start extends React.Component {
    render() {
        return (
            <div className='start'>
                <h1>Trivial Game</h1>
                <p>Answer 10 random questions about videogames and try to score a 10!</p>
                <Button>Play</Button>
            </div>
        );
    }
}

export default Start;
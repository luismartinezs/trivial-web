import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Score extends React.Component {
    render() {
        return (
            <div className='score'>
                <p>Your score: 9/10</p>
                <Button>Play again</Button>
            </div>
        );
    }
}

export default Score;
import React from 'react';
import { Button } from 'react-bootstrap';

class Score extends React.Component {
    render() {

        let state = this.props.props;

        let msg = '';
        switch(state.score) {
            case 0:
                msg = `Do you even play???`;
                break;
            case 1:
            case 2:
            case 3:
                msg = `My grandma knows more about games than you`;
                break;
            case 4:
            case 5:
                msg = `Not too bad...`;
                break;
            case 6:
            case 7:
            case 8:
                msg = `Wow, you know quite a lot!`;
                break;
            case 9:
                msg = `I can't believe how powerful you are!`;
                break;
            case 10:
                msg = `You're a legend, your power level is beyond this world...`;
                break;
            default:
                msg = 'something went wrong with your score';
        }

        return (
            <div className='score'>
                <p>Your score: {state.score}/10</p>
                <p>{msg}</p>
                <Button data-btn-reset>Play again</Button>
            </div>
        );
    }
}

export default Score;
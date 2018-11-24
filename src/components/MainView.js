import React from 'react';
import { Grid, Row, Button, Col } from 'react-bootstrap';
import Start from './Start';
import Question from './Question';
import Score from './Score';

class MainView extends React.Component {
    render() {
        let state = this.props.props;
        if (state.screen === 'start') {
            return (
                <div className='mainView-wrapper'>
                    <Start />
                </div>
            );
        }
        if (state.screen === 'questionScreen') {
            return (
                <div className='mainView-wrapper'>
                    <Question props={state}/>
                </div>
            );
        }
        if (this.props.props.screen === 'score') {
            return (
                <div className='mainView-wrapper'>
                    <Score props={state}/>
                </div>
            );
        }
    }
}

export default MainView;
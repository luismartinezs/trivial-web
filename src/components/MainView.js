import React, { Component } from 'react';
import { Grid, Row, Button, Col } from 'react-bootstrap';
import Start from './Start';
import QuestionScreen from './QuestionScreen';
import Score from './Score';

class MainView extends React.Component {
    render() {
        return (
            <div className='mainView-wrapper'>
                <Start />
                <hr />
                <QuestionScreen />
                <hr />
                <Score />
            </div>
        );
    }
}

export default MainView;
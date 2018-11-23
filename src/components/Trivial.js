import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Start from './Start';
import QuestionScreen from './QuestionScreen';
import Score from './Score';
import Tab from './Tab';
import './style.css'


class Trivial extends React.Component {
    render() {
        return (
            <div className='trivialContainer'>
                <Tab />
                <Start />
                <hr />
                <QuestionScreen />
                <hr />
                <Score />
            </div>
        );
    }
}

export default Trivial;
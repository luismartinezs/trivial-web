import React, { Component } from 'react';
import { Button, Row, Grid } from 'react-bootstrap';
import Question from './Question';


class QuestionScreen extends React.Component {
    render() {
        return (
            <div className='question-screen'>
                <Question />
            </div>
        );
    }
}

export default QuestionScreen;
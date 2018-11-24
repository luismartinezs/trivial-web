import React, { Component } from 'react';
import { Button, Row, Grid } from 'react-bootstrap';
import Question from './Question';


class QuestionScreen extends React.Component {
    render() {
        return (
            <div className='question-screen'>
                <Question question={this.props.questions[0]} />
            </div>
        );
    }
}

export default QuestionScreen;
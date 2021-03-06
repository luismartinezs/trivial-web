import React from 'react';
import { Button, Row, Grid, Col } from 'react-bootstrap';
import { decodeHtml }  from './helpers';

class Question extends React.Component {
    render() {
        let state = this.props.props;
        let _currentQuestionIndex = state.currentQuestionIndex;

        let HTMLquestion = state.questions[_currentQuestionIndex].question;

        let question = decodeHtml(HTMLquestion);

        return (
            <div className='question'>
                <h2>Question #{_currentQuestionIndex+1}</h2>
                <p>{question}</p>
                <Grid>
                    <Row>
                        <Button className='mb-1 wrap' block data-btn-index='0' data-selected='0'>{state.shuffledQuestions[0]}</Button>
                    </Row>
                    <Row>
                        <Button className='mb-1 wrap' block data-btn-index='1' data-selected='0'>{state.shuffledQuestions[1]}</Button>
                    </Row>
                    <Row>
                        <Button className='mb-1 wrap' block data-btn-index='2' data-selected='0'>{state.shuffledQuestions[2]}</Button>
                    </Row>
                    <Row>
                        <Button className='mb-1 wrap' block data-btn-index='3' data-selected='0'>{state.shuffledQuestions[3]}</Button>
                    </Row>
                    <hr />
                    <Row>
                        <Col xs={1}></Col>
                        <Col xs={10}>
                            <Button className='btn mx-1 mb-1 center-block btn-cta' block data-btn-confirm='1'>Confirm</Button>
                        </Col>
                        <Col xs={1}></Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Question;
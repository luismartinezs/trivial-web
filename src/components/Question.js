import React, { Component } from 'react';
import { Button, Row, Grid } from 'react-bootstrap';

class Question extends React.Component {
    render() {
        return (
            <div className='question'>
                <h2>Question #1</h2>
                <p>What is the mascot of Nintendo?</p>
                <Grid>
                    <Row><Button>Godzilla</Button></Row>
                    <Row><Button>Mario</Button></Row>
                    <Row><Button>Trump</Button></Row>
                    <Row><Button>Lady Gaga</Button></Row>
                </Grid>
            </div>
        );
    }
}

export default Question;
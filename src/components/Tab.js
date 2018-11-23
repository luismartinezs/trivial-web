import React, { Component } from 'react';
import { Grid, Row, Button, Col } from 'react-bootstrap';

class Tab extends React.Component {
    render() {
        return (
            <div className='tab-wrapper'>
                <Grid fluid='true'>
                    <Row>
                        <Col xs={6}>
                            <span className='title'>Trivial Game</span>
                        </Col>
                        <Col xs={6}>
                            <Button>Restart</Button>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Tab;
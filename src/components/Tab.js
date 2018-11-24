import React from 'react';
import { Grid, Row, Button, Col } from 'react-bootstrap';

class Tab extends React.Component {
    render() {
        return (
            <div className='tab-wrapper'>
                <div className='tab-container'>
                    <Grid>
                        <Row>
                            <Col xs={6} className='text-left'>
                                <span className='title'>Trivial Game</span>
                            </Col>
                            <Col xs={6} className='text-right'>
                                <Button data-btn-reset>Restart</Button>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default Tab;
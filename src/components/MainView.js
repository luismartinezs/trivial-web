import React from 'react';
import Start from './Start';
import Question from './Question';
import Score from './Score';
import LoadingScreen from './LoadingScreen';

class MainView extends React.Component {
    render() {
        let state = this.props.props;
        let category = '';

        if (state.questions[0] !== undefined) {
            category = state.questions[0].category;
        }

        if (state.isLoading) {
            return (
                <div className='mainView-wrapper'>
                    <LoadingScreen />
                </div>
            );
        }

        if (state.screen === 'start') {
            return (
                <div className='mainView-wrapper'>
                    <Start category={category} />
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

        if (state.screen === 'score') {
            return (
                <div className='mainView-wrapper'>
                    <Score props={state}/>
                </div>
            );
        }

    }
}

export default MainView;
import React from 'react';
import './style.css'
import MainView from './MainView';
import Tab from './Tab';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux'
import { decodeHtml, shuffleArray } from './helpers';



// REDUX

// ACTION CREATOR
const ADD_DATA = 'ADD_DATA';

const addData = (data) => {
    return {
        type: ADD_DATA,
        data: data,
    }
}

// REDUCER
const reducer = (state = {}, action) => {
    let newState = {}
    switch (action.type) {
        case ADD_DATA:
            return Object.assign(newState, state, action.data);
        default:
            return state;
    }
}

// CREATE STORE
const store = createStore(reducer);

const initialState = {
    isLoading: true,
    screen: 'start', // 'start', 'questionScreen', 'score', 'error'
    questions: {},
    currentQuestionIndex: 0,
    currentAnswered: false,
    score: 0,
    shuffledQuestions: [],
};

// REACT
class Trivial extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roundsNumber: 2,
            isLoading: true,
            screen: 'start', // 'start', 'questionScreen', 'score', 'error'
            questions: {},
            currentQuestionIndex: 0,
            currentAnswered: false,
            score: 0,
            shuffledQuestions: [],
        };
        this.handleClick = this.handleClick.bind(this);
        this.shuffleQuestions = this.shuffleQuestions.bind(this);
    }

    componentDidMount() {
        let _this = this;

        // initial data fetch
        async function asyncMethod() {
            let url = 'https://opentdb.com/api.php?amount=10&category=23&difficulty=medium&type=multiple';

            return fetch(url)
                .then((response) => response.json())
                .then((responseJson) => {

                    _this.setState({
                        isLoading: false,
                        questions: responseJson.results,
                    });

                })
                .catch((error) => {
                    console.log(error);
                });
        };

        asyncMethod();

        document.addEventListener('click', this.handleClick);

    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick);
    }

    // make general event handler for clicking a button, that calls different methods depending on button props
    handleClick(event) {

        // handles starting the game
        if (event.target.dataset.btnPlay !== undefined) {
            console.log('clicked play');
            this.shuffleQuestions();
            this.setState({
                screen: 'questionScreen',
            });
        }

        // handles selecting an answer
        if (event.target.dataset.btnIndex !== undefined) {

            let confirmBtn = document.querySelector('[data-btn-confirm]');

            if (confirmBtn.textContent === 'Confirm') {

                console.log('selected answer');
                console.log(event.target, 'was clicked');
                let buttons = document.querySelectorAll(`[data-btn-index]`);

                Array.from(buttons).forEach((btn) => {
                    btn.classList.remove('btn-info');
                    btn.dataset.selected = '0';
                });
                event.target.classList.add('btn-info');
                event.target.dataset.selected = '1';

            }
        }

        // confirm / next button was clicked
        if (event.target.dataset.btnConfirm !== undefined) {

            console.log('clicked confirm/next');

            let currentQuestionIndex = this.state.currentQuestionIndex;

            let buttons = document.querySelectorAll(`[data-btn-index]`);

            let selectedBtn = Array.from(buttons).find((btn) => {
                return btn.dataset.selected === '1';
            });

            // button was in confirm
            if (event.target.textContent === 'Confirm') {

                console.log('clicked confirm');

                // there was one selected answer
                if (selectedBtn !== undefined) {

                    console.log('there was one selected answer');

                    // get the content of the selected answer

                    let correctAnswer = decodeHtml(this.state.questions[currentQuestionIndex].correct_answer);

                    let correctBtn = Array.from(buttons).find((btn) => {
                        return btn.textContent === correctAnswer;
                    });
                    console.log('correctBtn:', correctBtn);
                    console.log('buttons:', buttons);
                    console.log('correctAnswer:', correctAnswer);

                    let choosenAnswer = selectedBtn.textContent;

                    // clean buttons
                    Array.from(buttons).forEach((btn) => {
                        btn.classList.remove('btn-info');
                        btn.dataset.selected = '0';
                    });

                    // compare it to the correct answer
                    if (choosenAnswer === correctAnswer) {
                        // answer given was correct
                        selectedBtn.classList.add('btn-success');
                        this.setState({ score: +this.state.score + 1 });
                        console.log('score increased by 1');

                    } else {
                        // answer given was wrong
                        console.log('selectedBtn:', selectedBtn);
                        console.log('correctBtn:', correctBtn);
                        selectedBtn.classList.add('btn-danger');
                        correctBtn.classList.add('btn-success');
                    }
                    if (currentQuestionIndex === this.state.roundsNumber - 1) {
                        event.target.textContent = 'See your score';
                    } else {
                        event.target.textContent = 'Next question';
                    }

                    console.log('current score:', this.state.score);
                }
                // button was in next
            } else {
                console.log('clicked next');

                if (currentQuestionIndex < this.state.roundsNumber - 1) {

                    // clean buttons
                    Array.from(buttons).forEach((btn) => {
                        btn.classList.remove('btn-danger');
                        btn.classList.remove('btn-success');
                        btn.dataset.selected = '0';
                    });

                    // displays next question
                    this.setState({
                        currentQuestionIndex: this.state.currentQuestionIndex + 1,
                        shuffledQuestions: [],
                    });

                    event.target.textContent = 'Confirm';
                    console.log('after increase', this.state.currentQuestionIndex);

                    this.shuffleQuestions();

                } else {

                    this.setState({
                        screen: 'score',
                    });

                }

            }
        }

        if (event.target.dataset.btnReset !== undefined) {
            console.log('clicked on reset');
            // fetch data again and reset everything
            let _this = this;

            this.setState({
                isLoading: true,
                screen: 'start', // 'start', 'questionScreen', 'score', 'error'
                questions: {},
                currentQuestionIndex: 0,
                currentAnswered: false,
                score: 0,
                shuffledQuestions: [],
            });

            async function asyncMethod() {
                let url = 'https://opentdb.com/api.php?amount=10&category=23&difficulty=medium&type=multiple';

                return fetch(url)
                    .then((response) => response.json())
                    .then((responseJson) => {

                        _this.setState({
                            isLoading: false,
                            questions: responseJson.results,
                        });

                    })
                    .catch((error) => {
                        console.log(error);
                    });
            };

            asyncMethod();

        }
    }

    shuffleQuestions() {

        let shuffledHTMLArray = shuffleArray([...this.state.questions[this.state.currentQuestionIndex].incorrect_answers, this.state.questions[this.state.currentQuestionIndex].correct_answer]);

        let shuffledQuestions = shuffledHTMLArray.map((elem) => { return decodeHtml(elem) });

        console.log('shuffled questions:', shuffledQuestions);

        this.setState({
            shuffledQuestions: shuffledQuestions,
        });

    }

    render() {
        console.log('before render', this.state.currentQuestionIndex);
        return (
            <div className='trivialWrapper'>
                <div className='trivialContainer'>
                    <Tab />
                    <MainView props={this.state} />
                </div>
            </div>
        );
    }
}

// REACT+REDUX

function mapStateToProps(state) {
    return {
        data: state,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addNewData: function (data) {
            return (dispatch(addData(data)));
        }
    };
}

const Container = connect(mapStateToProps, mapDispatchToProps)(Trivial);

class AppWrapper extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Container />
            </Provider>
        );
    }
}

export default AppWrapper;
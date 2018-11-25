import React from 'react';
import './style.css'
import MainView from './MainView';
import Tab from './Tab';
import { decodeHtml, shuffleArray, initialState } from './helpers';

// REACT
class Trivial extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState();
        this.handleClick = this.handleClick.bind(this);
        this.shuffleQuestions = this.shuffleQuestions.bind(this);
        this.getResources = this.getResources.bind(this);
    }

    componentDidMount() {

        // initial data fetch
        this.getResources();

        document.addEventListener('click', this.handleClick);

    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick);
    }

    /*
    * Fetching of external data is done in initial mount and when reset button is clicked
    */
    getResources() {
        let _this = this;

        asyncMethod();

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
                    
                    _this.setState({
                        screen: 'error',
                    });

                    console.log(error);

                });

        }

    }

    // events on all buttons are delegated on this method
    handleClick(event) {

        // handles starting the game
        if (event.target.dataset.btnPlay !== undefined) {
            this.shuffleQuestions();
            this.setState({
                screen: 'questionScreen',
            });
        }

        // handles selecting an answer
        if (event.target.dataset.btnIndex !== undefined) {

            let confirmBtn = document.querySelector('[data-btn-confirm]');

            if (confirmBtn.textContent === 'Confirm') {

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

            let currentQuestionIndex = this.state.currentQuestionIndex;

            let buttons = document.querySelectorAll(`[data-btn-index]`);

            let selectedBtn = Array.from(buttons).find((btn) => {
                return btn.dataset.selected === '1';
            });

            // button was in confirm
            if (event.target.textContent === 'Confirm') {

                // there was one selected answer
                if (selectedBtn !== undefined) {

                    // get the content of the selected answer
                    let correctAnswer = decodeHtml(this.state.questions[currentQuestionIndex].correct_answer);

                    let correctBtn = Array.from(buttons).find((btn) => {
                        return btn.textContent === correctAnswer;
                    });

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

                    } else {
                        // answer given was wrong
                        selectedBtn.classList.add('btn-danger');
                        correctBtn.classList.add('btn-success');
                    }
                    if (currentQuestionIndex === this.state.roundsNumber - 1) {
                        event.target.textContent = 'See your score';
                    } else {
                        event.target.textContent = 'Next question';
                    }
                }
                // button was in next
            } else {

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

                    this.shuffleQuestions();

                } else {

                    this.setState({
                        screen: 'score',
                    });

                }

            }
        }

        if (event.target.dataset.btnReset !== undefined) {
            // fetch data again and reset everything
            // I'd like that the initial state is held within a constant somewhere to be reused
            this.setState( initialState() );

            this.getResources();

        }
    }

    shuffleQuestions() {

        let shuffledHTMLArray = shuffleArray([...this.state.questions[this.state.currentQuestionIndex].incorrect_answers, this.state.questions[this.state.currentQuestionIndex].correct_answer]);

        let shuffledQuestions = shuffledHTMLArray.map((elem) => { return decodeHtml(elem) });

        this.setState({
            shuffledQuestions: shuffledQuestions,
        });

    }

    render() {
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

export default Trivial;
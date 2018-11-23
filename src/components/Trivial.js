import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import MainView from './MainView';
import Tab from './Tab';
import './style.css'
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux'

// asynchronously load data
// async function getQuestionsFromUrl() {
//     let result;
//     let resultJson;
//     let resultObj;
//     try {
//         result = await fetch('https://opentdb.com/api.php?amount=10&category=15&difficulty=medium&type=multiple');
//         resultJson = await result.json();
//         return resultJson.results;
//     }
//     catch(e) {
//         console.error(e);
//     }
// }

// let promise = new Promise((resolve, reject) => {
//     let result = fetch('https://opentdb.com/api.php?amount=10&category=15&difficulty=medium&type=multiple');
//     console.log(result);
//     return result;
// }).then((result) => {
//     let resultJson = result.json();
//     console.log(resultJson);
//     return resultJson;
// }).then((resultJson) => {
//     console.log(resultJson);
// }).catch((reason) => {
//     console.error(reason);
// })

// function testPromise() {
//     // synchrone

//     var my_promise = new Promise(
//       function(resolve, reject) {
//         // asynchrone
//         var data = fetch('https://opentdb.com/api.php?amount=10&category=15&difficulty=medium&type=multiple');
//         if (true) {
//           resolve(data);
//         } else {
//           reject(data);
//         }
//       });
  
//     my_promise.then(
//       function(data) {
//         // Promise resolved
//         // asynchrone
//     }).catch(
//         function(data) { 
//         // Promise rejected
//         // asynchrone
//     });
      
//     // synchrone
//   }

let url = 'https://opentdb.com/api.php?amount=10&category=15&difficulty=medium&type=multiple';

let asyncCall = async function(url) {
    let result;
    let resultJson;
    try {
        result = await fetch(url);
        resultJson = await result.json();
    }
    catch(err) {
        console.error(err);
    }

    return resultJson;
}

let questions = asyncCall(url).then((results) => {return results.results});

console.log(questions);

// REDUX

// ACTION CREATOR
const ADD_DATA = 'ADD_DATA';

function makeAction(ACTION) {
    return {
        type: ACTION,
        questions: [],
    }
}

// REDUCER
function reducer(state={}, action) {
    let newState = {}
    switch(action.type) {
        case ADD_DATA:
            return Object.assign(newState, state, action.questions);
        default:
            return state;
    }
}

// CREATE STORE
let store = createStore(reducer);

// REACT
class Trivial extends React.Component {
    render() {
        return (
            <div className='trivialContainer'>
                <Tab />
                <MainView />
            </div>
        );
    }
}

// REACT+REDUX

const mapStateToProps = (state) => {
    return {
        questions: {},
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addData: data => {
            dispatch(makeAction(ADD_DATA))
        }
    }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(Trivial);

class AppWrapper extends React.Component {
    render() {
        return(
            <Provider store={store}>
                <Container />
            </Provider>
        );
    }
}

export default AppWrapper;
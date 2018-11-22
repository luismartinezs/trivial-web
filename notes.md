Steps:
> Write user stories for MVP
- on opening the app, user can access "play" screen as long as they are connected to internet
- if end point cant be reached, user will see a "connection issue" screen
- if user clicks play, he can start the game
- 10 questions, 4 possible choices, only one is right
- user can mark one answer, then click on confirm answer
- if answer is correct, user will see a "correct" message, if not, they'll see a "wrong" mesg and which choice was the correct one
- after answering 10 questions, user will access score screen. User will see how many questions they got right
- In score screen there is a button "replay" that will restart the game
- At all times there is a navigation button somewhere that allows the user to restart/reset the game "restart"

> Sketch views
> Write static website: separate styles from structure
> Write tests to pass user stories
> Determine states required and where they go
> Write code that passes the tests
> Document code added
> Validate code with validator.w3.org and jshint.com

- Create empty view that gets json object from end point and prints it to the console

Returned object shape:
Object {
    "response_code": 0,
    "results": Array [
        Object {
            "category": "Entertainment: Video Games",
            "correct_answer": "Galaxian",
            "difficulty": "medium",
            "incorrect_answers": Array [
                "Galactica",
                "Space Invaders",
                "Galactic Wars",
            ],
            "question": "What was....",
            "type": "multiple",
        },
        Object {..}
    ],
}

- fetch data asynchronously from external end point
- Print question and answer options on screen
- Allow marking one of the answers, and keep it highlighted

- Show & characters in the right format
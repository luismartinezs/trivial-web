// Helper functions

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function shuffleArray(array) {
    var m = array.length, t, i;

    while (m) {
        i = Math.floor(Math.random() * m--);

        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

function initialState() {
    return {
        roundsNumber: 10,
        isLoading: true,
        screen: 'start', // 'start', 'questionScreen', 'score', 'error'
        questions: {},
        currentQuestionIndex: 0,
        currentAnswered: false,
        score: 0,
        shuffledQuestions: [],
    };
}

export { decodeHtml, shuffleArray, initialState };
document.addEventListener('keydown', e => {
    if (e.key === 'Enter' && e.shiftKey) {
        $('.input-setting').toggleClass('hide');
        $('.turn-abacus').toggleClass('hide');
        $('.fa.fa-bars').toggleClass('show');
        $('.question-answer-response').toggleClass("start")
        $('#answer').focus()
        startTime = Date.now()/1000
        trialnumber = parseInt($("#i").text())
        console.log(typeof(trialnumber))
        genQuestion();
    } else if (e.key === 'Enter') {
        checkAns();
    }
})
document.querySelector('.fa').addEventListener('click', () => {
    document.querySelector('.input-setting').classList.toggle('hide');
    document.querySelector('.turn-abacus').classList.toggle('hide');
    let barsIcon = document.querySelector('.fa.fa-bars');
    barsIcon.classList.toggle('show');
})
// document.querySelector('#setting')
$(document).ready( function() {
    console.log("document is ready, time now is : ", Date.now()/1000);


    // const cookieValue = document.cookie
    // .split("; ")
    // .find((row) => row.startsWith("test2="))
    // ?.split("=")[1];

    // console.log("cookie id:", cookieValue)


    $('#setting')
    .on('click', ()=>{
        if(window.innerWidth < 1100) {
            $('.input-setting').toggleClass('hide');
            $('.turn-abacus').toggleClass('hide');
            $('.fa.fa-bars').toggleClass('show');
            $('.question-answer-response').toggleClass("start")
            $('#answer').focus()
            startTime = Date.now()/1000
            trialnumber = parseInt($("#i").text())
        }
    });

    // login session

    


})

var timeList = [];

document.cookie = "id=hello; SameSite=None; Secure";


function Stopper() {
    // indicate very first time
    if (startTime == undefined) {
        startTime =  Date.now()/1000;
    } else {
        timeStop = timeStop?timeStop:startTime;
        const timediff = Date.now()/1000-timeStop;
        console.log(timediff);
        if(typeof(timediff) == "number") {
            timeList.push(timediff);
            timeStop = Date.now()/1000;
        }
        
    }

}
var startTime, timeStop;

var answer;
var number_of_question;


function get(i) {
    return document.getElementById(i);
}
function create(i) {
    return document.createElement(i);
}


function p1orp2() {
    let x = Math.random();
    return x;
}
function draw(no) {
    while (true) {
        let x = Math.round(p1orp2()*no);
        if (x !== 0) {
            return x;
        }
    }

}

// web functions

// testing
// let testing = document.createElement('h1');
// testing.innerText = '1\n2';
// document.getElementById('test').appendChild(testing);

// end testing

let turningLocation = document.querySelector('.turning-location');
// var abacusBtnPosition = getComputedStyle(turningLocation).justifyContent; //normal (left) or right | use toggle?

function abacusMode() { // can add localstorage function
    turningLocation.classList.toggle('mode-changed');
}

function getLongestString(arr) {
    let longestString = '';
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].length > longestString.length) {
            longestString = arr[i];
        }
    }
    return longestString;
}

// data calculation
function create_question(no, length) {
    let l = [];
    let l2 = [];
    for (let i = 0; i < length+1; i++) {
        l.push(draw(no));
    }
    for (let j = 0; j < length; j++) {
        l2.push(Math.round(p1orp2()));
    }
    answer = l[0];

    
    var question_sentence;
    var trialnumber;
    let spacing;
    // abacus mode
    if (getComputedStyle(turningLocation).justifyContent === 'right') {
        spacing = '\n';
        question_sentence = ' ' + l[0];
    } else {
        spacing = '';
        question_sentence = ''+ l[0];
    }
    for (let k = 0; k < length; k++) {
        if (l2[k] === 0) {
            question_sentence += spacing + '+' + l[k+1];
            answer+=l[k+1];
        } else {
            question_sentence += spacing + '-' + l[k+1];
            answer-=l[k+1];
        }
    }
    // solution 1: spacing try to make them align
    // if (getComputedStyle(turningLocation).justifyContent === 'right') {
    //     question_sentence = question_sentence.split('\n');
    //     let longestString = getLongestString(question_sentence);
    //     question_sentence.forEach((item)=> {
    //         if (item.length < longestString.length) {
    //             for (let i = item.length; i < longestString.length; i++) {
    //                 item = '&nbsp;' + item;
    //             }
    //         };
    //     })
    //     question_sentence = question_sentence.join('\n');
    // }

    let question = get('question');

    // solution 2: adding div and align by css
    if (getComputedStyle(turningLocation).justifyContent === 'right') {
        question_sentence = question_sentence.split('\n');
        for (let i = 0; i < question_sentence.length; i++) {
            let numberBlock = create('div');
            numberBlock.innerText = question_sentence[i];
            question.appendChild(numberBlock);
        }
    } else {
        question.innerText = question_sentence;
    }
}


function genQuestion() {
    let inl = get('inl').value;
    let noo = get('noo').value;
    
    question.innerHTML = '';
    if (inl && noo) {
        let ans = create_question(inl,noo);
        
    };
}

// testing:
axios.interceptors.request.use(
    config => {
        config.headers["Access-Control-Allow-Origin"] = "http://localhost:8030";
            return config;
    },
    error => {
        return Promise.reject(error);
    }
)

axios.get("http://localhost:8030/dataOperation",{
    withCredentials: true,
})
.then(function (res) {
    console.log(res.data)
}).catch((err) => {
    if(err) throw err;
})



async function checkAns() {
    let response = get('response')
    if (parseInt(get('answer').value) === answer) {
        Stopper();
        response.innerText = 'correct';
        get('answer').value = '';
        if (parseInt(get('i').value) > 1) {
            genQuestion();
            get('i').value = parseInt(get('i').value) - 1;
        } else {
            response.innerText = timeList;
            $("#question").text("Questions Done!")
            console.log(timeList);

            // here sending data to backend
            // first check if login
            // await axios.get("http://localhost:8030/userProfile")
            // .then(function (res) {
            //     console.log(res)
            // }).catch((err) => {
            //     if(err) throw err;
            // })

            // then calculate averagetime and minTime and get trialnumberV
            let minTime = Math.min(...timeList);
            let sumoftime = timeList.reduce((x,y)=> {return x + y}, 0);
            let averagetime = sumoftime/trialnumber;
            console.log(minTime, averagetime, trialnumber)

            
        }
    } else {
        response.innerText = 'wrong, try again';
        get('answer').value = '';
    }

}


// new update: collect data and send to backend

// logic: get time between calculation and total time, times of calculation and trialnumber



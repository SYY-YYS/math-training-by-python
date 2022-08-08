function random() {
    return Math.random();
}
// for (let i = 0; i<100; i++) {
//     console.log(Math.round(random()));
// }
function create_question(no, length) {
    let l = [];
    let l2 = [];

    for (let j = 0; j < length; j++) {
        l2.push(Math.round(random()));
    }
    console.log(l2);
}
console.log(typeof())
const readline = require('readline');

function exercise(operations) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

// rl.question('What do you think of Node.js? ', (answer) => {
//     // TODO: Log the answer in a database
//     console.log(`Thank you for your valuable feedback: ${answer}`);
//
//     rl.close();
// });



    const askedIndexes = new Set();

    let counter = 0;
    let corrects = 0;
    let wrongs = 0;

    let startTime;
    let endTime;

    function getOperationIndex() {
        const operationIndex = Math.floor(Math.random() * (operations.length - 1));

        if (askedIndexes.has(operationIndex)) {
            return getOperationIndex();
        }
        else {
            askedIndexes.add(operationIndex);
            return operationIndex;
        }
    }

    function ask() {

        const operationIndex = getOperationIndex();
        const operationItem = operations[operationIndex];

        const leftItem = operationItem[0];
        const rightItem = operationItem[1];

        counter++;

        rl.question(`(${counter})    ${leftItem} * ${rightItem} = `, (answer) => {
            if (answer == leftItem * rightItem) {
                console.log('       Correct');
                corrects++;
            }
            else {
                console.log(`       Wrong. ${leftItem} * ${rightItem} is ${leftItem * rightItem}.`);
                wrongs++;
            }
            console.log('');

            if (counter < 10) {
                ask();
            }
            else {
                console.log(`correct answers: ${corrects}`);
                console.log(`wrong answers: ${wrongs}`);
                endTime = Date.now();
                console.log(`total time: ${((endTime - startTime)/1000).toFixed(2)} seconds.`)
                process.exit();
            }
        });
    }

    startTime = Date.now();
    ask();


}


module.exports.exercise = exercise;
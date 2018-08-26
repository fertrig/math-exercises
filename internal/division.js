const readline = require('readline');

function exercise(left, right) {
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



    function getOperations() {
        const ops = [];

        for (let i = 0; i < left.length; i++) {
            for (let j = 0; j < right.length; j++) {

                const l = left[i];
                const r = right[j];

                if (l >= r) {
                    ops.push([l,r]);
                }
            }
        }

        //console.log(ops);
        return ops;
    }

    const operations = getOperations();

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

        console.log(`(${counter})    ${leftItem} ÷ ${rightItem}`);

        rl.question(`quotient = `, (quotient) => {

            rl.question(`remainder = `, (remainder) => {

                if (quotient == Math.floor(leftItem / rightItem) && remainder == leftItem % rightItem) {
                    console.log('       Correct');
                    corrects++;
                }
                else {
                    console.log(`       Wrong.`);
                    console.log(`       ${leftItem} ÷ ${rightItem} is ${Math.floor(leftItem / rightItem)} with remainder ${leftItem % rightItem}. `);
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

        });
    }

    startTime = Date.now();
    ask();

}


module.exports.exercise = exercise;
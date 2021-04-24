const TestFoundation = require("./util/TestFoundation");
const {performance} = require('perf_hooks');
const chalk = require("chalk");
const inquirer = require("inquirer");
const fetch = require("node-fetch");

async function makePrompt() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: ['Ping Jailbreaks.app Status API', 'Exit'],
        },
    ]).then(async answers => {
        switch (answers.options) {
            case "Exit":
                console.log(`${chalk.yellowBright("==>")} Exiting.`);
                process.exit(0);
                break;
            case "Ping Jailbreaks.app Status API":
                const start = performance.now();
                await fetch("https://jailbreaks.app/status.php");
                const end = performance.now();
                console.log(`${chalk.greenBright("==>")} Ping is ${end - start} ms.`);
                break;
        }
        await makePrompt();
    });
}

async function run() {
    const start = performance.now();
    TestFoundation.testbot.connect();
    const end = performance.now();
    console.log(`${chalk.greenBright("==>")} Bot Connection OK: Connected in ${end - start} ms.`);
    TestFoundation.testbot.disconnect();
    await makePrompt();
}
run();
/*Foundation.bot.disconnect();
process.exit();*/
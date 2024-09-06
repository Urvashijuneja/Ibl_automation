import { AfterAll, Before, After, BeforeAll, ITestCaseHookParameter } from '@cucumber/cucumber';
import * as fs from 'fs-extra';
import { commonContext } from '../setup/global'
import { createLogger } from "winston";
import { options } from "./logger";
import axios from 'axios';

import { getEnv } from '../setup/types/env';

getEnv();

BeforeAll(async () => {
    fs.emptyDir('./test-results/logs', err => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('All files deleted from directory Successfully.');
    })
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("API Testing Framework");

});

AfterAll(async () => {
    process.on('exit', () => {
        commonContext.logger.close(); // Ensure all logs are flushed before exiting
    });
});

Before(async function (scenario: ITestCaseHookParameter) {
    const scenarioName = scenario.pickle.name + ' ' + scenario.pickle.id;
    commonContext.logger = createLogger(options(scenarioName));
    commonContext.logger.info("Scenario: " + scenarioName);
});


After(async function (scenario: ITestCaseHookParameter) {
    const scenarioName = scenario.pickle.name + ' ' + scenario.pickle.id;
    const logFilePath = './test-results/logs/' + scenarioName + '.log';
    await new Promise(resolve => setTimeout(resolve, 1000));
    const logFileContent = fs.readFileSync(logFilePath, 'utf-8');
    this.attach(logFileContent, 'text/plain');
});

export { axios };

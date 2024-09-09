import * as dotenv from 'dotenv'

export const getEnv = () => {

    let originalPath = '../apitests/src/' + process.env.ENV + '.env'
    console.log("Path for environment file: " + originalPath);
    dotenv.config({
        override: true,
        path: originalPath
    })
    console.log("Tests are executed in: " + process.env.MESSAGE);
}
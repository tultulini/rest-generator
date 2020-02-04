import { getArg } from "./src/args-util.mjs";
import fs from 'fs'
import { join, dirname, resolve as resolveCurrentDir } from 'path'
import { createInterface } from 'readline'
const RESOURCE_NAME_KEY = '__resource_name__'
const argOptions = {
    Name: {
        full: '--name', short: '-n',
    },
    Path: { full: '--path', short: '-p' },
    Serverless: { full: '--serverless', short: '-sls' }

}
const resourceName = getArgOption(argOptions.Name)
if (resourceName) {
    const path = getArgOption(argOptions.Path)
    if (path) {
        if (fs.existsSync(path)) {
            createResource(resourceName, path)
        }
        else {
            console.log(`'${path}' doesn't exist`);

        }
    }
}

function getArgOption(argType) {
    return getArg(argType.full, true) || getArg(argType.short, true)
}


function createResource(resourceName, path) {
    const src = join(path, 'src')

    const restPath = join(src, 'rest', resourceName)
    console.log(`restPath: ${restPath}`);
    if (fs.existsSync(restPath)) {
        allowOverride(restPath).then(allowed => {
            console.log(`allowed: ${allowed}`)
            if (allowed) {
                generateResource(restPath, resourceName)
            }
        })
    }
    else {
        fs.mkdirSync(restPath, { recursive: true })
        generateResource(restPath, resourceName)
    }
}

function allowOverride(path) {

    const rl = createInterface({
        input: process.stdin,
        output: process.stdout
    })
    return new Promise((resolve, reject) => {
        rl.question(`${path} exists! Would you like to override? (yes/no) `,
            (answer) => {
                const parsedAnswer = answer ? answer.trim().toLowerCase() : null
                resolve(parsedAnswer !== null && (parsedAnswer === 'yes' || parsedAnswer === 'y'))
                rl.close()
            })
    })

}

function generateResource(restPath, resourceName) {
    const templatesDir = join(resolveCurrentDir(), 'templates')

    fs.readdirSync(templatesDir).forEach(file => {
        const templateFilePath = join(templatesDir, file)
        var re = new RegExp(RESOURCE_NAME_KEY, 'g')
        const content = fs.readFileSync(templateFilePath).toString().replace(re, resourceName)
        //console.log(`${file} content:\r\n${content}`)
        const targetFilePath = join(restPath, file)
        fs.writeFileSync(targetFilePath, content)

    });
}

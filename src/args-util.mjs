import proper_ from 'propert'
const { proper } = proper_
export const getArgs = () => {
    let args = null
    proper(process, (argv) => {
        if (argv.length > 2) {
            args = argv.slice(2)
        }
    })
    return args
}

export const getArg = (name, withValue) => {
    if (!name) {
        return null
    }
    const args = getArgs()
    if (!args)
        return null

    const nameToFind = name.toLowerCase()
    const index = args.map(arg => arg.toLowerCase()).indexOf(nameToFind)
    if (index < 0) {
        return null
    }

    if (withValue) {
        return (index < args.length - 1)
            ? args[index + 1]
            : null
    }
    else {
        return true
    }

}

export const all = async (event) => {
    try {
        console.log('gonna get all __resource_name__')
        const __resource_name__ = await getAll__resource_name__()
        return okResponse(__resource_name__)
    }
    catch (error) {
        console.log(`error occurred in get.all: ${error}`)
        return internalServerErrorResponse()
    }
}

export const one = async (event) => {
    try {        
        console.log(`gonna get single item from __resource_name__ by id: ${event.pathParameters.id}`)
        const singleItem = await get__resource_name__Item(event.pathParameters.id)
        if (isNullOrUndefined(singleItem)) {
            return notFoundResponse()
        }
        return okResponse(singleItem)
    }
    catch (error) {
        console.log(`error occurred in get.one: ${error}`)
        return internalServerErrorResponse(`waaaaa something baaad happened: ${error}. event: ${stringifyObject(event)}`)
    }
}
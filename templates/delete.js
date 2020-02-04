export const handle = async (event) => {
    try {        
        console.log(`gonna get single item from __resource_name__ by id: ${event.pathParameters.id}`)
        const singleItem = await get__resource_name__Item(event.pathParameters.id)
        if (isNullOrUndefined(singleItem)) {
            return notFoundResponse()
        }
        /// IMPLEMENT DELETE LOGIC HERE
        ... deletion implementation
        return okResponse()
    }
    catch (error) {
        console.log(`error occurred in get.one: ${error}`)
        return internalServerErrorResponse(`waaaaa something baaad happened: ${error}. event: ${stringifyObject(event)}`)
    }
}
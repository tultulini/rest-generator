const parseBody = (event) => {

    try {
        if (isNullOrWhiteSpace(event.body)) {
            return { error: 'Missing request body' }
        }

        const dto = JSON.parse(event.body)
        const resourceId = event.pathParameters.id

        if (hasValue(dto.id) && dto.id !== resourceId) {
            return { error: `DTO id: ${dto.id} is different from pathId: ${resourceId}` }
        }
        /// IMPLEMENT DTO TO DOMAIN OBJECT HERE AND RETURN
        ... convert dto to domain object here

    }
    catch (error) {
        console.error(`failed to parse body. error: ${error}`)
        return { error: 'Failed to parse body' }
    }

}

export const handle = async (event) => {
    try {
        const parseResult = parseBody(event)
        if (parseResult.error) {
            return badRequestResponse(parseResult.error)
        }
        const resourceId = event.pathParameters.id
        const updatedItem = ... item from body
        const storedItem = await get__resource_name__Item(resourceId)
        if (isNullOrUndefined(storedItem)) {
            return notFoundResponse()
        }
        ///IMPLEMENT put item here
        ... implement put item here

        return okResponse(updatedItem)
    }
    catch (error) {
        console.error(`put.handle error: ${error}`)
        return internalServerErrorResponse()
    }
}


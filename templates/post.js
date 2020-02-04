export const handle = async(event) => {
    try {
        var dto = JSON.parse(event.body)       
        ///implement convert DTO to domain object here
        const newItem = ... convert DTO to domain object
        return okResponse(newItem)
    }
    catch (error) {
        console.error(`post.handle error: ${error}`)
        return internalServerErrorResponse()
    }
}
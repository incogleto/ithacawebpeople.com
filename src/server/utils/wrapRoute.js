export default (processor => {
    return async function(req, res, next) {
        try { await processor(...arguments) }
        catch (err) { return next(err) }
    }
})

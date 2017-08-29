const fail = ({ res, msg = 'Something went wrong.', code = 500, add = {} }) => {

    res.status(code)
    return res.json(
        Object.assign({}, {
            meta: {
                success: false,
                message: msg
            }
        }, add)
    )

}

const succeed = ({ res, msg = 'Success.', code = 200, add = {} }) => {

    res.status(code)
    return res.json(
        Object.assign({}, {
            meta: {
                success: true,
                message: msg
            }
        }, add)
    )

}

module.exports = {
    succeed,
    fail
}

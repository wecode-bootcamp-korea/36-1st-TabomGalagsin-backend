function asyncWrap(asyncController) {
    return async (req, res, next) => {
        try{
            await asyncController(req, res)
        } catch (error) {
            if(error.statusCode === 400) {
                res.status(error.statusCode).json({message : error.message})
            } else {
                res.status(error.statusCode || 500).json({message : 'INVALID_DATA_INPUT'})
            }
        }
    };
}

module.exports = asyncWrap
module.exports.createMw = (callback) => async (req, res, next) => {
    try {
        
        // return or throw
        await callback(req, res, next);

        next();
    } catch (error) {
        next(error);
    }
}
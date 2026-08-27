// Async Wrapper Utility
// TODO: Catch async errors and forward to global error handler middleware
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise
            .resolve(fn(req, res, next))
            .catch(next);
    };
};

module.exports = asyncHandler;
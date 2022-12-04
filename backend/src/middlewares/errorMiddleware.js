"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = (err, _req, res, _next) => {
    if (err.statusCode) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
};
exports.default = errorMiddleware;
//# sourceMappingURL=errorMiddleware.js.map
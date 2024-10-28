"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCSP = generateCSP;
// Function to convert a CSP policy object to a policy string
function generateCSP(policy) {
    return Object.entries(policy)
        .map(function (_a) {
        var directive = _a[0], sources = _a[1];
        return "".concat(directive, " ").concat((sources === null || sources === void 0 ? void 0 : sources.join(' ')) || '');
    })
        .filter(Boolean) // Remove empty directives
        .join('; ');
}

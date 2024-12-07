"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSolanaAddress = isSolanaAddress;
function isSolanaAddress(address) {
    return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
}

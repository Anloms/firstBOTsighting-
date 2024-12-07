"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAddressTracked = exports.appendOne = exports.removeToken = exports.addMultipleNewUser = exports.addAddressNewUser = exports.userExists = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    connectionString: process.env.NEON_DATABASE_URL,
});
// console.log("pool",pool.options.connectionString)
//TODO 6: error handling for each of the queries
//TODO 7: review fetchUserArrayContent
const userExists = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
  SELECT EXISTS (
    SELECT 1
    FROM users
    WHERE telegram_id = $1
  )
`;
    const result = yield pool.query(query, [id]);
    return result.rows[0].exists;
});
exports.userExists = userExists;
const addAddressNewUser = (id, address) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
  INSERT INTO users (telegram_id, solana_tokens)
   VALUES ($1, ARRAY[$2])`;
    yield pool.query(query, [id, address]);
});
exports.addAddressNewUser = addAddressNewUser;
const addMultipleNewUser = (id, address) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
  INSERT INTO users (telegram_id, solana_tokens) 
  VALUES ($1,Array[$2])
  `;
    yield pool.query(query, [id, address]);
});
exports.addMultipleNewUser = addMultipleNewUser;
//review and test
// export const fetchUserArrayContent = async(id:number) =>{
//   const query = `
//   SELECT solana_tokens 
//   FROM users 
//   WHERE telegram_id=$1
//   `;
//   await pool.query(query, [id])
// }
const removeToken = (id, address) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
  UPDATE users 
  SET solana_tokens = array_remove(solana_tokens, $2) 
  WHERE telegram_id=$1
  `;
    yield pool.query(query, [id, address]);
});
exports.removeToken = removeToken;
const appendOne = (id, address) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
  UPDATE users 
  SET solana_tokens = array_append(solana_tokens, $2) 
  WHERE telegram_id=$1
  `;
    yield pool.query(query, [id, address]);
});
exports.appendOne = appendOne;
const isAddressTracked = (id, address) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
  SELECT EXISTS (
    SELECT 1
    FROM users
    WHERE telegram_id = $1
    AND $2 = ANY(solana_tokens)
  )
`;
    const result = yield pool.query(query, [id, address]);
    return result.rows[0].exists;
});
exports.isAddressTracked = isAddressTracked;

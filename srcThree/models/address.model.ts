import dotenv from 'dotenv';
dotenv.config()
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL,
});
// console.log("pool",pool.options.connectionString)

//TODO 6: error handling for each of the queries
//TODO 7: review fetchUserArrayContent
export const userExists = async(id:number):Promise<boolean> =>{
  const query = `
  SELECT EXISTS (
    SELECT 1
    FROM users
    WHERE telegram_id = $1
  )
`;
  const result = await pool.query(query, [id]);
  return result.rows[0].exists;
}
export const addAddressNewUser = async (id:number,address: string) => {
  const query = `
  INSERT INTO users (telegram_id, solana_tokens)
   VALUES ($1, ARRAY[$2])`;
  await pool.query(query, [id, address]);
};
export const addMultipleNewUser = async (id:number, address: string[]) => {
  const query = `
  INSERT INTO users (telegram_id, solana_tokens) 
  VALUES ($1,Array[$2])
  `;
  await pool.query(query, [id, address])
}
//review and test
// export const fetchUserArrayContent = async(id:number) =>{
//   const query = `
//   SELECT solana_tokens 
//   FROM users 
//   WHERE telegram_id=$1
//   `;
//   await pool.query(query, [id])
// }
export const removeToken = async(id:number, address: string) =>{
  const query = `
  UPDATE users 
  SET solana_tokens = array_remove(solana_tokens, $2) 
  WHERE telegram_id=$1
  `;
  await pool.query(query, [id, address])
}
export const appendOne = async (id:number, address: string) => {
  const query = `
  UPDATE users 
  SET solana_tokens = array_append(solana_tokens, $2) 
  WHERE telegram_id=$1
  `;
  await pool.query(query, [id, address])
}

export const isAddressTracked = async (id:number, address: string): Promise<boolean> => {
  const query = `
  SELECT EXISTS (
    SELECT 1
    FROM users
    WHERE telegram_id = $1
    AND $2 = ANY(solana_tokens)
  )
`;
  const result = await pool.query(query, [id, address]);
  return result.rows[0].exists;
};

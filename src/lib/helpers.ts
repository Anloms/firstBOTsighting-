import type { SolanaAddress } from '../types/SolanaAddress';
export function isSolanaAddress(address: string): address is SolanaAddress {
  return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address); 
}
import { getPublicKey } from 'noble-secp256k1'

/**
 * Converts a Taproot private key (64-character hex string) to a public key (64-character hex string)
 *
 * @param {string} privateKey - 64-character hex string representing the private key
 * @returns {string} 64-character hex string representing the public key
 * @throws {Error} if the private key format is invalid
 */
export function key2pub (privateKey) {
  // Validate private key format
  if (!/^[0-9a-fA-F]{64}$/.test(privateKey)) {
    throw new Error(
      'Invalid private key format. Expected 64-character hex string.'
    )
  }

  try {
    // Get the public key using noble-secp256k1
    // getPublicKey returns a 33-byte compressed key by default, we need to convert it to 32-byte x-only format
    const compressedPubkey = getPublicKey(privateKey, true)

    // Remove the first byte (0x02 or 0x03) to get the x coordinate only
    const pubkeyX = compressedPubkey.slice(2)

    return pubkeyX
  } catch (error) {
    throw new Error(
      `Failed to convert private key to public key: ${error instanceof Error ? error.message : String(error)
      }`
    )
  }
}

/**
 * Validates if a string is a valid Taproot private key
 *
 * @param {string} privateKey - string to validate
 * @returns {boolean} indicating whether the string is a valid private key
 */
export function isValidPrivateKey (privateKey) {
  return /^[0-9a-fA-F]{64}$/.test(privateKey)
}

/**
 * Validates if a string is a valid Taproot public key
 *
 * @param {string} publicKey - string to validate
 * @returns {boolean} indicating whether the string is a valid public key
 */
export function isValidPublicKey (publicKey) {
  return /^[0-9a-fA-F]{64}$/.test(publicKey)
} 
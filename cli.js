#!/usr/bin/env node

import { Command } from 'commander'
import { key2pub, isValidPrivateKey } from './index.js'

const program = new Command()

program
  .name('key2pub')
  .description('Convert Taproot private keys to public keys')
  .version('0.1.0')

program
  .argument('[privateKey]', 'Taproot private key (64-character hex string)')
  .action((privateKey) => {
    if (!privateKey) {
      // No input provided, show help
      program.help()
      return
    }

    try {
      if (!isValidPrivateKey(privateKey)) {
        console.error(
          'Error: Invalid private key format. Expected 64-character hex string.'
        )
        process.exit(1)
      }

      const publicKey = key2pub(privateKey)
      console.log(publicKey)
    } catch (error) {
      console.error(
        `Error: ${error instanceof Error ? error.message : String(error)}`
      )
      process.exit(1)
    }
  })

program.parse() 
# key2pub

Convert Taproot private keys to public keys.

This is a simple JavaScript application that allows you to convert Bitcoin Taproot private keys (64-character hex strings) to their corresponding public keys.

## Features

- Convert Taproot private keys to public keys
- Command-line interface
- Browser-based web interface (no server required)
- Simple and fast

## Project Structure

The project has been simplified to use vanilla JavaScript with ES modules:

```
key2pub/
├── index.js       # Main library functions
├── cli.js         # Command-line interface
├── index.html     # Web UI
├── script.js      # Web UI JavaScript
└── styles.css     # Web UI styling
```

## Installation

```bash
npm install
```

## Usage

### Command Line

Run directly:

```bash
node cli.js <private-key>
```

Or install globally:

```bash
npm install -g .
key2pub <private-key>
```

### Web Interface

Simply open the `index.html` file in any modern browser. No server is required as it uses ES modules to directly import the library functions.

## API

### key2pub(privateKey)

Converts a Taproot private key to a public key.

- `privateKey`: A 64-character hex string representing the private key.
- Returns: A 64-character hex string representing the public key.

### isValidPrivateKey(privateKey)

Validates if a string is a valid Taproot private key.

- `privateKey`: The string to validate.
- Returns: A boolean indicating whether the string is a valid private key.

### isValidPublicKey(publicKey)

Validates if a string is a valid Taproot public key.

- `publicKey`: The string to validate.
- Returns: A boolean indicating whether the string is a valid public key.

## License

MIT

import { key2pub, isValidPrivateKey } from './index.js';

document.addEventListener('DOMContentLoaded', () => {
  // Get elements
  const privateKeyInput = document.getElementById('privateKey');
  const publicKeyInput = document.getElementById('publicKey');
  const convertBtn = document.getElementById('convertBtn');
  const clearBtn = document.getElementById('clearBtn');
  const copyBtn = document.getElementById('copyBtn');

  // Add event listeners
  convertBtn.addEventListener('click', handleConversion);
  clearBtn.addEventListener('click', clearInputs);
  copyBtn.addEventListener('click', copyToClipboard);
  privateKeyInput.addEventListener('input', validateInput);

  // Initial validation
  validateInput();

  // Functions
  function handleConversion () {
    const privateKey = privateKeyInput.value.trim();

    // Client-side validation
    if (!isValidHex(privateKey)) {
      showError('Invalid private key format. Please enter a 64-character hex string.');
      return;
    }

    try {
      // Show loading state
      convertBtn.textContent = 'Converting...';
      convertBtn.disabled = true;

      // Use the library function directly
      const publicKey = key2pub(privateKey);

      // Display the public key
      publicKeyInput.value = publicKey;

      // Enable copy button
      copyBtn.disabled = false;

      // Remove any previous error messages
      clearError();
    } catch (error) {
      showError(error.message);
      publicKeyInput.value = '';
      copyBtn.disabled = true;
    } finally {
      // Reset button state
      convertBtn.textContent = 'Convert to Public Key';
      convertBtn.disabled = false;
    }
  }

  function clearInputs () {
    privateKeyInput.value = '';
    publicKeyInput.value = '';
    copyBtn.disabled = true;
    clearError();
    validateInput();
  }

  async function copyToClipboard () {
    const publicKey = publicKeyInput.value;

    if (!publicKey) return;

    try {
      await navigator.clipboard.writeText(publicKey);

      // Show temporary success indication
      const originalText = copyBtn.textContent;
      copyBtn.textContent = 'Copied!';
      copyBtn.style.backgroundColor = 'var(--success-color)';

      // Reset after 2 seconds
      setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.style.backgroundColor = '';
      }, 2000);
    } catch (error) {
      showError('Failed to copy to clipboard');
    }
  }

  function validateInput () {
    const privateKey = privateKeyInput.value.trim();

    if (privateKey === '') {
      // Empty input is allowed (but don't enable the button)
      clearError();
      convertBtn.disabled = true;
    } else if (!isValidHex(privateKey)) {
      showError('Invalid format. Please enter a 64-character hex string.');
      convertBtn.disabled = true;
    } else {
      clearError();
      convertBtn.disabled = false;
    }
  }

  function isValidHex (str) {
    return /^[0-9a-fA-F]{64}$/.test(str);
  }

  function showError (message) {
    // Remove any existing error
    clearError();

    // Create error element
    const errorElement = document.createElement('div');
    errorElement.className = 'error';
    errorElement.textContent = message;

    // Insert after private key input
    privateKeyInput.insertAdjacentElement('afterend', errorElement);
  }

  function clearError () {
    const errorElement = document.querySelector('.error');
    if (errorElement) {
      errorElement.remove();
    }
  }
}); 
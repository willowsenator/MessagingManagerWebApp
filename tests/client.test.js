// Offline smoke test: the client modules must load and build valid, signed contract calls with
// the installed web3, so a dependency bump that breaks that API fails CI before it merges.
// Run from the repository root (npm test does): the client reads its ABI files from the cwd.
const http = require('node:http');
const https = require('node:https');
const { test } = require('node:test');
const assert = require('node:assert/strict');

// Any attempt to reach a node fails loudly instead of hanging or passing by accident.
for (const transport of [http, https]) {
    transport.request = () => { throw new Error('network access in an offline test'); };
}

const { MessagingManager } = require('../client/MessagingManager');
const { MessagingCounter } = require('../client/MessagingCounter');

// A throwaway key; signing with chainId, nonce and gasPrice given needs no RPC lookup.
const TEST_PRIVATE_KEY = '0x' + '11'.repeat(32);

test('MessagingManager encodes writeMessage with its argument', () => {
    const manager = new MessagingManager();
    const abi = manager.web3.eth.abi;

    const data = manager.messagingSmartContract.methods.writeMessage('hello').encodeABI();

    assert.equal(data.slice(0, 10), abi.encodeFunctionSignature('writeMessage(string)'));
    assert.equal(abi.decodeParameter('string', '0x' + data.slice(10)), 'hello');
});

test('MessagingManager signs a markAllMessagesAsRead transaction offline', async () => {
    const manager = new MessagingManager();
    const data = manager.messagingSmartContract.methods.markAllMessagesAsRead().encodeABI();

    const signed = await manager.web3.eth.accounts.signTransaction(
        { to: manager.messagingSmartContract.options.address, data, gas: 470000, gasPrice: '1', nonce: 0, chainId: 1 },
        TEST_PRIVATE_KEY,
    );

    assert.match(signed.rawTransaction, /^0x[0-9a-f]+$/);
    assert.match(signed.transactionHash, /^0x[0-9a-f]{64}$/);
});

test('MessagingCounter encodes getNumMessages', () => {
    const counter = new MessagingCounter();

    const data = counter.messagingCounterSmartContract.methods.getNumMessages().encodeABI();

    assert.equal(data, counter.web3.eth.abi.encodeFunctionSignature('getNumMessages()'));
});

const fs = require('fs');
const Web3 = require('web3');
const ABI_COUNTER = JSON.parse(fs.readFileSync("./abi_counter.json"));
const COUNTER_SMART_CONTRACT_ADDRESS = "0xF7efA8D7f245E1e9C187A21d16207d2E5d54c8d4";
const RPC_URL = "https://polygon-mumbai.infura.io/v3/f46dd658f6d6412c97e10ae92f624961";

class MessagingCounter{
    web3;
    messagingCounterSmartContract;

    constructor(){
        this.web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL));
        this.messagingCounterSmartContract = new this.web3.eth.Contract(ABI_COUNTER, COUNTER_SMART_CONTRACT_ADDRESS);
    }

    async getNumMessages(){
         this.messagingCounterSmartContract.methods.getNumMessages().call((err, result) => {
            console.log("Total messages: " + result);
        });
    }
}

module.exports = {
    MessagingCounter,
}
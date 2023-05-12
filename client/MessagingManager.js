const fs = require('fs');
const Web3 = require('web3');
const abi = JSON.parse(fs.readFileSync("./abi.json"));
const SMART_CONTRACT_ADDRESS = "0x26704Fe8358b61dAb63ABd806d4Af57408c1f7F0";
const ACCOUNT_ADDRESS = "" // Change with your account;
const RPC_URL = "https://polygon-mumbai.infura.io/v3/f46dd658f6d6412c97e10ae92f624961"


class MessagingManager{
    web3;
    messagingSmartContract;

    constructor(){
        this.web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL));
        this.messagingSmartContract = new this.web3.eth.Contract(abi, SMART_CONTRACT_ADDRESS);
    }

    getAllMessages(){
        this.messagingSmartContract.methods.getAllMessages().call((err, result)=>{
            console.log(result);
        })
    }

    writeMessage(message){

    }


    markAllMessagesAsRead(){

    }
}

module.exports = {
    MessagingManager,
};
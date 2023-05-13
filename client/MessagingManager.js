const fs = require('fs');
const Web3 = require('web3');
const abi = JSON.parse(fs.readFileSync("./abi.json"));
const SMART_CONTRACT_ADDRESS = "0x9A8e4a18d7AEcC417Ae7798D7F2E059A9AB948DD";
const PRIVATE_KEY = "YOUR_PRIVATE_KEY"; // Change with your PRIVATE_KEY
const RPC_URL = "https://polygon-mumbai.infura.io/v3/f46dd658f6d6412c97e10ae92f624961"

class MessagingManager{
    web3;
    messagingSmartContract;

    constructor(){
        this.web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL));
        this.messagingSmartContract = new this.web3.eth.Contract(abi, SMART_CONTRACT_ADDRESS);
        
    }

    async getAllMessages(){
        this.messagingSmartContract.methods.getAllMessages().call((err, result)=>{
            console.log(result);
        })
    }

    async writeMessage(message){
        const writeMessageTx = this.messagingSmartContract.methods.writeMessage(message);

        // Sign Transaction with private key
        const createTransaction = await this.web3.eth.accounts.signTransaction(
            {
                to: SMART_CONTRACT_ADDRESS,
                data: writeMessageTx.encodeABI(),
                gas: 470000
            },
            PRIVATE_KEY
        );

        // Send Transaction and wait for receipt
        const createReceipt = await this.web3.eth.sendSignedTransaction(createTransaction.rawTransaction);
        console.log(`Tx successful with hash: ${createReceipt.transactionHash}`);
    }


    async markAllMessagesAsRead(){
        const markAllMessagesAsReadTx = this.messagingSmartContract.methods.markAllMessagesAsRead();

        // Sign Transaction with private key
        const createTransaction = await this.web3.eth.accounts.signTransaction(
            {
                to: SMART_CONTRACT_ADDRESS,
                data: markAllMessagesAsReadTx.encodeABI(),
                gas: 470000
            },
            PRIVATE_KEY
        );

        // Send Transaction and wait for receipt
        const createReceipt = await this.web3.eth.sendSignedTransaction(createTransaction.rawTransaction);
        console.log(`Tx successful with hash: ${createReceipt.transactionHash}`);
    }
}

module.exports = {
    MessagingManager,
};
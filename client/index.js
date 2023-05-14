
const {MessagingManager} = require("./MessagingManager");
const {MessagingCounter} = require("./MessagingCounter");

let messagingManager = new MessagingManager();
let messagingCounter = new MessagingCounter();
const process = async() =>{
    await messagingCounter.getNumMessages();
    await messagingManager.getAllMessages();
    await messagingManager.writeMessage(new Date().toLocaleDateString() +  " " + new Date().toLocaleTimeString());
    await new Promise(r => setTimeout(r, 2000));
    await messagingManager.writeMessage(new Date().toLocaleDateString() +  " " + new Date().toLocaleTimeString());
    await messagingManager.getAllMessages();
    await messagingCounter.getNumMessages();
    await messagingManager.markAllMessagesAsRead();
    await new Promise(r => setTimeout(r, 2000));
    await messagingManager.writeMessage(new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString());
    await messagingManager.getAllMessages();
    await messagingCounter.getNumMessages();
}

process();
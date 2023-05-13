
const {MessagingManager} = require("./MessagingManager")
let messagingManager = new MessagingManager();
const process = async() =>{
    await messagingManager.getAllMessages();
    await messagingManager.writeMessage(new Date().toLocaleDateString() +  " " + new Date().toLocaleTimeString());
    await new Promise(r => setTimeout(r, 2000));
    await messagingManager.writeMessage(new Date().toLocaleDateString() +  " " + new Date().toLocaleTimeString());
    await messagingManager.getAllMessages();
    await messagingManager.markAllMessagesAsRead();
    await new Promise(r => setTimeout(r, 2000));
    await messagingManager.writeMessage(new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString());
    await messagingManager.getAllMessages();
}

process();
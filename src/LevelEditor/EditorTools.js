import SubscriptionManager from "../SubscriptionManager/SubscriptionManager";

export default class EditorTools{
    constructor(){
        this.subscriptionManager = new SubscriptionManager();
        this.tools = [];
    }

    setTools(tools){
        this.tools.splice(0);
        for (let i = 0; i < tools.length; i++) {
            this.tools.push(tools[i]);
        }
        
        this.subscriptionManager.callSubscribedCallback("TOOLS_UPDATED");
    }
}
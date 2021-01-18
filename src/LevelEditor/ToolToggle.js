import SubscriptionManager from "../SubscriptionManager/SubscriptionManager";

export default class ToolToggle{
    constructor(label, name, action, holdDefault){
        this.label = label;
        this.name = name;
        this.action = action;

        this.hold = holdDefault;

        this.subscriptionManager = new SubscriptionManager();
    }

    onClick(){
        this.hold = this.action();
        this.subscriptionManager.callSubscribedCallback("ACTION")
    }
}
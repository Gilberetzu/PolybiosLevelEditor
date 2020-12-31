export default class SubscriptionManager{
    constructor(){
        this.subscriptions = {};
    }

    subscribe(name, callback){
        this.subscriptions[name] = callback;
    }

    unsubscribe(name){
        delete this.subscriptions[name];
    }

    callSubscribedCallback(TYPE){
        const subscriptionNames = Object.keys(this.subscriptions);

        for (let i = 0; i < subscriptionNames.length; i++) {
            const name = subscriptionNames[i];
            this.subscriptions[name](TYPE);
        }
    }
}
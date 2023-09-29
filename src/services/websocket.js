import { Subject } from 'rxjs';
// import GlobalConfig from './constants/constants';
// import userInfo from './constants/constants';

let subUser = new Subject();

export let messageService = {
    sendMessage: message => {
        WebSocketClient.getInstance().sendingMessage(message);
    },
    clearMessages: () => subUser.next(),
    getMessage: () => subUser.asObservable(),
};

class WebSocketClient {
    static instance = null;
    callbacks = {};

    static getInstance() {
        if (!WebSocketClient.instance) {
            WebSocketClient.instance = new WebSocketClient();
        }
        return WebSocketClient.instance;
    }

    constructor() {
        this.socketRef = null;
    }

    addCallbacks = (...callbacks) => (this.callbacks = { ...callbacks });

    connect = () => {
        let headers = {};
        let authToken =
            '9NMBNNkHA6o4AX3axcPQC2rzax8E28DdBqM/TZffOH8fXZJCEMLuKFgxM9RtZPcl';
        headers['authentication-token'] = authToken;
        let url =
            'https://qa.twixor.digital/moc/actions'.replace('http', 'ws') +
            '/actions';
        console.log(url);
        this.socketRef = new WebSocket(url, null, {
            headers,
        });

        this.socketRef.onopen = () => {
            console.log('WebSocket open');
        };

        this.socketRef.onmessage = e => {
            subUser.next(e.data);
        };

        this.socketRef.onerror = e => {
            console.log(e.message);
        };

        this.socketRef.onclose = () => {
            console.log("WebSocket closed let's reopen");
            this.connect();
        };
    };

    sendingMessage(message) {
        this.socketRef.send(JSON.stringify(message));
    }

    state = () => this.socketRef.readyState;

    waitForSocketConnection = callback => {
        let socket = this.socketRef;
        let recursion = this.waitForSocketConnection;
        setTimeout(() => {
            if (socket.readyState === 1) {
                console.log('Connection is made');
                if (callback != null) {
                    callback();
                }
                return;
            } else {
                console.log('wait for connection...');
                recursion(callback);
            }
        }, 4000);
    };
}

export default WebSocketClient.getInstance();
import * as SignalR from '@microsoft/signalr';

export class ConversationClient {
    messages = [];
    connection = null;
    callback = null;

    constructor(url) {
        if (this.connection != null) {
            this.connection?.stop();
            this.messages = [];
        }

        this.connection = new SignalR.HubConnectionBuilder()
            .withUrl(url)
            .build();
    }

    initialize(onMessageReceived) {
        this.callback = onMessageReceived;
        if (!this.connection) throw new Error('NotInitialized');

        this.connection.on('ReceivedMessage', (messageId, message) => {
            if (message === '[EOM]') {
                if (this.callback) this.callback(this.messages, true);
                return;
            }

            const index = this.messages.findIndex((p) => p.messageId === messageId);
            if (index > -1) {
                this.messages[index].content += message;
            } else {
                this.messages.push({
                    messageId,
                    role: 'assistant',
                    content: message
                });
            }

            if (this.callback) this.callback(this.messages, false);
        });

        this.connection
            .start()
            .then(() => {
                this.connection?.invoke('SendMessage', []);
            })
            .catch();
    }

    sendMessage(message) {
        this.messages.push({
            messageId: null,
            role: 'user',
            content: message
        });

        if (this.callback) this.callback(this.messages, false);
        this.connection?.invoke('SendMessage', this.messages);
    }

    dispose() {
        this.connection?.stop();
        this.messages = [];
    }
}

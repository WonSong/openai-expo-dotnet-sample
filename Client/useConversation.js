import {useEffect, useRef, useState} from 'react';
import {ConversationClient} from './conversation-client';

export function useConversationHub(hubName) {
    const [messages, setMessages] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const conversationClient = useRef(null);

    const handleMessagesReceived = (messages, isDone) => {
        requestAnimationFrame(() => {
            if (isDone) setLoading(false);
            setMessages([...messages]);
        });
    };

    const sendMessage = (message) => {
        setLoading(true);
        conversationClient.current?.sendMessage(message);
    };

    useEffect(() => {
        conversationClient.current = new ConversationClient(hubName);
        conversationClient.current?.initialize(handleMessagesReceived);

        return () => {
            conversationClient.current?.dispose();
        };
    }, []);

    return [messages, sendMessage, isLoading];
}

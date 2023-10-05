import {SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useConversationHub} from "./useConversation";
import {useState, useRef} from "react";

export default function App() {
    const ref = useRef(null);
    const [messages, sendMessage, isLoading] = useConversationHub('your-server-url/conversation')
    const [userMessage, setUserMessage] = useState('');

    const handleSandPressed = () => {
        setUserMessage('');
        sendMessage(userMessage);
    }

    return (
        <View style={{flex: 1}}>
            <ScrollView style={{flexGrow: 1}} ref={ref} onContentSizeChange={() => ref.current?.scrollToEnd({animated: true})}>
                <SafeAreaView/>
                <View style={styles.root}>
                    {messages.map((p, i) => p.role === 'assistant' ? <AssistantMessage message={p.content} key={i}/> :
                        <UserMessage message={p.content} key={i}/>)}
                </View>

            </ScrollView>
            <View style={styles.textInputContainer}>
                <TextInput style={styles.textInput} value={userMessage} onChangeText={setUserMessage}/>
                <TouchableOpacity style={styles.sendButton} onPress={handleSandPressed}><Text>Send</Text></TouchableOpacity>
            </View>
            <SafeAreaView/>
        </View>
    );
}

const AssistantMessage = (props) => {
    return (
        <View style={styles.assistantRoot}>
            <Text style={styles.name}>Assistant</Text>
            <Text>{props.message}</Text>
        </View>
    )
}

const UserMessage = (props) => {
    return (
        <View style={styles.userRoot}>
            <Text style={styles.name}>User</Text>
            <Text>{props.message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        margin: 30
    },
    assistantRoot: {
        marginBottom: 10
    },
    userRoot: {
        marginBottom: 10
    },
    name: {
        fontWeight: '600',
        marginBottom: 5
    },
    textInputContainer: {
        flexDirection: 'row'
    },
    textInput: {
        marginLeft: 30,
        marginRight: 10,
        borderWidth: 1,
        padding: 10,
        borderColor: 'black',
        flexGrow: 1
    },
    sendButton: {
        marginRight: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

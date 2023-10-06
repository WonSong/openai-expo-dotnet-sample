import {SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useConversationHub} from "./useConversation";
import {useState, useRef} from "react";

export default function App() {
    const ref = useRef(null);
    const [messages, sendMessage, isLoading] = useConversationHub('your-server-url/conversation')
    const [userMessage, setUserMessage] = useState('');

    const handleSendPressed = () => {
        setUserMessage('');
        sendMessage(userMessage);
    }

    return (<View style={styles.root}>
        <ScrollView style={styles.scroll} ref={ref} onContentSizeChange={() => ref.current?.scrollToEnd({animated: true})}>
            <SafeAreaView/>
            {messages.map((p, i) => (<View key={i} style={styles.messageRoot}>
                <Text style={styles.name}>{p.role}</Text>
                <Text>{p.content}</Text>
            </View>))}
        </ScrollView>
        <View style={styles.textInputContainer}>
            <TextInput style={styles.textInput} value={userMessage} onChangeText={setUserMessage}/>
            <TouchableOpacity style={styles.sendButton} onPress={handleSendPressed}><Text>Send</Text></TouchableOpacity>
        </View>
        <SafeAreaView/>
    </View>);
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    }, scroll: {
        flexGrow: 1,
        padding: 30
    }, messageRoot: {
        marginBottom: 10
    }, name: {
        fontWeight: '600', marginBottom: 5, textTransform: 'capitalize'
    }, textInputContainer: {
        flexDirection: 'row'
    }, textInput: {
        marginLeft: 30, marginRight: 10, borderWidth: 1, padding: 10, borderColor: 'black', flexGrow: 1
    }, sendButton: {
        marginRight: 30, justifyContent: 'center', alignItems: 'center'
    }
});

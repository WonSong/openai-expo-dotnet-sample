# openai-expo-dotnet-sample
ChatGPT streaming sample using React Native (Expo) and .NET (SignalR)

https://github.com/WonSong/openai-expo-dotnet-sample/assets/5981331/646d0ca6-d4bc-42dc-a072-1efb62301f09

## How to run

### Server
1. Add your Open AI secret to the ConversationHub.cs file in the Server folder
2. Run the server
3. Use Ngrok to create tunnel `ngrok http 5207`, so your app on a simulator can connect to your local server

### Mobile app
4. Using Node 18, install dependencies using `yarn` in the Client folder
5. Run the app with `yarn ios`

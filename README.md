# openai-expo-dotnet-sample
ChatGPT streaming sample using React Native (Expo) and .NET (SignalR)


https://github.com/WonSong/openai-expo-dotnet-sample/assets/5981331/5370576e-d5ae-4846-a094-48d0e2cc9952


## How to run

### Server
1. Add your Open AI secret to the ConversationHub.cs file in the Server folder
2. Run the server
3. Use Ngrok to create tunnel `ngrok http 5207`, so your app on a simulator can connect to your local server

### Mobile app
4. Add the ngrok address + /conversation at in the App.js file
5. Using Node 18, install dependencies using `yarn` in the Client folder
6. Run the app with `yarn ios`

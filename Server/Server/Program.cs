using Server.Hubs;
using Server.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();
builder.Services.AddHttpClient();
builder.Services.AddSingleton<OpenAIService>();

var app = builder.Build();
app.MapHub<ConversationHub>("/conversation");
app.Run();
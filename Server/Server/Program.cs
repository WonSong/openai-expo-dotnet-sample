using Server.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();
builder.Services.AddHttpClient();

var app = builder.Build();
app.MapHub<ConversationHub>("/conversation");
app.Run();
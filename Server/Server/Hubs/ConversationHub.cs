using System.Net.Http.Headers;
using System.Text;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using Server.Models;
using Server.Services;

namespace Server.Hubs;

public class ConversationHub : Hub
{
    private readonly HttpClient _httpClient;
    private const string OPEN_AI_BASE_URL = "https://api.openai.com/v1";
    private const string CHATGPT_MODEL = "gpt-3.5-turbo-16k";

    // Important: Do not store secrets in code. 
    private const string OPEN_AI_SECRET = "";

    public ConversationHub(OpenAIService openAiService, IHttpClientFactory httpClientFactory)
    {
        _httpClient = httpClientFactory.CreateClient();
    }

    public async Task SendMessage(List<OpenAIMessage> messages)
    {
        if (messages.Count == 0)
        {
            messages.Add(new OpenAIMessage
            {
                Role = "system",
                Content = "Assume a role of life coach. Start by greeting the user"
            });
        }

        var requestMessage = new HttpRequestMessage
        {
            RequestUri = new Uri($"{OPEN_AI_BASE_URL}/chat/completions"),
            Method = HttpMethod.Post,
            Headers = { Authorization = new AuthenticationHeaderValue("Bearer", OPEN_AI_SECRET) },
            Content = new StringContent(
                JsonConvert.SerializeObject(new { model = CHATGPT_MODEL, messages, stream = true }),
                Encoding.UTF8, "application/json")
        };

        var messageId = Guid.NewGuid();
        var responseMessage = await _httpClient.SendAsync(requestMessage, HttpCompletionOption.ResponseHeadersRead);
        if (!responseMessage.IsSuccessStatusCode)
        {
            Console.WriteLine(await responseMessage.Content.ReadAsStringAsync());

            await Clients.All.SendAsync("ReceivedMessage", messageId, "[ERROR]");
            return;
        }

        var stream = await responseMessage.Content.ReadAsStreamAsync();
        using (var reader = new StreamReader(stream))
        {
            while (!reader.EndOfStream)
            {
                var stringContent = await reader.ReadLineAsync();
                if (string.IsNullOrEmpty(stringContent)) continue;

                stringContent = stringContent.Replace("data: ", "").Trim();
                if (stringContent.Equals("[DONE]"))
                {
                    await Clients.All.SendAsync("ReceivedMessage", messageId, "[EOM]");
                    break;
                }

                var jsonContent = JsonConvert.DeserializeObject<OpenAIResponse>(stringContent);
                var message = jsonContent.Choices.FirstOrDefault().Delta.Content;
                if (string.IsNullOrEmpty(message)) continue;

                await Clients.All.SendAsync("ReceivedMessage", messageId, message);
            }
        }
    }
}
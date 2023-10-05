using Newtonsoft.Json;

namespace Server.Models;

public class OpenAIResponse
{
    public List<OpenAIChoice> Choices { get; set; }
}

public class OpenAIChoice
{
    public OpenAIMessage Delta { get; set; }
}
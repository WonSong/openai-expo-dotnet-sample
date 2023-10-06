
using Newtonsoft.Json;

namespace Server.Models;

public class OpenAIMessage
{
    [JsonProperty("role")]
    public string Role { get; set; }
    
    [JsonProperty("content")]
    public string Content { get; set; }
}

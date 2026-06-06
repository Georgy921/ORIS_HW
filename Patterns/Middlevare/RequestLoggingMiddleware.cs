using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

public class RequestLoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly string _logFilePath = "logs.txt";

    public RequestLoggingMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var request = context.Request;

        string log = $"[{DateTime.Now:yyyy-MM-dd HH:mm:ss}] " +
                     $"{request.Method} {request.Path}";

        await _next(context);

        log += $" -> {context.Response.StatusCode}";

        Console.WriteLine(log);

        await File.AppendAllTextAsync(_logFilePath, log + Environment.NewLine);
    }
}
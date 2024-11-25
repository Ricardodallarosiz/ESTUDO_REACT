using Microsoft.EntityFrameworkCore;
using API.Models;
using API.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;


var builder = WebApplication.CreateBuilder(args);

// Configurar o DbContext
builder.Services.AddDbContext<AppDataContext>();

// Configurar o CORS
builder.Services.AddCors(options =>
    options.AddPolicy("Acesso Total", policy =>
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod())
);

var app = builder.Build();

// Middleware para CORS
app.UseCors("Acesso Total");

// Rota Inicial
app.MapGet("/", () => "API de Gerenciamento de Tarefas");

// Endpoints de Categoria

// GET: /api/categoria/listar
app.MapGet("/api/categoria/listar", async (AppDataContext ctx) =>
{
    var categorias = await ctx.Categorias.ToListAsync();
    return categorias.Any() ? Results.Ok(categorias) : Results.NotFound();
});

// POST: /api/categoria/cadastrar
app.MapPost("/api/categoria/cadastrar", async (Categoria categoria, AppDataContext ctx) =>
{
    ctx.Categorias.Add(categoria);
    await ctx.SaveChangesAsync();
    return Results.Created($"/api/categoria/{categoria.CategoriaId}", categoria);
});

// Endpoints de Tarefa

// GET: /api/tarefa/listar
app.MapGet("/api/tarefa/listar", async (AppDataContext ctx) =>
{
    var tarefas = await ctx.Tarefas.Include(t => t.Categoria).ToListAsync();
    return tarefas.Any() ? Results.Ok(tarefas) : Results.NotFound();
});

// GET: /api/tarefa/naoconcluidas
app.MapGet("/api/tarefa/naoconcluidas", async (AppDataContext ctx) =>
{
    var tarefas = await ctx.Tarefas
        .Include(t => t.Categoria)
        .Where(t => t.Status != "Concluída")
        .ToListAsync();
    return tarefas.Any() ? Results.Ok(tarefas) : Results.NotFound();
});

// GET: /api/tarefa/concluidas
app.MapGet("/api/tarefa/concluidas", async (AppDataContext ctx) =>
{
    var tarefas = await ctx.Tarefas
        .Include(t => t.Categoria)
        .Where(t => t.Status == "Concluída")
        .ToListAsync();
    return tarefas.Any() ? Results.Ok(tarefas) : Results.NotFound();
});

// POST: /api/tarefa/cadastrar
app.MapPost("/api/tarefa/cadastrar", async (Tarefa tarefa, AppDataContext ctx) =>
{
    var categoria = await ctx.Categorias.FindAsync(tarefa.CategoriaId);
    if (categoria == null)
    {
        return Results.NotFound("Categoria não encontrada.");
    }

    tarefa.Categoria = categoria;
    tarefa.Status = "Não iniciada"; // Status padrão para novas tarefas
    ctx.Tarefas.Add(tarefa);
    await ctx.SaveChangesAsync();
    return Results.Created($"/api/tarefa/{tarefa.TarefaId}", tarefa);
});

// PATCH: /api/tarefa/alterar/{id}
/*app.MapPatch("/api/tarefa/alterar/{id}", async (int id, AppDataContext ctx) =>
{
    var tarefa = await ctx.Tarefas.FindAsync(id);
    if (tarefa == null)
    {
        return Results.NotFound("Tarefa não encontrada.");
    }

    // Alterar o status da tarefa
    tarefa.Status = tarefa.Status switch
    {
        "Não iniciada" => "Em andamento",
        "Em andamento" => "Concluída",
        _ => tarefa.Status
    };

    ctx.Tarefas.Update(tarefa);
    await ctx.SaveChangesAsync();
    return Results.Ok(tarefa);
});

app.Run();*/

app.MapPut("/api/tarefa/alterar/{id}", async (int id, AppDataContext ctx) =>
{
    var tarefa = await ctx.Tarefas.FindAsync(id);
    if (tarefa == null)
    {
        return Results.NotFound("Tarefa não encontrada.");
    }

    // Alterar o status da tarefa
    tarefa.Status = tarefa.Status switch
    {
        "Não iniciada" => "Em andamento",
        "Em andamento" => "Concluída",
        _ => tarefa.Status
    };

    ctx.Tarefas.Update(tarefa);
    await ctx.SaveChangesAsync();
    return Results.Ok(tarefa);
});



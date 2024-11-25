export interface Tarefa {
    id: number; // ID único da tarefa
    titulo: string; // Título da tarefa
    descricao: string; // Descrição detalhada
    status: string; // Status da tarefa (ex.: "Concluída", "Em andamento")
    categoria: {
        id: number; // ID da categoria associada
        nome: string; // Nome da categoria
    };
}

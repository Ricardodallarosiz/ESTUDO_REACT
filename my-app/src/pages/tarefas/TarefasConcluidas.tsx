import React, { useEffect, useState } from "react";
import api from "../../services/api";

interface Categoria {
    nome: string;
}

interface Tarefa {
    tarefaId: number;
    titulo: string;
    descricao: string;
    status: string;
    categoria: Categoria;
}

const TarefasConcluidas: React.FC = () => {
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);

    useEffect(() => {
        // Faz a requisição para listar tarefas concluídas
        api.get("/tarefa/concluidas")
            .then((response) => {
                setTarefas(response.data);
            })
            .catch((error) => {
                console.error("Erro ao listar tarefas concluídas:", error);
            });
    }, []);

    return (
        <div>
            <h2>Tarefas Concluídas</h2>
            <table border={1}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Descrição</th>
                        <th>Status</th>
                        <th>Categoria</th>
                    </tr>
                </thead>
                <tbody>
                    {tarefas.map((tarefa) => (
                        <tr key={tarefa.tarefaId}>
                            <td>{tarefa.tarefaId}</td>
                            <td>{tarefa.titulo}</td>
                            <td>{tarefa.descricao}</td>
                            <td>{tarefa.status}</td>
                            <td>{tarefa.categoria?.nome}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TarefasConcluidas;

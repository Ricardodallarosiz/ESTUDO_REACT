import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tarefa } from "../../models/Tarefas";

const TarefasConcluidas: React.FC = () => {
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);

    useEffect(() => {
        axios
            .get<Tarefa[]>("http://localhost:5000/api/tarefa/concluidas")
            .then((res) => setTarefas(res.data))
            .catch((err) => console.error("Erro ao buscar tarefas concluídas:", err));
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
                        <tr key={tarefa.id}>
                            <td>{tarefa.id}</td>
                            <td>{tarefa.titulo}</td>
                            <td>{tarefa.descricao}</td>
                            <td>{tarefa.status}</td>
                            <td>{tarefa.categoria.nome}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TarefasConcluidas;

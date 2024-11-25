import React, { useState } from "react";
import axios from "axios";

const AlterarTarefa: React.FC = () => {
    const [tarefaId, setTarefaId] = useState<number | null>(null);
    const [mensagem, setMensagem] = useState<string>("");

    const alterarStatus = () => {
        if (!tarefaId) {
            setMensagem("Por favor, insira o ID da tarefa.");
            return;
        }

        // Faz a requisição PATCH para alterar o status
        axios
            .patch(`http://localhost:3000/api/tarefa/alterar/${tarefaId}`)
            .then((response) => {
                setMensagem(`Status da tarefa alterado com sucesso: ${response.data.status}`);
            })
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    setMensagem("Tarefa não encontrada.");
                } else {
                    setMensagem("Erro ao alterar o status da tarefa.");
                }
            });
    };

    return (
        <div>
            <h2>Alterar Status da Tarefa</h2>
            <div>
                <label htmlFor="tarefaId">ID da Tarefa:</label>
                <input
                    type="number"
                    id="tarefaId"
                    value={tarefaId || ""}
                    onChange={(e) => setTarefaId(Number(e.target.value))}
                />
                <button onClick={alterarStatus}>Alterar Status</button>
            </div>
            {mensagem && <p>{mensagem}</p>}
        </div>
    );
};

export default AlterarTarefa;

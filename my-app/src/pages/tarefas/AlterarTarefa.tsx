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

        axios
            .patch(`http://localhost:3000/api/tarefa/alterar/${tarefaId}`)
            .then((resposta) => {
                setMensagem(`Status da tarefa alterado com sucesso: ${resposta.data.status}`);
            })
            .catch((erro) => {
                if (erro.response && erro.response.status === 404) {
                    setMensagem("Tarefa não encontrada.");
                } else {
                    setMensagem("Erro ao alterar o status da tarefa.");
                }
            });
    };

    return (
        <div>
            <h2>Alterar Status da Tarefa</h2>
            <input
                type="number"
                placeholder="ID da Tarefa"
                value={tarefaId || ""}
                onChange={(e) => setTarefaId(Number(e.target.value))}
            />
            <button onClick={alterarStatus}>Alterar Status</button>
            {mensagem && <p>{mensagem}</p>}
        </div>
    );
};

export default AlterarTarefa;

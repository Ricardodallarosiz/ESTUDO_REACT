import React, { useState } from "react";
import axios from "axios";

const CadastrarTarefa: React.FC = () => {
    const [titulo, setTitulo] = useState<string>("");
    const [descricao, setDescricao] = useState<string>("");
    const [categoriaId, setCategoriaId] = useState<number | null>(null);
    const [mensagem, setMensagem] = useState<string>("");

    const cadastrarTarefa = (e: React.FormEvent) => {
        e.preventDefault();

        if (!titulo || !descricao || !categoriaId) {
            setMensagem("Preencha todos os campos.");
            return;
        }

        const tarefa = {
            titulo,
            descricao,
            categoriaId,
            status: "Não iniciada", // Status inicial
        };

        axios
            .post("http://localhost:3000/api/tarefa/cadastrar", tarefa)
            .then(() => setMensagem("Tarefa cadastrada com sucesso!"))
            .catch(() => setMensagem("Erro ao cadastrar a tarefa."));
    };

    return (
        <div>
            <h2>Cadastrar Tarefa</h2>
            <form onSubmit={cadastrarTarefa}>
                <input
                    type="text"
                    placeholder="Título"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />
                <textarea
                    placeholder="Descrição"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Categoria ID"
                    value={categoriaId || ""}
                    onChange={(e) => setCategoriaId(Number(e.target.value))}
                />
                <button type="submit">Cadastrar</button>
            </form>
            {mensagem && <p>{mensagem}</p>}
        </div>
    );
};

export default CadastrarTarefa;

import React, { useState, useEffect } from "react";
import api from "../../services/api";

interface Categoria {
    categoriaId: number;
    nome: string;
}

const CadastrarTarefa: React.FC = () => {
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [categoriaId, setCategoriaId] = useState<number | null>(null);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [mensagem, setMensagem] = useState("");

    useEffect(() => {
        // Busca categorias para o dropdown
        api.get("/categoria/listar")
            .then((response) => {
                setCategorias(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar categorias:", error);
            });
    }, []);

    const cadastrarTarefa = (e: React.FormEvent) => {
        e.preventDefault();

        if (!titulo || !descricao || !categoriaId) {
            setMensagem("Preencha todos os campos.");
            return;
        }

        const novaTarefa = {
            titulo,
            descricao,
            status: "Não iniciada", // Status padrão
            categoriaId,
        };

        api.post("/tarefa/cadastrar", novaTarefa)
            .then(() => {
                setMensagem("Tarefa cadastrada com sucesso!");
                setTitulo("");
                setDescricao("");
                setCategoriaId(null);
            })
            .catch((error) => {
                console.error("Erro ao cadastrar tarefa:", error);
                setMensagem("Erro ao cadastrar tarefa.");
            });
    };

    return (
        <div>
            <h2>Cadastrar Nova Tarefa</h2>
            {mensagem && <p>{mensagem}</p>}
            <form onSubmit={cadastrarTarefa}>
                <div>
                    <label>Título:</label>
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Descrição:</label>
                    <input
                        type="text"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Categoria:</label>
                    <select
                        value={categoriaId || ""}
                        onChange={(e) => setCategoriaId(Number(e.target.value))}
                        required
                    >
                        <option value="">Selecione</option>
                        {categorias.map((categoria) => (
                            <option key={categoria.categoriaId} value={categoria.categoriaId}>
                                {categoria.nome}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
};

export default CadastrarTarefa;

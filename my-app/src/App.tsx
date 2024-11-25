import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AlterarTarefa from "./pages/tarefas/AlterarTarefa";
import TarefasConcluidas from "./pages/tarefas/TarefasConcluidas";
import TarefasNaoConcluidas from "./pages/tarefas/TarefasNaoConcluidas";
import ListarTarefas from "./pages/tarefas/ListarTarefas";
import CadastrarTarefa from "./pages/tarefas/CadastrarTarefa";

const App: React.FC = () => {
    return (
        <Router>
            <nav>
                <ul>
                    <li><a href="/tarefas/alterar">Alterar Tarefa</a></li>
                    <li><a href="/tarefas/concluidas">Tarefas Concluídas</a></li>
                    <li><a href="/tarefas/naoconcluidas">Tarefas Não Concluídas</a></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/tarefas/alterar" element={<AlterarTarefa />} />
                <Route path="/tarefas/concluidas" element={<TarefasConcluidas />} />
                <Route path="/tarefas/naoconcluidas" element={<TarefasNaoConcluidas />} />
                <Route path="/tarefas/listar" element={<ListarTarefas />} />
                <Route path="/tarefas/cadastrar" element={<CadastrarTarefa />} />
            </Routes>
        </Router>
    );
};

export default App;

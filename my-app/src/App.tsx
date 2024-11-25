import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AlterarTarefa from "./pages/tarefas/AlterarTarefa";
import CadastrarTarefa from "./pages/tarefas/CadastrarTarefa";
import ListarTarefas from "./pages/tarefas/ListarTarefas";
import TarefasConcluidas from "./pages/tarefas/TarefasConcluidas";
import TarefasNaoConcluidas from "./pages/tarefas/TarefasNaoConcluidas";

const App: React.FC = () => {
    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/alterar-tarefa">Alterar Tarefa</Link></li>
                    <li><Link to="/cadastrar-tarefa">Cadastrar Tarefa</Link></li>
                    <li><Link to="/listar-tarefas">Listar Tarefas</Link></li>
                    <li><Link to="/tarefas-concluidas">Tarefas Concluídas</Link></li>
                    <li><Link to="/tarefas-naoconcluidas">Tarefas Não Concluídas</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/alterar-tarefa" element={<AlterarTarefa />} />
                <Route path="/cadastrar-tarefa" element={<CadastrarTarefa />} />
                <Route path="/listar-tarefas" element={<ListarTarefas />} />
                <Route path="/tarefas-concluidas" element={<TarefasConcluidas />} />
                <Route path="/tarefas-naoconcluidas" element={<TarefasNaoConcluidas />} />
            </Routes>
        </Router>
    );
};

export default App;

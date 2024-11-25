"use client";
import React, { useState } from "react";

export default function FluxoDeCaixa() {
  const [query, setQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState<string>("Agosto");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const transacoes = [
    { id: 1, categoria: "Supermercado", valor: -140.5, data: "2024-11-10" },
    { id: 2, categoria: "Salário", valor: 5000, data: "2024-11-01" },
    { id: 3, categoria: "Internet", valor: -100, data: "2024-11-05" },
    { id: 4, categoria: "Conta de Luz", valor: -250, data: "2024-11-25" }
  ];

  const entradas = transacoes
    .filter((t) => t.valor > 0)
    .reduce((acc, t) => acc + t.valor, 0);
  const saídas = transacoes
    .filter((t) => t.valor < 0)
    .reduce((acc, t) => acc + Math.abs(t.valor), 0);

  const saldoTotal = entradas - saídas;

  // Porcentagem de gastos
  const percentualSaidas = (saídas / entradas) * 100 || 0;

  return (
    <div className="min-h-screen bg-green-500 flex flex-col items-center p-4">
      {/* Cabeçalho */}
      <header className="flex items-center justify-start w-full bg-white p-4 shadow-md">
        <button
          onClick={() => window.history.back()}
          className="text-gray-600 hover:text-black"
        >
          {/* Ícone de voltar */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h1 className="text-lg font-semibold text-gray-800 ml-4">Fluxo de Caixa</h1>
      </header>

      {/* Dashboard */}
      <div className="w-full max-w-md bg-white p-6 mt-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold text-center mb-4">Saldo Total</h2>
        <div className="relative flex items-center justify-center">
          {/* Gráfico circular */}
          <svg viewBox="0 0 36 36" className="w-32 h-32">
            {/* Parte vermelha (saídas) */}
            <path
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#FF0000" // Cor vermelha para as saídas
              strokeWidth="3.6"
              strokeDasharray={`${percentualSaidas}, 100`}
            />
            {/* Parte verde (entradas) */}
            <path
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#32CD32" // Cor verde para as entradas
              strokeWidth="3.6"
              strokeDasharray={`${100 - percentualSaidas}, 100`}
              strokeDashoffset={percentualSaidas}
            />
          </svg>
          {/* Texto no centro do gráfico */}
          <div className="absolute text-center">
            <span className="text-base font-bold text-gray-800">
              R$ {saldoTotal.toFixed(2)}
            </span>
          </div>
        </div>
        <p className="mt-4 text-center">
          <span className="text-green-600">Entradas: R$ {entradas.toFixed(2)}</span> |{" "}
          <span className="text-red-600">Saídas: R$ {saídas.toFixed(2)}</span>
        </p>
      </div>

      {/* Seletor de Mês e Pesquisa de Transações */}
      <div className="w-full max-w-md bg-white p-6 mt-6 rounded-lg shadow-lg">
        {/* Caixa de Pesquisa de Transações */}
        <input
          type="text"
          placeholder="Pesquisar transações..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg mb-4"
        />

        {/* Seletor de Mês */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full text-left p-2 border rounded-lg flex justify-between items-center"
          >
            <span>{selectedMonth}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {isDropdownOpen && (
            <ul className="absolute w-full bg-white border rounded-lg shadow-lg mt-1">
              {meses.map((mes) => (
                <li
                  key={mes}
                  onClick={() => {
                    setSelectedMonth(mes);
                    setIsDropdownOpen(false);
                  }}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {mes}
                </li>
              ))}
            </ul>
          )}
        </div>

        <ul className="space-y-3 mt-4">
          {transacoes
            .filter((t) =>
              t.categoria.toLowerCase().includes(query.toLowerCase())
            )
            .map((t) => (
              <li
                key={t.id}
                className="flex justify-between items-center p-3 bg-gray-100 rounded-md"
              >
                <div>
                  <p className="text-sm font-medium">{t.categoria}</p>
                </div>
                <p
                  className={`font-semibold ${
                    t.valor < 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {t.valor < 0 ? "-" : "+"}R$ {Math.abs(t.valor).toFixed(2)}
                </p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

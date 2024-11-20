"use client";  
import React, { useState } from 'react';
import Image from 'next/image';
import AcmeLogo from '@/app/ui/acme-logo';

export default function LoginPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-white">
      {/* Cabeçalho */}
      <header className="flex items-center justify-between w-full px-4 py-2 shadow-md bg-white">
        <div className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={32} height={32} />
          <span className="ml-2 text-lg font-semibold text-gray-800">Organiza</span>
        </div>

        {/* Botão para abrir o menu */}
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>

          {/* Menu suspenso */}
          {isMenuOpen && (
            <ul className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg">
              <li>
                <a
                  href="/"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Início
                </a>
              </li>
              <li>
                <a
                  href="#sobre-a-empresa"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sobre a Empresa
                </a>
              </li>
            </ul>
          )}
        </div>
      </header>

      {/* Card de Login */}
      <div className="w-full max-w-sm mx-auto mt-10 p-6 rounded-lg shadow-lg bg-gradient-to-b from-green-100 to-green-500">
        <form className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700">E-mail:</label>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              className="w-full px-3 py-2 mt-1 border rounded-md focus:ring focus:ring-green-300 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700">Senha:</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              className="w-full px-3 py-2 mt-1 border rounded-md focus:ring focus:ring-green-300 focus:outline-none"
            />
          </div>
          <div className="flex justify-end">
            <a
              href="#"
              className="text-sm text-green-700 hover:underline"
            >
              Esqueci minha senha
            </a>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none"
          >
            Entrar
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-800">
          Não possui cadastro?{' '}
          <a href="#" className="text-green-700 font-semibold hover:underline">
            Inscreva-se gratuitamente
          </a>
        </p>
      </div>

      {/* Rodapé */}
      <footer className="w-full bg-gray-100 py-4">
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
          <a href="#" className="hover:underline">Sobre nós</a>
          <a href="#" className="hover:underline">Política de privacidade</a>
          <a href="#" className="hover:underline">Termos de uso</a>
          <a href="#" className="hover:underline">Fale conosco</a>
        </div>
        <div className="flex items-center justify-center mt-2">
          <Image src="/logo.png" alt="Logo" width={24} height={24} />
          <span className="ml-2 text-sm text-gray-600">Organiza - No seu próprio controle</span>
        </div>
      </footer>
    </div>
  );
}
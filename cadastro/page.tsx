"use client";

import React, { useState } from "react";

export default function CadastroPage() {
  const [nome, setNome] = useState("");
  const [dataAniversario, setDataAniversario] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !dataAniversario || !telefone || !senha || !confirmaSenha) {
      alert("Por favor, preencha todos os campos!");
      return;
    }
    if (senha !== confirmaSenha) {
      alert("As senhas não coincidem!");
      return;
    }
    console.log("Cadastro realizado com sucesso:", { nome, dataAniversario, telefone });
  };

  return (
    <div style={styles.page}>
      {/* Cabeçalho */}
      <header style={styles.header}>
        <div style={styles.logoContainer}>
          <img src="/logo.png" alt="Logo" style={styles.logo} />
          <span style={{ ...styles.companyName, color: "#000000"}}>Organiza</span>
        </div>
        <button style={styles.menuButton}>≡</button>
      </header>

      {/* Formulário */}
      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Nome completo:</label>
          <input
            type="text"
            placeholder="Digite seu nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>Data de aniversário:</label>
          <input
            type="date"
            value={dataAniversario}
            onChange={(e) => setDataAniversario(e.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>Número de telefone:</label>
          <div style={styles.phoneField}>
            <img src="/br-flag.png" alt="BR" style={styles.flag} />
            <input
              type="tel"
              placeholder="Digite seu número"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              style={styles.phoneInput}
            />
          </div>

          <label style={styles.label}>Senha:</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>Confirme sua senha:</label>
          <input
            type="password"
            placeholder="Confirme sua senha"
            value={confirmaSenha}
            onChange={(e) => setConfirmaSenha(e.target.value)}
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Continuar
          </button>

          <p style={styles.loginText}>
            Já possui cadastro?{" "}
            <a href="/login" style={styles.loginLink}>
              Entrar
            </a>
          </p>
        </form>
      </div>

      {/* Rodapé */}
      <footer style={styles.footer}>
        <div style={styles.footerLinks}>
          <a href="#" style={styles.footerLink}>Sobre nós</a>
          <a href="#" style={styles.footerLink}>Política de Privacidade</a>
          <a href="#" style={styles.footerLink}>Fale conosco</a>
          <a href="#" style={styles.footerLink}>Termos de uso</a>
        </div>
        <div style={styles.socialIcons}>
          <a href="#"><img src="/whatsapp-icon.png" alt="WhatsApp" style={styles.icon} /></a>
          <a href="#"><img src="/instagram-icon.png" alt="Instagram" style={styles.icon} /></a>
          <a href="#"><img src="/facebook-icon.png" alt="Facebook" style={styles.icon} /></a>
          <a href="#"><img src="/email-icon.png" alt="Email" style={styles.icon} /></a>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f8f9fa",
    display: "flex",
    flexDirection: "column" as "column",
    minHeight: "100vh",
  },
  header: {
    backgroundColor: "#e8f5e9",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    height: "40px",
    marginRight: "10px",
  },
  companyName: {
    color: "#fff",
    fontSize: "20px",
    fontWeight: "bold",
  },
  menuButton: {
    color: "#fff",
    fontSize: "24px",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  formContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e8f5e9",
    padding: "20px",
  },
  form: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    textAlign: "center" as "center",
    marginBottom: "20px",
    fontSize: "24px",
    color: "#28a745",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontSize: "14px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
  },
  phoneField: {
    display: "flex",
    alignItems: "center",
    marginBottom: "15px",
  },
  flag: {
    width: "24px",
    height: "16px",
    marginRight: "10px",
  },
  phoneInput: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
  },
  loginText: {
    textAlign: "center" as "center",
    marginTop: "10px",
    fontSize: "14px",
  },
  loginLink: {
    color: "#28a745",
    textDecoration: "none",
  },
  footer: {
    backgroundColor: "#f1f1f1",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerLinks: {
    display: "flex",
    gap: "15px",
  },
  footerLink: {
    color: "#555",
    textDecoration: "none",
    fontSize: "14px",
  },
  socialIcons: {
    display: "flex",
    gap: "10px",
  },
  icon: {
    width: "24px",
    height: "24px",
  },
};
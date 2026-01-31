'use client'
import { useRouter } from "next/navigation";
import Loading from "./components/loading";
import React, { useState } from "react";
import { LoadingProps } from "@/types/loading";
import Notification from "./components/notification";
import { notificationProps } from "@/types/notification";

export default function Home() {

  const [loading, setLoading] = useState<LoadingProps>({
    mensagem: "Carregando Login",
    loading: false
  })

  const [notification, setNotification] = useState<notificationProps>({
    mensagem: "mensagem",
    onClose: function () {
      setNotification({
        ...notification,
        show: false
      })
    },
    onShow: function () {
      setNotification({
        ...notification,
        show: true
      })
    },
    show: true,
    titulo: "titulo",
    btnLabel: "Ok"
  })


  setTimeout(() => {
    notification
  }, 5000);

  async function login(e: React.FormEvent<HTMLFormElement>) {

    try {

      e.preventDefault()
      setLoading({
        ...loading,
        loading: true
      })

    } catch (error) {

      setLoading({
        ...loading,
        loading: false
      })
    }
  }

  const router = useRouter()

  return (
    <div className="container-fluid bg-secondary">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Login</h3>

              <form id="loginEvent" onSubmit={login}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">E-mail</label>
                  <input type="email" className="form-control" id="email" placeholder="Digite seu e-mail"
                    required />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Senha</label>
                  <input type="password" className="form-control" id="password" placeholder="Digite sua senha"
                    required />
                </div>

                <button type="submit" className="btn btn-secondary d-block w-100">Entrar</button>
                <button type="button" className="btn btn-outline-secondary d-block mt-2 w-100" id="btnCriarConta" onClick={function () {

                  router.push("/criarContaCliente")
                }}>
                  Criar Conta - Cliente
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Loading mensagem={loading.mensagem} loading={loading.loading} />
      <Notification
        mensagem={notification.mensagem}
        show={notification.show}
        onClose={notification.onClose}
        onShow={notification.onShow}
        titulo={notification.titulo}
        btnLabel={notification.btnLabel}
      />
    </div>
  );
}

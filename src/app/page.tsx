'use client'
import { useRouter } from "next/navigation";
import Loading from "./components/loading";
import React, { useState } from "react";
import { LoadingProps } from "@/types/loading";
import Notification from "./components/notification";
import { notificationProps } from "@/types/notification";
import { userLogin } from "@/types/userLogin";
import { responseJSON } from "@/types/responseJson";

export default function Home() {

  const router = useRouter()

  const [usuarioLogin, setUsuarioLogin] = useState<userLogin>({
    senha: "",
    email: ""
  })

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
    show: false,
    titulo: "titulo",
    btnLabel: "Ok"
  })


  async function login(e: React.FormEvent<HTMLFormElement>) {

    try {

      e.preventDefault()
      setLoading({
        ...loading,
        loading: true
      })

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senha: usuarioLogin.senha,
          email: usuarioLogin.email
        })
      })

      const responseJSON = await response.json() as responseJSON
      if (responseJSON.success) {

        localStorage.setItem("utoken", responseJSON.data.token)
        router.push(responseJSON.data.redirectTo)
      }
      else {

        setNotification({
          ...notification,
          show: true,
          mensagem: responseJSON.message || "Erro."
        })
      }

      setLoading({
        ...loading,
        loading: false
      })

    } catch (error) {

      setLoading({
        ...loading,
        loading: false
      })

      setNotification({
        ...notification,
        show: true,
        mensagem: "Erro no Nível de Cliente ao Consultar."
      })
    }
  }

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
                    onChange={function (e) {
                      setUsuarioLogin({
                        ...usuarioLogin,
                        email: e.target.value
                      })
                    }}
                    required />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Senha</label>
                  <input type="password" className="form-control" id="password" placeholder="Digite sua senha"
                    required onChange={function (e) {
                      setUsuarioLogin({
                        ...usuarioLogin,
                        senha: e.target.value
                      })
                    }} />
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

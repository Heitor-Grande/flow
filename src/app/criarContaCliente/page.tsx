'use client'
import React, { useState } from "react"
import { Cliente } from "../../types/cliente"
import Loading from "../components/loading"
import { LoadingProps } from "@/types/loading"
import { responseJSON } from "@/types/responseJson"
import { notificationProps } from "@/types/notification"
import { useRouter } from "next/navigation"
import Notification from "../components/notification"

export default function CriarContaCliente() {

    const router = useRouter()

    const [loading, setLoading] = useState<LoadingProps>({
        mensagem: "Carregando",
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

    const [cliente, setCliente] = useState<Cliente>({
        oficina: "",
        nome: "",
        email: "",
        cpf: "",
        senha: "",
        telefone: ""
    })

    async function criarNovaConta(e: React.FormEvent) {

        try {

            e.preventDefault()

            setLoading(function (loading) {
                return {
                    ...loading,
                    loading: true
                }
            })

            const response = await fetch("/api/criarCliente", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cliente)
            })

            const responseJSON = await response.json() as responseJSON
         
            if (responseJSON.success) {


                setNotification({
                    ...notification,
                    show: true,
                    mensagem: responseJSON.message
                })

                setTimeout(() => {

                    router.push("/")
                }, 2000);
            }
            else {
                
                setNotification({
                    ...notification,
                    show: true,
                    mensagem: responseJSON.message || "Erro."
                })
            }

            setLoading(function (loading) {
                return {
                    ...loading,
                    loading: false
                }
            })
        } catch (error) {


            setLoading(function (loading) {
                return {
                    ...loading,
                    loading: false
                }
            })

            setNotification({
                ...notification,
                show: true,
                mensagem: "Erro ao executar comando no Navegador."
            })
        }
    }

    return (
        <div className="container-fluid pt-4 bg-secondary justify-content-center align-items-center vh-100">
            <div className="card w-75 shadow p-4 m-auto">
                <h3 className="text-center mb-2">Cadastro de Cliente</h3>
                <form id="formCadCliente" onSubmit={criarNovaConta}>

                    <div className="mb-1">
                        <label htmlFor="oficina" className="form-label">Oficina</label>
                        <select value={cliente.oficina} onChange={function (e) {
                            setCliente(function (cliente) {
                                return {
                                    ...cliente,
                                    oficina: e.target.value
                                }

                            })
                        }} id="oficina" className="form-select" required>
                            <option value="">Selecione...</option>
                            <option value="48069970804">Teste de Desenvolvimento</option>
                        </select>
                    </div>
                    <div className="mb-1">
                        <label htmlFor="nome" className="form-label">Nome</label>
                        <input type="text" className="form-control" id="nome" placeholder="Digite o nome do cliente" required
                            maxLength={30} onChange={function (e) {
                                setCliente(function (cliente) {
                                    return {
                                        ...cliente,
                                        nome: e.target.value
                                    }

                                })
                            }} />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="cpf" className="form-label">CPF</label>
                        <input type="text" className="form-control" id="cpf" placeholder="Digite seu CPF..." required
                            maxLength={11} onChange={function (e) {
                                setCliente(function (cliente) {
                                    return {
                                        ...cliente,
                                        cpf: e.target.value
                                    }

                                })
                            }} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email" className="form-label">E-mail</label>
                        <input type="email" className="form-control" id="email" placeholder="email@gmail.com" required
                            maxLength={30} onChange={function (e) {
                                setCliente(function (cliente) {
                                    return {
                                        ...cliente,
                                        email: e.target.value
                                    }

                                })
                            }} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="telefone" className="form-label">Número de Telefone</label>
                        <input type="tel" className="form-control" id="telefone" placeholder="11987654321" required
                            maxLength={11} onChange={function (e) {
                                setCliente(function (cliente) {
                                    return {
                                        ...cliente,
                                        telefone: e.target.value
                                    }
                                })
                            }} />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="nome" className="form-label">Senha Para Acesso</label>
                        <input type="password" className="form-control" id="senhaPigente" placeholder="Senha Para Acesso" required
                            maxLength={30} minLength={5} onChange={function (e) {
                                setCliente(function (cliente) {
                                    return {
                                        ...cliente,
                                        senha: e.target.value
                                    }

                                })
                            }} />
                    </div>
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-secondary mt-2" id="btnCadastrar">Cadastrar</button>
                    </div>
                </form>
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
    )
}
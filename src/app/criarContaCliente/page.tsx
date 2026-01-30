'use client'

import { useState } from "react"
import { Cliente } from "../../types/cliente"
import Loading from "../components/loading"
import { LoadingProps } from "@/types/loading"
export default function CriarContaCliente() {

    const [loading, setLoading] = useState<LoadingProps>({
        mensagem: "Carregando",
        loading: false
    })

    const [cliente, setCliente] = useState<Cliente>({
        oficina: "",
        nome: "",
        email: "",
        cpf: "",
        senha: "",
        telefone: ""
    })

    return (
        <div className="container-fluid pt-4 bg-secondary justify-content-center align-items-center vh-100">
            <div className="card w-75 shadow p-4 m-auto">
                <h3 className="text-center mb-2">Cadastro de Cliente</h3>
                <form id="formCadCliente">

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
        </div>
    )
}
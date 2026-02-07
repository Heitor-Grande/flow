'use client'
import { useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import Notification from "../components/notification"
import { notificationProps } from "@/types/notification"

export default function MenuCliente() {

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
        titulo: "Solicitação de Serviço Enviada com Sucesso",
        btnLabel: "Ok"
    })

    const [showModal, setShowModal] = useState(false)

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const dados = {
            veiculo: formData.get("veiculo"),
            ano: formData.get("ano"),
            kmAtual: formData.get("kmAtual"),
            descricao: formData.get("descricao")
        }

        // aqui depois você chama sua API 🚀
        setShowModal(false)
        setNotification({
            ...notification,
            show: true,
            mensagem: "Sua solicitação de serviço foi enviada, aguarde a aprovação. Você será notificado via e-mail ou pelo Telefone Cadastrado"
        })
    }

    return (
        <div className="container-fluid m-0 p-0">
            <nav className="navbar bg-secondary">
                <div className="container-fluid justify-content-center">
                    <span className="text-white text-center w-100">
                        Usuário de Teste
                    </span>
                    <span className="text-white text-center w-100">
                        
                    </span>
                </div>
            </nav>

            <div className="container-fluid mt-2">
                <div className="row">

                    <div className="col-sm-12 col-md-6 col-lg-6 mt-2">
                        <button
                            className="btn btn-outline-secondary w-100 p-5"
                            onClick={() => setShowModal(true)}
                        >
                            <i className="bi bi-tools me-2"></i>
                            Solicitar Novo Serviço
                        </button>
                    </div>

                </div>
            </div>

            {/* MODAL */}
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Novo Serviço</Modal.Title>
                </Modal.Header>

                <Form onSubmit={handleSubmit}>
                    <Modal.Body>

                        <Form.Group className="mb-3">
                            <Form.Label>Veículo</Form.Label>
                            <Form.Control
                                type="text"
                                name="veiculo"
                                placeholder="Ex: Gol 1.6"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Ano</Form.Label>
                            <Form.Control
                                type="number"
                                name="ano"
                                placeholder="Ex: 2018"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>KM Atual</Form.Label>
                            <Form.Control
                                type="number"
                                name="kmAtual"
                                placeholder="Ex: 85000"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Descrição do Serviço</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="descricao"
                                placeholder="Descreva o serviço necessário"
                                required
                            />
                        </Form.Group>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Cancelar
                        </Button>

                        <Button variant="primary" type="submit">
                            Enviar Solicitação
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

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

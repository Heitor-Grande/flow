'use client'
import { Card, Button, Badge } from "react-bootstrap"

export default function Servicos() {

    function aprovarServico() {
        console.log("Serviço aprovado e agendado")
        // aqui você pode abrir outro modal de agendamento 👀
    }

    function negarServico() {
        console.log("Serviço negado")
        // aqui você pode chamar a API pra negar
    }

    return (
        <Card className="shadow-sm mb-3">
            <Card.Body>

                <div className="d-flex justify-content-between align-items-center mb-2">
                    <Card.Title className="mb-0">
                        Mercedes-Benz Atego 2426
                    </Card.Title>

                    <Badge bg="warning" text="dark">
                        Pendente
                    </Badge>
                </div>

                <Card.Subtitle className="mb-2 text-muted">
                    Ano: 2019 • KM: 185.400
                </Card.Subtitle>

                <Card.Text>
                    O caminhão está apresentando perda de potência em subidas e
                    consumo excessivo de combustível. Também percebi fumaça escura
                    saindo pelo escapamento em algumas situações. Gostaria de uma
                    avaliação do sistema de injeção e do motor, além de verificar
                    possíveis falhas eletrônicas.
                </Card.Text>

                <div className="d-flex gap-2 justify-content-end">
                    <Button
                        variant="success"
                        onClick={aprovarServico}
                    >
                        Aprovar e Agendar
                    </Button>

                    <Button
                        variant="danger"
                        onClick={negarServico}
                    >
                        Negar
                    </Button>
                </div>

            </Card.Body>
        </Card>
    )
}
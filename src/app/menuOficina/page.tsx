'use client'
import NavBar from "../components/navBar"
import { useRouter } from "next/navigation"

export default function MenuOficina() {

    const router = useRouter()

    function sair() {

        sessionStorage.clear()
        localStorage.clear()
        router.push("/")
    }

    return (
        <div className="container-fluid m-0 p-0">
            <NavBar />
            <div className="container-fluid mt-2">
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-6 mt-2">
                        <button className="btn btn-outline-secondary w-100 p-5" id="listaClientes" onClick={function () {
                            router.push("/menuOficina/listaCliente")
                        }}>
                            <i className="bi bi-person-lines-fill">
                                Lista de Clientes
                            </i>
                        </button>
                    </div>

                    <div className="col-sm-12 col-md-6 col-lg-6 mt-2">
                        <button className="btn btn-outline-secondary w-100 p-5" id="servicos" onClick={function () {
                            router.push("/menuOficina/servicos")
                        }}>
                            <i className="bi bi-tools">
                                Serviços
                            </i>
                        </button>
                    </div>

                    <div className="col-sm-12 col-md-6 col-lg-6 mt-2">
                        <button className="btn btn-outline-secondary w-100 p-5" id="dashBoard" onClick={function () {
                            router.push("/menuOficina/dashboard")
                        }}>
                            <i className="bi bi-tools">
                                Dashboard
                            </i>
                        </button>
                    </div>

                    <div className="col-sm-12 col-md-6 col-lg-6 mt-2">
                        <button className="btn btn-outline-secondary w-100 p-5" id="btnLogout" onClick={function () {
                            sair()
                        }}>
                            <i className="bi bi-door-open">
                                Sair
                            </i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
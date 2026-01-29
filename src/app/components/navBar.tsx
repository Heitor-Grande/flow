import { useRouter } from "next/navigation"

export default function NavBar() {

    const router = useRouter()

    return (
        <nav className="navbar bg-secondary">
            <div className="container-fluid justify-content-center">
                <span className="text-white text-center w-100">
                    Empresa XPTO LTDA
                </span>
                <span className="text-white text-center w-100">
                    CNPJ: 12.345.678/0001-99
                </span>
            </div>
        </nav>
    )
}
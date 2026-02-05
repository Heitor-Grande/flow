import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Loading from "./loading"
import { useState } from "react"
import { LoadingProps } from "@/types/loading";
import Notification from "./notification";
import { notificationProps } from "@/types/notification";
import { responseJSON } from "@/types/responseJson";

export default function NavBar() {

    const router = useRouter()

    const [loading, setLoading] = useState<LoadingProps>({
        loading: false,
        mensagem: "Validando Login"
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

    async function verificaLogin() {

        try {

        } catch (error) {

        }
    }

    useEffect(function () {

        async function carregar() {

            await verificaLogin()
        }

        carregar()
    }, [])

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

            <Loading mensagem={loading.mensagem} loading={loading.loading} />
            <Notification
                mensagem={notification.mensagem}
                show={notification.show}
                onClose={notification.onClose}
                onShow={notification.onShow}
                titulo={notification.titulo}
                btnLabel={notification.btnLabel}
            />
        </nav>
    )
}
export interface notificationProps {
    mensagem: string
    show: boolean
    onClose: () => void
    onShow: () => void
    titulo: string
    btnLabel: string
}

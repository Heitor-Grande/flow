import { notificationProps } from "@/types/notification"

export default function Notification({
    mensagem,
    show,
    onClose,
    titulo,
    btnLabel
}: notificationProps) {
    if (!show) return null

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                zIndex: 9999,
            }}
            className="d-flex justify-content-center align-items-center"
        >
            <div
                className="bg-white rounded shadow p-4 text-center"
                style={{ minWidth: 300, maxWidth: 400 }}
            >
                <h5 className="mb-3">{titulo}</h5>

                <p className="text-secondary">{mensagem}</p>

                <button
                    className="btn btn-primary mt-3"
                    onClick={onClose}
                >
                    {btnLabel}
                </button>
            </div>
        </div>
    )
}
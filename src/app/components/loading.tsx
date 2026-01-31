import { LoadingProps } from "@/types/loading"

export default function Loading({ mensagem, loading }: LoadingProps) {
    if (!loading) return null

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                zIndex: 9999,
            }}
            className="d-flex flex-column justify-content-center align-items-center"
        >
            <div
                className="bg-white rounded shadow p-4 text-center"
                style={{ minWidth: 300, maxWidth: 400 }}
            >

                <div className="spinner-border text-dark mb-3" role="status">
                    <span className="visually-hidden">Carregando...</span>
                </div>

                {mensagem && (
                    <p className="text-dark fw-semibold">
                        {mensagem}
                    </p>
                )}
            </div>
        </div>
    )
}

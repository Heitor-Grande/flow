import { LoadingProps } from "@/types/loading"

export default function Loading({ mensagem, loading }: LoadingProps) {
    if (!loading) return null

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(255, 255, 255, 0.6)", // transparente
                zIndex: 9999,
            }}
            className="d-flex flex-column justify-content-center align-items-center"
        >
            <div className="spinner-border text-secondary mb-3" role="status">
                <span className="visually-hidden">Carregando...</span>
            </div>

            {mensagem && (
                <p className="text-secondary fw-semibold">
                    {mensagem}
                </p>
            )}
        </div>
    )
}

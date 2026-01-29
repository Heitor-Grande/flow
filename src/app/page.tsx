'use client'
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter()

  return (
    <div className="container-fluid bg-secondary">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Login</h3>

              <form id="loginEvent">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">E-mail</label>
                  <input type="email" className="form-control" id="email" placeholder="Digite seu e-mail"
                    required />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Senha</label>
                  <input type="password" className="form-control" id="password" placeholder="Digite sua senha"
                    required />
                </div>

                <button type="submit" className="btn btn-secondary d-block w-100">Entrar</button>
                <button type="button" className="btn btn-outline-secondary d-block mt-2 w-100" id="btnCriarConta" onClick={function () {

                  router.push("/criarContaCliente")
                }}>
                  Criar Conta - Cliente
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

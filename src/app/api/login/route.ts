import { userLogin } from "@/types/userLogin";
import { gerarJWT, validarHash } from "../auth/auth";
import responseApi from "../utils/responseApi";
import database from "../database/database";


export async function POST(req: Request) {

    try {

        const { email, senha } = await req.json() as userLogin

        const queryDB_oficina = `
            SELECT senha, cnpj, fantasia FROM public.cliente WHERE email = $1
        `

        const userOficina = await database.query(queryDB_oficina, [email])

        const queryDB_cliente = `
            SELECT senha, nome, telefone, idclientecliente FROM public.clientecliente WHERE email = $1
        `

        const userCliente = await database.query(queryDB_cliente, [email])

        const tipoUser = userOficina.rows.length > 0 ? 'userOficina' : userCliente.rows.length > 0 ? 'userCliente' : 'not_user'

        let user
        let jwt

        if (tipoUser === "userCliente") {

            user = userCliente.rows[0]

            jwt = gerarJWT('cliente', user.cnpj, user.fantasia)

            const hashValido = await validarHash(senha, user.senha)
            if (hashValido.success == false) {

                return responseApi("Senha e/ou E-mail Inválido(s)", null, false, 403)
            }
        }
        else if (tipoUser === "userOficina") {

            user = userOficina.rows[0]

            jwt = gerarJWT('oficina', user.cnpj, user.fantasia)

            const hashValido = await validarHash(senha, user.senha)
            if (hashValido.success == false) {

                return responseApi("Senha e/ou E-mail Inválido(s)", null, false, 403)
            }
        }

        if (tipoUser === "not_user") {

            return responseApi("Senha e/ou E-mail Inválido(s)", null, false, 403)
        }

        if (jwt?.success) {

            return responseApi("Bem-Vindo", {
                success: true,
                redirectTo: tipoUser == "userOficina" ? "/oficina/main" : "/oficina/cliente/main",
                token: jwt.token
            }, true, 201)
        }

    } catch (error) {

        console.log(error  )
        return responseApi("Erro ao tentar Logar.", error, false, 500)
    }
}
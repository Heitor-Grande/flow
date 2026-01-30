import { criptografar, gerarHash } from "../auth/auth";
import database from "../database/database";
import { Cliente } from "../../../types/cliente";
import responseApi from "../utils/responseApi";

export async function POST(req: Request) {
    try {

        const {
            oficina,
            nome,
            email,
            telefone,
            senha,
            cpf
        } = await req.json() as Cliente

        const sqlInsert = `
        INSERT INTO public.clientecliente
            (cnpj_cliente, nome, telefone, email, senha, cpf)
            VALUES($1, $2, $3, $4, $5, $6)
        `

        await database.query(sqlInsert, [oficina, nome, telefone, email, (await gerarHash(senha)).hash, criptografar(cpf).dadoCriptografado])

        return responseApi("Cadastro Realizado Com Sucesso!", null, true, 201)
    } catch (error) {

        return responseApi("Erro interno no Servidor", error, false, 500)
    }
}
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import cryptoJS from "crypto-js"
import { NextRequest, NextResponse } from "next/server"
import responseApi from "../utils/responseApi"

export function criptografar(dado: string) {

    try {

        const dadoCriptografado = cryptoJS.AES.encrypt(dado, process.env.CRYPTOJS_KEY!).toString()

        return {
            success: true,
            dadoCriptografado: dadoCriptografado
        }
    } catch (error) {

        return {
            success: false,
            message: "Erro ao aplicar Segurança."
        }
    }
}

export function descriptografar(dadoCriptografado: string) {

    try {

        const dado = cryptoJS.AES.decrypt(dadoCriptografado, process.env.CRYPTOJS_KEY!).toString(CryptoJS.enc.Utf8)

        return {
            success: true,
            dado: dado
        }
    } catch (error) {

        return {
            success: false,
            message: "Erro ao Consultar Informação real."
        }
    }
}

export function gerarJWT(tipoUser: string, info1: string, info2: string) {

    try {

        let token = null

        if (tipoUser == 'oficina') {

            token = jwt.sign({ tipoUser, cnpj: info1, fantasia: info2 }, process.env.JWT_KEY!, { expiresIn: '7d' })
        }
        else if (tipoUser == 'cliente') {

            token = jwt.sign({ tipoUser, idCliente: info1, nome: info2 }, process.env.JWT_KEY!, { expiresIn: '7d' })
        }

        return {
            success: true,
            token: token
        }
    } catch (error) {

        return {
            success: false,
            message: "Erro ao gerar token de validação."
        }
    }
}

export function validarJWT(req: NextRequest) {
    try {

        const token = req.headers.get("authorization")

        if (!token) {

            return responseApi("Token Não Enviado", null, false, 403)
        }

        const tokenValido = jwt.verify(token, process.env.JWT_KEY!)

        if (tokenValido) {

            return true
        }
        else {

            return responseApi("Token Inválido", null, false, 403)
        }
    } catch (error) {

        return responseApi("Erro ao Verificar Token", error, false, 500)
    }
}

export async function gerarHash(texto: string) {

    try {

        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALTROUNDS!))

        const hash = await bcrypt.hash(texto, salt)

        return {
            success: true,
            hash: hash
        }
    } catch (error) {

        return {
            success: false,
            error: error
        }
    }
}

export async function validarHash(texto: string, hash: string) {

    try {

        const valido = await bcrypt.compare(texto, hash)

        if (valido) {

            return {
                success: true,
                message: "HASH válido"
            }
        }
        else {

            return {
                success: false,
                error: "HASH não válido"
            }
        }

    } catch (error) {

        return {
            success: false,
            error: error
        }
    }
}


type RateData = {
    count: number
    expiresAt: number
}

const store = new Map<string, RateData>()

const LIMIT = 5           // 5 requests
const WINDOW_MS = 60_000   // por 1 minuto

export async function rateLimit(req: NextRequest) {

    try {
        const ip =
            req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
            "anonymous"

        const now = Date.now()

        const data = store.get(ip)
        // primeira vez ou janela expirou
        if (!data || now > data.expiresAt) {

            store.set(ip, {
                count: 1,
                expiresAt: now + WINDOW_MS
            })
            return "OK"
        }

        // estourou o limite
        if (data.count >= LIMIT) {
            return responseApi("Muitas Requisições, aguarde.", null, false, 401)
        }

        // ainda pode
        data.count++
        return "OK"
    } catch (error) {

        return responseApi("Erro no Rate Limit", null, false, 500)
    }
}
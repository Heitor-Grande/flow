import { NextRequest, NextResponse } from "next/server"
import { validarJWT, rateLimit } from "./app/api/auth/auth"
import responseApi from "./app/api/utils/responseApi"

export async function proxy(req: NextRequest) {

    try {

        const rateResponse = await rateLimit(req)

        if (rateResponse != "OK") {

            return rateResponse
        }

        //validando JWT
        const response = validarJWT(req)

        if (response !== true) {

            return response
        }

        return NextResponse.next()
    } catch (error) {

        return responseApi("Erro no Middleware", null, false, 500)
    }
}

export const config = {
    matcher: [
        "/api/:path((?!login).*)"
    ]
}

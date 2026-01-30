export default function responseApi(message: string, dataOrError: any, success: boolean, status: number) {

    try {

        if (success) {

            return Response.json({ success: true, message: message, data: dataOrError }, { status: status })
        }
        else {
            return Response.json({ success: false, error: String(dataOrError) }, { status: status })
        }
    } catch (error) {

        return Response.json({ success: false, error: String(error) }, { status: 500 })
    }
}
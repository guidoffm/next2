// export const dynamic = 'force-dynamic' // defaults to auto
export async function POST(request: Request) {
    // console.log('GET request',  request);
    const payload = await request.json();
    console.log('POST request', payload);
    return Response.json({
        message: 'POST request :' + request.url,
        payload: payload
    });
}
import { buildServer } from ".";




async function testServer(){
    const server= buildServer()

    const response = await server.inject({
        method:"GET",
        url:'/api/task'
    })

    console.log("Response: ", {
        header:response.headers,
        statusCode:response.statusCode,
        body:response.body
    });

}


testServer()
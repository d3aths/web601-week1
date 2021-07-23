const fs = require('fs')

//request and response for the server
const requestHandler = (req, res) => {
    const url = req.url
    const method = req.method

    //for homepage?
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>')
        res.Write('<head><title>Enter a message</title></head>')
        res.Write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></input></form></body>')
        res.Write('</html>')
        return res.end()
    }

    //pushing all the data from body into placeholder chunk
    //req on takes the data from the browser and saves it to chunk
    //need to make sure to return a value afterwards
    if (url === '/message' && method === 'POST') {
        const body = []
        req.on('data', chunk => body.push(chunk))
    }
    return req.on('end', () => {
        const parseBody = Buffer.concat(body).toString()
        //parseing changes it to text
        const message = parseBody.split('=')[1] //super important as removes all small whitespaces in things like passwords etc
        fs.writeFile('./message.txt', message, err => {
            res.statusCode = 302
            res.setHeader('Location', '/')
            return res.end()
        })
    })
    // res.setHeader('content-type', 'text/html')
    // res.write('<html>')
    // res.write('<head><title>WEB601</title></head>')
    // res.write('<body><h1>WEB601</h1></body>')
    // res.write('</html>')
    // res.end()
}

exports.handler = requestHandler
//can call this file by using require from any other place in the project
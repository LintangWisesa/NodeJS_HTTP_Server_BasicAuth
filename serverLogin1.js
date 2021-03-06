var http = require('http')
var fs = require('fs')

var metdatang = fs.readFileSync('./metdatang.html')
var meterror = fs.readFileSync('./meterror.html')

var dataJson = fs.readFileSync('./users.json', 'utf-8')
var dataObj = JSON.parse(dataJson)

var server = http.createServer((req, res) => {
    console.log('Ada yg request ke: ' + req.url)
    
    if(req.url === '/'){
        res.writeHead(200, {
            'Content-Type': 'text/html',
        })
        res.end(metdatang)
    }
    
    else if(req.url === '/signup'){
        if(req.method == 'POST'){
            var userBaru = []
            req.on('data', (x) => {
                console.log('User Baru = ' + x)
                var y = JSON.parse(x)
                userBaru.push(y)
                console.log(userBaru)
            })
            req.on('end', () => {
                console.log(userBaru[0])
                res.writeHead(200, {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 
                    'Origin, X-Requested-With, Content-Type, Accept'
                })
                function signup(cari) {
                    var cekEmail = dataObj.some((x)=>{
                        return x.email === cari.email  
                    })
                    if(cekEmail){
                        res.end('{"status": "Email sudah terdaftar"}')
                    } else {
                        dataObj.push(userBaru[0])
                        var ok = JSON.stringify(dataObj)
                        fs.writeFileSync('users.json', ok)
                        res.end(JSON.stringify(userBaru[0]))
                    }
                }
                signup(userBaru[0])
            })
        }
    }
    
    else if(req.url === '/login'){
        if(req.method == 'POST'){
            var userBaru = []
            req.on('data', (x) => {
                console.log('User Baru = ' + x)
                var y = JSON.parse(x)
                userBaru.push(y)
                console.log(userBaru)
            })
            req.on('end', () => {
                console.log(userBaru[0])
                res.writeHead(200, {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 
                    'Origin, X-Requested-With, Content-Type, Accept'
                })
                function login(cari) {
                    var cekEmail = dataObj.some((x)=>{
                        return x.email === cari.email  
                    })
                    if(cekEmail){
                        var cekPassword = dataObj.some((x)=>{
                            return x.password === cari.password
                        })
                        if(cekPassword){
                            res.end('{"status": "Login sukses!"}')
                        } else {
                            res.end('{"status": "Password salah!"}')
                        }
                    } else {
                        res.end('{"status": "Email belum terdaftar!"}')
                    }
                }
                login(userBaru[0])
            })
        }
    } 
    
    else {
        res.writeHead(404, {
            'Content-Type': 'text/html' 
        })
        res.end(meterror)
    }
})

server.listen(3456, () => {
    console.log('Server aktif di port 3456!')
})
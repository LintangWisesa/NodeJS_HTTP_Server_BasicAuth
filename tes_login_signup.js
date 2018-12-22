var users = [
    {email: 'andi@andi.com', password: '12345'},
    {email: 'budi@budi.com', password: '67890'},
    {email: 'caca@caca.com', password: 'abcde'},
]
var cari = {email: 'caca@caca.com', password: '12345'}

function signup(cari) {
    var cekEmail = users.some((x)=>{
        return x.email === cari.email
    })
    if(cekEmail){
        return 'Email sudah terdaftar sebelumnya!'
    } else {
        return 'Email baru, selamat bergabung!'
    }
}

function login(cari) {
    var cekEmail = users.some((x)=>{
        return x.email === cari.email   
    })
    if(cekEmail){
        var cekPassword = users.some((x)=>{
            return x.email === cari.email && x.password === cari.password
        })
        if(cekPassword){
            return 'Login sukses!'
        } else {
            return 'Password salah!'
        }
    } else {
        return 'Email belum terdaftar!'
    }
}

console.log(login(cari))
// console.log(signup(cari))
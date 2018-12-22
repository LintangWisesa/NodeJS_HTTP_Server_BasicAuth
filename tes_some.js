var data = [
  {email:'haha', password:'123'},
  {email:'hehe', password:'456'},
  {email:'haha', password:'789'}, 
]

function adaTidak(email) {
  return data.some(function(x) {
    return x.email === email;
  }); 
}

console.log(adaTidak('haho'))
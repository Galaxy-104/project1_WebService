const container = document.querySelector('section.container')
const form = container.querySelector('form')
const userId = form.querySelector('input#login-id')
const userPassword = form.querySelector('input#login-password')
const loginBtn = form.querySelector('.btns .login input')


form.addEventListener('input', function(e){
    console.log(userId.value, userPassword.value)
    if(userId.value !== "" && userPassword.value !== ""){
        loginBtn.classList.add('active')
        loginBtn.setAttribute('disabled', 'false')
    }else{
        loginBtn.classList.remove('active')
        loginBtn.setAttribute('disabled', 'true')
    }
})
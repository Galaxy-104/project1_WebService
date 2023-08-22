const container = document.querySelector('section.container')
const form = container.querySelector('form')
const userId = form.querySelector('input#userId')
const userPassword = form.querySelector('input#password')
const message = form.querySelector('div.message')
const loginBtn = form.querySelector('.btns .login input')


form.addEventListener('input', function(e){
    console.log(userId.value, userPassword.value)
    if(userId.value.trim() !== "" && userPassword.value.trim() !== ""){
        loginBtn.classList.add('active')
        loginBtn.removeAttribute('disabled')
    }else{
        loginBtn.classList.remove('active')
        loginBtn.setAttribute('disabled', 'true')
    }
})

loginBtn.addEventListener('click', async function(){
    const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: userId.value,
            password: userPassword.value
        })
    })

    const response = await res.json()
    console.log(response)
    if(response.code === 200){
        location.replace('http://127.0.0.1:5501/Front-end/html/records/home.html')
        message.innerHTML = ``
    }else if(response.code === 401){
        message.innerHTML = `아이디 또는 비밀번호가 일치하지 않습니다.`
    }else if(response.code === 404){
        message.innerHTML = `존재하지 않는 아이디입니다.`
    }
})
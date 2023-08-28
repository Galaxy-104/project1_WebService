const form = document.querySelector('form')
const loginInfo = form.querySelector('section.login-info')
const userInfo = form.querySelector('section.user-info')

const joinId = loginInfo.querySelector('input#userId')
const joinPassword = loginInfo.querySelector('input#password')
const joinEmail = loginInfo.querySelector('input#email')
const userName = userInfo.querySelector('input#user_name')
const contact = userInfo.querySelector('input#contact')
const height = userInfo.querySelector('div.body-profile input#height')
const weight = userInfo.querySelector('div.body-profile input#weight')
const goal = userInfo.querySelector('input#goal')
const checkId = loginInfo.querySelector('label[for="userId"] span.checkId')
const checkEmail = loginInfo.querySelector('label[for="email"] span.checkEmail')

const visibility = loginInfo.querySelector('div.visibility')
const submit = form.querySelector('div.submit button')

visibility.addEventListener('click', function(e){
    const on = visibility.querySelector('.on')
    const off = visibility.querySelector('.off')

    on.classList.toggle('active')
    off.classList.toggle('active')

    if(on.className.includes('active')){
        joinPassword.setAttribute('type', 'text')
    }else if(off.className.includes('active')){
        joinPassword.setAttribute('type', 'password')
    }
})

form.addEventListener('input', function(e){
    
    if(![joinId.value.trim(), joinPassword.value.trim(), joinEmail.value.trim(),
        userName.value.trim()].includes("")){
        submit.classList.add('active')
        submit.removeAttribute('disabled')
    }else{
        submit.setAttribute('disabled', true)
    }

})

// 아이디 & 이메일 중복 확인
form.addEventListener('focusout', function(e){
    if(e.target === joinId && e.target.value.trim() !== ""){
        check(e.target.value)
        .then(function(code){
            if(code === 200){
                checkId.innerHTML = `사용 가능한 아이디입니다.`
                checkId.style.color = `var(--primary-color)`
            }else if(code === 401){
                checkId.innerHTML = `이미 사용중인 아이디입니다.`
                checkId.style.color = `var(--red-1)`
            }
        })
    }else if(e.target === joinId && e.target.value === ""){
        checkId.innerHTML = ``
    }else if(e.target === joinEmail && e.target.value.trim() !== ""){
        check(e.target.value)
        .then(function(code){
            if(code === 200){
                checkEmail.innerHTML = `사용 가능한 이메일입니다.`
                checkEmail.style.color = `var(--primary-color)`
            }else if(code === 401){
                checkEmail.innerHTML = `이미 사용중인 이메일입니다.`
                checkEmail.style.color = `var(--red-1)`
            }
        })
    }else if(e.target === joinEmail && e.target.value === ""){
        checkEmail.innerHTML = ``
    }
})

async function check(data){

    const res = await fetch('http://localhost:5000/api/users/join/check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: data,
            email: data
        })
    })

    const response = await res.json()
    return response.code
}

// 회원가입
submit.addEventListener('click', async function(e){

    const res = await fetch('http://localhost:5000/api/users/join', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: joinId.value,
            password: joinPassword.value,
            email: joinEmail.value,
            name: userName.value,
            contact: contact.value,
            height: height.value,
            weight: weight.value,
            goal: goal.value
        })
    })

    const response = await res.json()
    console.log(response)
    if(response.code === 200){
        location.replace('http://127.0.0.1:5501/Front-end/html/home.html')
    }
})
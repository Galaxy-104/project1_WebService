const form = document.querySelector('form')
const loginInfo = form.querySelector('section.login-info')
const userInfo = form.querySelector('section.user-info')
const joinId = loginInfo.querySelector('input#join-id')
const joinPassword = loginInfo.querySelector('input#join-password')
const joinEmail = loginInfo.querySelector('input#join-email')
const userName = userInfo.querySelector('input#user-name')
const visibility = loginInfo.querySelector('div.visibility')
const submit = form.querySelector('input[type="submit"]')

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
    if(joinId.value !== "" && joinPassword.value !== "" &&
    joinEmail.value !== "" && userName.value !== ""){
        submit.classList.add('active')
        submit.setAttribute('disabled', false)
    }
})
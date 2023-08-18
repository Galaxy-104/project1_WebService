const form = document.querySelector('form')
const loginInfo = form.querySelector('section.login-info')
const userInfo = form.querySelector('section.user-info')
const joinId = loginInfo.querySelector('input#join-id')
const joinPassword = loginInfo.querySelector('input#join-password')
const visibility = loginInfo.querySelector('div.visibility')

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

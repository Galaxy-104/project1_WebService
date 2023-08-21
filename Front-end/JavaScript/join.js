const form = document.querySelector('form')
const loginInfo = form.querySelector('section.login-info')
const userInfo = form.querySelector('section.user-info')
const joinId = loginInfo.querySelector('input#userId')
const joinPassword = loginInfo.querySelector('input#password')
const joinEmail = loginInfo.querySelector('input#email')
const userName = userInfo.querySelector('input#user_name')
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

submit.addEventListener('click', async function(e){

    const res = await fetch('http://localhost:5000/api/users/join', {
        method: 'POST',
        body: JSON.stringify({
            userId: joinId.value,
            password: joinPassword.value,
            email: joinEmail.value,
            user_name: userName.value
        })
    })

    // const response = await res.json()
    // console.log(response)
})
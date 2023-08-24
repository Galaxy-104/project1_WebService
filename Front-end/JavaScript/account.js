const form = document.querySelector('form')
const inform_1 = form.querySelector('section.inform-1')
const inform_2 = form.querySelector('section.inform-2')
const profileImg = document.querySelector('.container div.profile-img img')

const userId = inform_1.querySelector('span#userId')
const userPassword = inform_1.querySelector('input#password')
const userEmail = inform_1.querySelector('span#email')
const userName = inform_1.querySelector('input#user_name')
const contact = inform_2.querySelector('input#contact')
const height = inform_2.querySelector('div.body-profile input#height')
const weight = inform_2.querySelector('div.body-profile input#weight')
const goal = inform_2.querySelector('input#goal')
const checkId = inform_1.querySelector('label[for="userId"] span.checkId')
const checkEmail = inform_1.querySelector('label[for="email"] span.checkEmail')

const visibility = inform_1.querySelector('div.visibility')
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

async function loadPage(){
    const userInfo = await fetch('http://localhost:5000/api/users/user', {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then(function(res){
            return res.json()
        })
        .then(function(data){
            return data.user
        })

    console.log(userInfo)

    userName.value = userInfo.name
    userEmail.innerHTML = userInfo.email
    userId.innerHTML = userInfo.userId
    contact.value = userInfo.contact

    if(userInfo.weight !== undefined){
       weight.value = userInfo.weight 
    }
    
    if(userInfo.height !== undefined){
        height.value = userInfo.height
    }

    if(userInfo.goal !== undefined){
        goal.value = userInfo.goal
    }

    if(userInfo.imgUrl !== undefined){
        profileImg.src = `${userInfo.imgUrl}`
    }else{
        profileImg.src = `https://t1.daumcdn.net/cfile/tistory/2513B53E55DB206927`
    }

}
loadPage()
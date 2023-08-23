const nav = document.querySelector('nav')
const logo = nav.querySelector('div.logo')
const btns = nav.querySelector('div.btns')
const account = nav.querySelector('div.account button')
const accountWindow = nav.querySelector('div.set-account')
const setting = nav.querySelector('div.set-btn button')
const settingWindow = nav.querySelector('div.setting')
const mode = settingWindow.querySelector('div.mode')
const lightMode = mode.querySelector('div.light-mode')
const darkMode = mode.querySelector('div.dark-mode')
const lightModeCheck = lightMode.querySelector('span:nth-child(2)')
const darkModeCheck = darkMode.querySelector('span:nth-child(2')


btns.addEventListener('click', function(e){
    if(e.target.parentNode === account){
        accountWindow.classList.toggle('active') 
        settingWindow.classList.remove('active')
    }else if(e.target.parentNode === setting){
        settingWindow.classList.toggle('active')
        accountWindow.classList.remove('active')
    }

    if(e.target.parentNode.className === 'alter-account'){
        location.assign('http://127.0.0.1:5501/Front-end/html/account.html')
    }else if(e.target.parentNode.className === 'logout'){
        console.log('로그아웃')
    }

    if(e.target === lightMode || e.target.parentNode === lightMode){
        console.log('일반모드', lightMode)
        lightMode.classList.add('active')
        darkMode.classList.remove('active')
        lightModeCheck.style.display = 'block'
        darkModeCheck.style.display = 'none'
    }else if(e.target === darkMode || e.target.parentNode === darkMode){
        console.log('다크모드')
        lightMode.classList.remove('active')
        darkMode.classList.add('active')
        darkModeCheck.style.display = 'block'
        lightModeCheck.style.display = 'none'
    }

})
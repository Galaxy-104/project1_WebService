const record = document.querySelector('section.record')
const time = record.querySelector('.time')
const date = record.querySelector('div.date > span:nth-child(2)')
const addLog = record.querySelector('button#add-log')
const todayLog = document.querySelector('section.today-log')
const foodInput = record.querySelector('div.food div.name input')
const calorieInput = record.querySelector('div.food div.calorie input')

if(today.getMonth() + 1 < 10){
    date.innerHTML = `${today.getFullYear()} / 0${today.getMonth() + 1} / ${today.getDate()}`
}else if(today.getDate() < 10){
    date.innerHTML = `${today.getFullYear()} / 0${today.getMonth() + 1} / 0${today.getDate()}`
}

// record 식사 타이밍 선택
time.addEventListener('click', function(event){
    const selectedTime = time.querySelector('.select')
    if(event.target.className !== 'time'){
        selectedTime.classList.remove('select')
        event.target.classList.add('select')
    }
})

// 칼로리에는 숫자만 입력할 수 있게
calorieInput.addEventListener('keyup', function(e){
    console.log(e.keyCode)
    if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
        // 0-9 only
        console.log('숫자입니다')
    }else{
        console.log('숫자가 아닙니다.')
        console.log(this.value.slice(0, this.value.length-1))
        this.value = this.value.split('').filter(c => {
            console.log(parseInt(c) == c)
            return parseInt(c) == c
        }).join('')
        console.log(this.value)
    }
})

// 기록하기 추가
addLog.addEventListener('click', async function(e){
    const selectedTime = time.querySelector('.select')
    const category = todayLog.querySelector(`.${selectedTime.getAttribute('id')}`)
    const list = category.querySelector('div.list ul')
    const li = document.createElement('li')
    li.innerHTML = `
        <span>${foodInput.value}</span>
        <span>${calorieInput.value} kcal</span>    
    `
    if(foodInput.value !== "" && calorieInput.value !== ""){
       list.appendChild(li) 
    }
})


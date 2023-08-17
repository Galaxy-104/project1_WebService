const record = document.querySelector('section.record')
const time = record.querySelector('.time')
const date = record.querySelector('div.date > span:nth-child(2)')

date.innerHTML = `${today.getFullYear()} / ${today.getMonth() + 1} / ${today.getDate()}`

// record 식사 타이밍 선택
time.addEventListener('click', function(event){
    const selectedTime = time.querySelector('.select')
    if(event.target.className !== 'time'){
        selectedTime.classList.remove('select')
        event.target.classList.add('select')
    }
})


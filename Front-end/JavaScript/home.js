console.log(localStorage.getItem('token'))

// 원하는 날짜 선택하기
contents.addEventListener('click', function(event){
    const selectDay = calendar.querySelector('div.select')
    if(event.target.className.includes('day') && 
    !event.target.className.includes('today')){
        if(selectDay !== null){
            selectDay.classList.remove('select')
        }
        event.target.classList.add('select')
    }else if(event.target.className.includes('today') && selectDay !== null){
        selectDay.classList.remove('select')
    }else if(selectDay !== null){
        selectDay.classList.remove('select')
    }
})
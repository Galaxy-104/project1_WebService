
const calendar = document.querySelector('.calendar')
const calendarHeader = calendar.querySelector('.calendar_header')
const weeks = calendar.querySelector('.calendar_weekdays')
const contents = calendar.querySelector('.calendar_contents')
const calendarTitle = calendarHeader.querySelector('h2')

const monthName = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const today = new Date()
const thisYear = today.getFullYear()
const thisMonth = today.getMonth() + 1



function createCalendar(y, m){
    let index = 0
    let isDay = false
    calendarTitle.innerHTML = `
    ${monthName[m - 1]} ${y}`
    createWeeks()
    const days = getDays(y, m)
    contents.innerHTML = ``

    // 날짜 없는 부분에 빈칸 생성
    while(!isDay){
        if(dayOfWeek[index] == days[0].dayOfWeek){
            isDay = true
        }else{
            createBlank()
            index++
        }
    }

    // 달력에 날짜 생성
    for(let i = 0; i < 42 - index; i++){
        if( i >= days.length){
            createBlank()
        }else{
            const checkTitle = document.querySelector('.calendar .calendar_header h2')
            const dateDiv = document.createElement('div')
            dateDiv.innerHTML = `${days[i].day}`
            
            // 오늘 날짜 확인
            if(checkTitle.innerHTML.includes(`${String(today.getFullYear())}`) &&
            checkTitle.innerHTML.includes(`${String(monthName[today.getMonth()])}`)
            && today.getDate() === days[i].day){
                console.log('오늘')
                dateDiv.className = 'today'
            }else{
                dateDiv.className = 'day'
            }
            contents.appendChild(dateDiv)
        }
    }

    // 오늘 표시하기

}
createCalendar(thisYear, thisMonth)

// 요일 제목 생성
function createWeeks(){
    weeks.innerHTML = ``
    for(let i = 0; i < 7; i++){
        const div = document.createElement('div')
        div.innerHTML = `<div>${dayOfWeek[i].substring(0, 3)}</div>`
        weeks.appendChild(div)
    }
}

// 해당 월이 며칠까지인지 확인
function getLastDate(year, month){
    return new Date(year, month, 0).getDate()
}

// 해당 날짜의 요일 확인
function getDayOfWeek(year, month, day){
    return new Date(year, month - 1, day).getDay()
}

// 빈칸 생성
function createBlank(){
    const blank = document.createElement('div')
    blank.className = 'blank'
    contents.appendChild(blank)
}

function getDays(y, m){
    let arr = []
    for(let i = 1; i <= getLastDate(y, m); i++){
        arr.push({ day: i, dayOfWeek: dayOfWeek[getDayOfWeek(y, m, i)]})
    }
    return arr
}

let year = thisYear
let month = thisMonth
let monthIndex = 0
let yearIndex = 0
// console.log(days)
// console.log(getLastDate(thisYear, thisMonth))
// console.log(thisMonth)

calendarHeader.addEventListener('click', function(event){
    
    if(event.target.className.includes('left')){
        monthIndex--
        let month = thisMonth + monthIndex
        if(month < 1){
            yearIndex--
            month = 12
            monthIndex = 12 - thisMonth
        }
        let year = thisYear + yearIndex
        createCalendar(year, month)
        // console.log(month, monthIndex)
    }else if(event.target.className.includes('right')){
        monthIndex++
        let month = thisMonth + monthIndex
        if(month > 12){
            yearIndex++
            month = 1
            monthIndex = -thisMonth + 1
        }
        let year = thisYear + yearIndex
        createCalendar(year, month)
        // console.log(month, monthIndex)
    }
})
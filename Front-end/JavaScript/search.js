const result = document.querySelector('section.result-container')
const cardContainer = result.querySelector('div.cards')
const search = document.querySelector('div.search')
const searchInput = search.querySelector('input#search')
const searchBtn = search.querySelector('span')

searchInput.addEventListener('keyup', function(e){
    if(e.keyCode === 13){
        console.log('검색')
        findCalorie()
    }
})
searchBtn.addEventListener('click', function(e){
    console.log('검색')
    findCalorie()
})

async function findCalorie(){

    const foods = []
    const data = await fetch(`https://openapi.foodsafetykorea.go.kr/api/dc2aacb3b72147fba864/I2790/json/1/1000//DESC_KOR=${searchInput.value}`)
    const calorieApi = await data.json()
    
    if(calorieApi.I2790.total_count !== '0'){
       calorieApi.I2790.row.forEach(function(food){
            foods.push(food)
        }) 
    }
    

    for(let i = 1; i < 91; i++){
        const data = await fetch(`https://openapi.foodsafetykorea.go.kr/api/dc2aacb3b72147fba864/I2790/json/${i}001/${i + 1}000/DESC_KOR=${searchInput.value}`)
        const datas = await data.json()
        if(datas.I2790.total_count !== '0'){
            datas.I2790.row.forEach(function(food){
                foods.push(food)
            })
        }else{
            break;
        }
    }
    
    
    foods.forEach(function(food){
        const card = document.createElement('div')
        card.className = 'card'
        if(food.MAKER_NAME !== ""){
          card.innerHTML = `
                <div class="content">
                    <h3>${food.DESC_KOR} (${food.MAKER_NAME})</h3>
                    <div><span>1회 제공량 ${food.SERVING_SIZE}g </span><span>(${food.NUTR_CONT1}kcal)</span></div>
                </div>
                <div class="check">
                    <span class="material-symbols-rounded">
                        check
                    </span>
                </div>
            `  
        }else{
            card.innerHTML = `
                <div class="content">
                    <h3>${food.DESC_KOR}</h3>
                    <div><span>1회 제공량 ${food.SERVING_SIZE}g </span><span>(${food.NUTR_CONT1}kcal)</span></div>
                </div>
                <div class="check">
                    <span class="material-symbols-rounded">
                        check
                    </span>
                </div>
            `  
        }
        cardContainer.appendChild(card)
    })    
}

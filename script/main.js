// HTML Elements
const itemContainers = document.querySelectorAll('.options')
const submitBtn = document.querySelector('.btn-submit')
const confirmOverlay = document.querySelector('.confirm-msg.overlay')
const confirmBtn = confirmOverlay.querySelector('.btn-confirm button:first-child')
const cancelBtn = confirmOverlay.querySelector('.btn-confirm button:nth-child(2)')
const order = confirmOverlay.querySelector('.order')


// Variables
let selected = 0
let wppURL


// Functions
function getTotal(items) {
    let total = 0

    items.forEach(item => {
        const price = Number((item.querySelector('strong').innerHTML).replace(',', '.'))
        total += price
    })

    return total
}


function getMessage(items, customer, deliveryAdress, total) {
    const message = `Olá, gostaria de fazer o pedido:\n- Prato: ${items[0].querySelector('h3').innerHTML}\n- Bebida: ${items[1].querySelector('h3').innerHTML}\n- Sobremesa: ${items[2].querySelector('h3').innerHTML}\nTotal: R$ ${total.toFixed(2).toString().replace('.', ',')}\n\nNome: ${customer}\nEndereço: ${deliveryAdress}`
    console.log(message)
    
    return encodeURIComponent(message)
}

function orderSetup(items, customer, deliveryAdress, total){
    order.innerHTML = ""

    items.forEach(item => {
        const itemName = item.querySelector('h3').innerHTML
        const itemPrice = item.querySelector('strong').innerHTML

        const itemHTML = `
            <div class="item">
                <span>${itemName}</span>
                <span>R$ ${itemPrice}</span>
            </div>
        `
        order.innerHTML += itemHTML
    })

    order.innerHTML += `
        <div class="item">
            <span>TOTAL</span>
            <span>R$ ${total.toFixed(2).toString().replace('.', ',')}</span>
        </div>
    `
}


// Events
itemContainers.forEach(container => {
    const items = container.querySelectorAll('div')
    
    items.forEach(item => {
        item.addEventListener('click', () => {  
            const selectedItem = container.querySelector('.selected')

            if (selectedItem != null){
                selectedItem.classList.remove('selected')
            
            } else {
                selected += 1
            }

            item.classList.add('selected')

            if (selected === itemContainers.length) {
                submitBtn.classList.add('ready')
            }
        })
    })
})



submitBtn.addEventListener('click', () => {
    if (selected === 3){
        const selectedItems = document.querySelectorAll('.selected')
        const name = prompt('Qual o seu nome?')
        const adress = prompt('Qual seu endereço?')
        const total = getTotal(selectedItems)

        orderSetup(selectedItems, name, adress, total)

        confirmOverlay.classList.add('visible')
        
        wppURL = `https://wa.me/5521999124291?text=${getMessage(selectedItems, name, adress, total)}`
    }
})

confirmBtn.addEventListener('click', () => {
    open(wppURL)
})

cancelBtn.addEventListener('click', () => {
    confirmOverlay.classList.remove('visible')
})
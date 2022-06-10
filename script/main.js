const itemContainers = document.querySelectorAll('.options')
const submitBtn = document.querySelector('.btn-submit')
let selected = 0


const removePreviousItem = (container) => {
    const containerItems = container.querySelectorAll('div')

    containerItems.forEach(item => {
        const isSelected = item.classList.contains('selected')

        if (isSelected){
            item.classList.remove('selected')
            selected -= 1
        }
    })

}

itemContainers.forEach(container => {
    const items = container.querySelectorAll('div')

    items.forEach(item => {
        item.addEventListener('click', (e) => {  
            const isSelected = item.classList.contains('selected')

            if (!isSelected){
                removePreviousItem(e.target.parentElement)
                item.classList.add('selected')
                selected += 1
            }

            if (selected === 3) {
                submitBtn.classList.add('ready')
            }
        })
    })
})


submitBtn.addEventListener('click', () => {
    if (selected === 3){
        const selectedItems = document.querySelectorAll('.selected')
        let orderTotal = 0
    
        selectedItems.forEach(item => {
            const price = Number((item.querySelector('strong').innerHTML).replace(',', '.'))
            orderTotal += price
        })
        
        let orderTemplate = `Olá, gostaria de fazer o pedido:
        - Prato: ${selectedItems[0].querySelector('h3').innerHTML}
        - Bebida: ${selectedItems[1].querySelector('h3').innerHTML}
        - Sobremesa: ${selectedItems[2].querySelector('h3').innerHTML}
        Total: R$ ${orderTotal.toFixed(2).toString().replace('.', ',')}`
    
        const wppURL = `https://wa.me/5521999124291?text=${orderTemplate}`
        open(wppURL)
    }
})
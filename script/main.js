const optionItems = document.querySelectorAll('.options > div')


const removePreviousItem = () => {
    optionItems.forEach(item => {
        if (item.classList.contains('selected')){
            item.classList.remove('selected')
        }
    })
}

optionItems.forEach(item => {
    item.addEventListener('click', () => {  
        removePreviousItem()
        item.classList.add('selected')
    })
})
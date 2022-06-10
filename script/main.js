const optionsContainers = document.querySelectorAll('.options')
const optionItems = document.querySelectorAll('.options > div')

optionItems.forEach(item => {
    item.addEventListener('click', () => {  
        optionItems.forEach(item => {
            if (item.classList.contains('selected')){
                item.classList.remove('selected')
            }
        })
        item.classList.add('selected')
    })
})
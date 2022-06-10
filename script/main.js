const itemContainers = document.querySelectorAll('.options')
const submitBtn = document.querySelector('.btn-submit')
let selectedItems = 0


const removePreviousItem = (container) => {
    const containerItems = container.querySelectorAll('div')

    containerItems.forEach(item => {
        const isSelected = item.classList.contains('selected')

        if (isSelected){
            item.classList.remove('selected')
            selectedItems -= 1
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
                selectedItems += 1
            }

            if (selectedItems === 3) {
                submitBtn.classList.add('ready')
            }
        })
    })
})


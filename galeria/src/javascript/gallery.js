function filter(e, cards, cardsData) {
    const target = $(e.target)
    const targetValue = target.text()
    const key = target.parents('dropdownButton').find('[name="dropdown-title"]').text()

    $('.card').removeClass('d-none')

    const filteredImages = cardsData.reduce((arr, cur, ind) => {
        return cur[key] && cur[key]!==targetValue ? [...arr, ind] : arr
    },[])

    filteredImages.forEach(index => $(cards[index]).addClass('d-none'))

    console.log(cards)
}

export function gallery({templates: {cardTemplate, dropdownButtonTemplate, dropdownOptionTemplate}, images}) {
    const gallery = $('#gallery')
    const filterGroup = $('#filter')

    images.forEach((img) => {
        const card = $(cardTemplate)
        const cardImg = card.find('img')
        Object.entries(img).forEach(([key, value]) => {
            cardImg[key === "data" ? "data" : "attr"](key, value)
        })
        gallery.append(card)
    })

    const cards = $.map($('.card'), card => card)
    const cardsData = cards.map(card => $(card).find('img').data().data)

    const filterOptions = cardsData.reduce((acc, data) => {
        return Object.entries(data).reduce((acc, [key, value])=>{
            if (acc[key]) {
                acc[key].some( x => x === value ) || acc[key].push(value)
            } else {
                acc[key] = [value]
            }
            return acc
        }, acc)
    },{})

    Object.entries(filterOptions).forEach(([title, options], i) => {
        const dropdown = $(dropdownButtonTemplate)

        dropdown.find('button').attr('id', `btnGroupDrop${i+1}`)
        dropdown.find('[name=dropdown-title]').html(title)
        dropdown.find('ul').attr('aria-labelledby', `btnGroupDrop${i+1}`)

        options.forEach(option => {
            const dropdownOption = $(dropdownOptionTemplate)
            dropdownOption.find('[name=dropdown-option]').html(option)
            dropdownOption.find('button').on('click', (e) => filter(e, cards, cardsData))
            dropdown.find('ul').append(dropdownOption)
        })

        filterGroup.append(dropdown)
    })
}
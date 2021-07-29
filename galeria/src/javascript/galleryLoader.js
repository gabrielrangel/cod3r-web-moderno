const images = [
    {src:'./img/img1.png'},
    {src:'./img/slide1.png'},
    {src:'./img/slide2.png'},
    {src:'./img/slide3.png'},
]

export async function galleryLoader({slots= {}, url="./pages/gallery.html"}) {
    const main = $('main')

    await $.ajax({url, success: (result) => main.html(result)})

    const headerTemplate = $('#template-album-header').html()
    const albumTemplate = $('#template-album').html()
    const cardTemplate = $('#template-card').html()

    main.append($(headerTemplate), $(albumTemplate))

    $('slot').each((_,e)=>{
        const slot = $(e)
        const name = slot.attr('name')
        slots[name] && slot.text(slots[name])
    })

    const album = $('#album')

    images.forEach((img) => {
        const card = $(cardTemplate)
        Object.entries(img).forEach(([key, value]) => {
            card.find('img').attr(key, value)
        })
        album.append(card)
    })
}
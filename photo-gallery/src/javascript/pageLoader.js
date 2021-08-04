import {camelCase} from 'lodash'

export async function pageLoader({slots = {}, url = "./html/gallery.html"}) {
    const main = $('main')

    await $.ajax({url, success: (result) => main.html(result)})

    const templates = $.map($('template'), (e) => e).reduce((acc, cur) => {
        const key = camelCase($(cur).attr('id'))
        acc[key] = $(cur).html()
        return acc
    }, {})

    Object.entries(templates).forEach(([tag, template]) => {
        $(tag.replace('Template','')).html(template)
    })

    $('slot').each((_, e) => {
        const slot = $(e)
        const name = slot.attr('name')
        slots[name] && slot.text(slots[name])
    })

    return templates
}
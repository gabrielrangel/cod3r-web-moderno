import { Tooltip, Toast, Popover } from 'bootstrap';

import './scss/global.scss'

const images = [
    {id: "a", src: './img/img1.png', data: {Cidade: 'New York'}},
    {id: "b", src: './img/slide1.png', data: {Cidade: "Rio de Janeiro"}},
    {id: "c", src: './img/slide2.png', data: {Cidade: "Fortaleza"}},
    {id: "d", src: './img/slide3.png', data: {Cidade: "Florianópolis"}},
]

import {pageLoader} from './javascript/pageLoader'
import {gallery} from "./javascript/gallery";

$(document).ready(async () => {
    const templates = await pageLoader({})
    gallery({templates, images})
})

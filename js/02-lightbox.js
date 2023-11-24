import { galleryItems } from './gallery-items.js';

const gallery = document.querySelector('.gallery');
const fragment = document.createDocumentFragment();

galleryItems.forEach(element => {
    const img = createImage(element);
    const a = createLink(element, img);
    const li = createListItem(a);
    fragment.appendChild(li);
});

gallery.appendChild(fragment);

function createImage(element) {
    const img = document.createElement('img');
    img.classList.add('gallery__image');
    img.src = element.preview;
    img.alt = element.description;
    img.title = element.description;
    return img;
}

function createLink(element, img) {
    const a = document.createElement('a');
    a.classList.add('gallery__link');
    a.href = element.original;
    a.appendChild(img);
    return a;
}

function createListItem(a) {
    const li = document.createElement('li');
    li.classList.add('gallery__item');
    li.appendChild(a);
    return li;
}

let lightbox = new SimpleLightbox('.gallery__item a', { captionDelay:250 });
//console.log(lightbox);

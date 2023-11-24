import { galleryItems } from './gallery-items.js';

const gallery = document.querySelector('.gallery');
const fragment = document.createDocumentFragment();
let instance; // Оголошуємо змінну за межами функцій

galleryItems.forEach(element => {
    const img = createImage(element);
    const a = createLink(element, img);
    const li = createListItem(a);
    fragment.appendChild(li);
});

gallery.appendChild(fragment);
gallery.addEventListener('click', handleGalleryClick);

function createImage(element) {
    const img = document.createElement('img');
    img.classList.add('gallery__image');
    img.src = element.preview;
    img.setAttribute(`data-${'source'}`, element.original);
    img.alt = element.description;
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

function handleGalleryClick(ev) {
    ev.preventDefault();
    if (ev.target.classList.contains('gallery__image')) {
        openModal(ev);
    }
}

function openModal(ev) {
    const img = ev.target;
    img.src = ev.target.dataset.source;
    img.id = 'modal';
    instance = basicLightbox.create(`
        <div class="modal">
            ${img.outerHTML}
        </div>
    `);

    instance.show();
    document.addEventListener('keydown', closeModalOnEscape);
    instance.element().addEventListener('click', closeModal);
}

function closeModalOnEscape(ev) {
    if (ev.code === 'Escape') {
        closeModal();
    }
}

function closeModal() {
    document.removeEventListener('keydown', closeModalOnEscape);
    instance.element().removeEventListener('click', closeModal);
    instance.close();
}

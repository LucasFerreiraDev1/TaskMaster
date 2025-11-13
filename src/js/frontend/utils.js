
export function modalNotify(textHeader, textBody, typeStyle) {

    if (document.querySelector('#modal')) {
        document.querySelector('#modal').remove();
    }

    let modal = document.createElement('div');
    modal.classList.add('modal');
    modal.id = 'modal';

    modal.innerHTML = `
        <header class="modal-header"></header>
        <div class="modal-content">
            <p class="modal-body">${textBody}</p>
        </div>
    `;

    document.body.appendChild(modal);

    setTimeout(() => {
        modal.style.right = '1%';
        modal.style.opacity = '1';
    }, 10);

    setTimeout(() => {
        modal.style.right = '-100%';
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.remove();
        }, 500);
    }, 3000);

    switch (typeStyle) {
        case 'success':
            modal.classList.add('success');
            document.querySelector('.modal-header').innerHTML = `<i class="fa-solid fa-check"></i> ${textHeader}`;
            break;
        case 'error':
            modal.classList.add('error');
            document.querySelector('.modal-header').innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${textHeader}`;
            break;
        default:
            modal.classList.add('success');
            document.querySelector('.modal-header').innerHTML = `<i class="fa-solid fa-check"></i> ${textHeader}`;
            break;
    }
    
}

export function loading(srcLoading, textLoading) {
    let loading = document.createElement('div');
    loading.id = 'loading';
    loading.classList.add('loading');
    loading.innerHTML = `
        <img src="${srcLoading}" alt="Carregando...">
        <p>${textLoading}</p>
    `;

    document.body.appendChild(loading);
}


export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
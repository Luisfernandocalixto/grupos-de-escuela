document.addEventListener('DOMContentLoaded', function () {
    const itemsGroup = document.querySelector('.sectionGroups');
    const items = itemsGroup.querySelectorAll('.mark-as-read');
    const localItems = Array.from(items).map(item => `<div class="mark-as-read text-uppercase">${item.innerHTML}</div>`).join('');

    localStorage.setItem('showGroups', JSON.stringify(localItems));

})



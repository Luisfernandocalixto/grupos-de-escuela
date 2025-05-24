document.addEventListener('DOMContentLoaded', function () {
    const item_groups = JSON.parse(localStorage.getItem('showGroups'));
    document.querySelector('.sectionGroups').innerHTML = item_groups;
})    



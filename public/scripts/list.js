function selectTab(evt) {
  let tab = document.getElementsByClassName('tabLink');
  for (let i = 0; i < tab.length; i++) {
    tab[i].className = tab[i].className.replace('active', '');
    console.log(tab[i].className);
  }
  evt.currentTarget.className += ' active';
}

export function initializeLegalDialogs() {
  document.querySelectorAll('dialog.legal-dialog').forEach(dialog => {
    const fragment = '#' + dialog.id;
    const trigger = document.querySelector(`a[href="${fragment}"]`);

    function openDialog() {
      if (!dialog.open) {
        dialog.showModal();
        dialog.scrollTop = 0;
      }
    }

    trigger.addEventListener('click', event => {
      event.preventDefault();
      openDialog();
    });
    dialog.addEventListener('close', () => {
      if (window.location.hash === fragment) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
      trigger.focus({ preventScroll: true });
    });
    function openLinkedDialog() {
      if (window.location.hash === fragment) openDialog();
    }
    window.addEventListener('hashchange', openLinkedDialog);
    openLinkedDialog();
  });
}

(() => {
  const state = { lastActive: null };

  window.openDialog = (id) => {
    const dlg = document.getElementById(id);
    if (!dlg || typeof dlg.showModal !== "function") return;

    // Guardar foco actual
    state.lastActive = document.activeElement;
    dlg.showModal();

    // Cerrar si clickea fuera
    const onClickBackdrop = (e) => {
      if (e.target === dlg) dlg.close();
    };
    dlg.addEventListener("click", onClickBackdrop);

    // Restaurar foco y limpiar
    dlg.addEventListener(
      "close",
      () => {
        dlg.removeEventListener("click", onClickBackdrop);
        if (state.lastActive && typeof state.lastActive.focus === "function") {
          state.lastActive.focus();
        }
      },
      { once: true }
    );
  };
})();
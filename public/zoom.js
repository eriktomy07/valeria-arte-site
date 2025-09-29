// public/zoom.js
(() => {
  const state = { lastActive: null };

  // Helper global llamado desde onclick en Astro
  window.openDialog = (id) => {
    const dlg = document.getElementById(id);
    if (!dlg || typeof dlg.showModal !== "function") return;

    // Guardar último foco
    state.lastActive = document.activeElement;

    dlg.showModal();

    // Cerrar al clickear fuera (backdrop)
    const onClickBackdrop = (e) => {
      if (e.target === dlg) dlg.close();
    };
    dlg.addEventListener("click", onClickBackdrop);

    // Restaurar foco y limpiar listeners al cerrar
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
// public/zoom.js
(() => {
  const state = { lastActive: null };

  // Helper global para abrir <dialog> desde atributos onclick (Astro)
  window.openDialog = (id) => {
    const dlg = document.getElementById(id);
    if (!dlg || typeof dlg.showModal !== "function") return;

    // Guardar foco actual para restaurar al cerrar
    state.lastActive = document.activeElement;

    dlg.showModal();

    // Cerrar si clickeás fuera del contenido (backdrop)
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
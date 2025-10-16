// Seleciona todos os botões de horário
document.addEventListener('DOMContentLoaded', () => {
    const initializeButtons = () => {
        const horarios = document.querySelectorAll('.horario');

        horarios.forEach(horario => {
            if (!horario.dataset.initialized) { 
                horario.dataset.initialized = true;
                horario.addEventListener('click', () => {
                    horario.classList.toggle('selecionado');
                });
            }
        });
    };

    initializeButtons(); 

    document.querySelectorAll('[data-bs-toggle="pill"]').forEach(tab => {
        tab.addEventListener('shown.bs.tab', () => {
            initializeButtons();
        });
    });
});

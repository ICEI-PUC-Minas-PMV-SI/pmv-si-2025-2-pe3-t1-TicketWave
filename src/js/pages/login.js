function renderLoginView(container) {
    container.innerHTML = `
        <div class="d-flex justify-content-center align-items-center" style="min-height: 80vh;">
            <div class="card shadow-sm" style="width: 100%; max-width: 420px;">
                <div class="card-body p-4">

                    <h3 id="login" class="text-center mb-4">Login</h3>

                    <form id="loginForm">
                        <div class="mb-3">
                            <label class="form-label">Usuário</label>
                            <input type="text" class="form-control" id="username" required>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Senha</label>
                            <input type="password" class="form-control" id="password" required>
                        </div>

                        <button class="btn btn-primary w-100" type="submit">
                            Entrar
                        </button>
                    </form>

                    <div class="text-center mt-3">
                        <p class="mb-1">Não tem conta?</p>
                        <button id="goRegister" class="btn btn-outline-primary w-100">
                            Registrar
                        </button>
                    </div>

                    <button id="backToHome" class="btn btn-outline-secondary w-100 mt-3">
                        Voltar ao site
                    </button>
                </div>
            </div>
        </div>
    `;

    document.getElementById("goRegister").addEventListener("click", () => {
        navigate("register");
    });

    document.getElementById("backToHome").addEventListener("click", () => {
        navigate("movies");
    });
}

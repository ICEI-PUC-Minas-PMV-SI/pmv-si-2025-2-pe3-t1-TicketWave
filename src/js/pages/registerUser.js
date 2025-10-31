const UserStore = {
    key: 'ticketwave_users_demo',
    getAll() {
        const raw = localStorage.getItem(this.key);
        return raw ? JSON.parse(raw) : [];
    },
    saveAll(users) {
        localStorage.setItem(this.key, JSON.stringify(users));
    },
    async register({ nome, email, senha }) {
        const users = this.getAll();
        if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
            throw new Error('Email já cadastrado');
        }
        const senhaHash = await Utils.hashPassword(senha);
        const user = {
            id: Date.now().toString(),
            nome,
            email,
            senhaHash
        };
        users.push(user);
        this.saveAll(users);
        return user;
    },
    findByEmail(email) {
        return this.getAll().find(u => u.email.toLowerCase() === email.toLowerCase());
    }
};

function renderRegisterUser(container) {
    container.innerHTML = `
        <div class="card mx-auto" style="max-width:480px;">
            <div class="card-body">
                <h3 class="card-title text-center mb-3">Criar conta</h3>
                <form id="register-form">
                    <div class="mb-2">
                        <label class="form-label">Nome</label>
                        <input name="nome" class="form-control" required />
                    </div>
                    <div class="mb-2">
                        <label class="form-label">Email</label>
                        <input name="email" type="email" class="form-control" required />
                    </div>
                    <div class="mb-2">
                        <label class="form-label">Senha</label>
                        <input name="senha" type="password" class="form-control" minlength="6" required />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Confirmar senha</label>
                        <input name="senha2" type="password" class="form-control" required />
                    </div>
                    <div class="d-grid">
                        <button class="btn btn-primary" type="submit">Registrar</button>
                    </div>
                </form>
                <div id="register-feedback" class="mt-2 text-center text-danger"></div>
            </div>
        </div>
    `;

    const form = container.querySelector('#register-form');
    const feedback = container.querySelector('#register-feedback');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        feedback.textContent = '';

        const formData = new FormData(form);
        const nome = (formData.get('nome') || '').trim();
        const email = (formData.get('email') || '').trim();
        const senha = formData.get('senha');
        const senha2 = formData.get('senha2');

        if (!nome || !email || !senha) {
            feedback.textContent = 'Preencha todos os campos.';
            return;
        }
        if (senha.length < 6) {
            feedback.textContent = 'A senha precisa ter ao menos 6 caracteres.';
            return;
        }
        if (senha !== senha2) {
            feedback.textContent = 'As senhas não coincidem.';
            return;
        }

        try {
            await DataLoader.registerUser({ nome, email, senha });
            if (typeof window.navigate === 'function') {
                window.navigate('login', { message: 'Conta criada com sucesso. Faça login.' });
            } else {
                feedback.style.color = 'green';
                feedback.textContent = 'Conta criada com sucesso. Vá para a tela de login.';
            }
        } catch (err) {
            feedback.textContent = err.message || 'Erro ao registrar.';
        }
    });
}

window.renderRegisterUser = renderRegisterUser;
window.UserStoreDemo = UserStore;

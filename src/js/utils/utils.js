const Utils = ( function () {

    async function hashPassword(password) {
        const enc = new TextEncoder();
        const data = enc.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    function addNavbarListeners() {
        const navbarTrendingLink = document.querySelector('#navbar-trending');
        navbarTrendingLink.addEventListener('click', (e) => {
            e.preventDefault();

            document.querySelector('#trending-header').scrollIntoView({ behavior: 'smooth' });
        });

        const navbarOnDisplayLink = document.querySelector('#navbar-on-display');
        navbarOnDisplayLink.addEventListener('click', (e) => {
            e.preventDefault();

            document.querySelector('#on-display-header').scrollIntoView({ behavior: 'smooth' });
        });
    }

        return {
        hashPassword,
        addNavbarListeners,
    };
})();    
    

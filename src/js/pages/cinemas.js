function renderCinemasView(container) {
    container.innerHTML = `
        <main>
        <div class="cinemas-grid container mt-4">
            <div class="cinema">
            <h3 id="cinema1">Partage Shopping Betim</h3>
            <p class="nome-cinema">Cinemark</p>
            <p>Endereço: Rod. Fernão Dias, 601 - Km 492 - São João, Betim - MG, 32655-505</p>
            <p>Como chegar?</p>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3750.093841199131!2d-44.1600527!3d-19.962555400000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa6c1704c7243d1%3A0x52973feb0084db59!2sCinemark%20Partage%20Betim!5e0!3m2!1spt-BR!2sbr!4v1763764968582!5m2!1spt-BR!2sbr" 
                width="200" 
                height="150" 
                style="border:0;" 
                allowfullscreen="" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade">
                </iframe>   
            </div>
            <div class="cinema">
            <h3 id="cinema2">BH Shopping</h3>
            <p class="nome-cinema">Cinemark</p>
            <p>Endereço: BR-356, 3049 - Loja 047 - Belvedere, Belo Horizonte - MG, 30320-900</p>
            <p>Como chegar?</p>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.8192423410496!2d-43.94390229999999!3d-19.9741026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa697f81f30cba7%3A0x571aabd2e6199498!2sCinema%20Cinemark!5e0!3m2!1spt-BR!2sbr!4v1763765268799!5m2!1spt-BR!2sbr" 
                width="200" 
                height="150" 
                style="border:0;" 
                allowfullscreen="" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade">
            </iframe>  
            </div>
            <div class="cinema">
            <h3 id="cinema3">Diamond Mall</h3>
            <p class="nome-cinema">Cinemark</p>
            <p>Endereço: Av. Olegário Maciel, 1600 - Santo Agostinho, Belo Horizonte - MG, 30180-111</p>
            <p>Como chegar?</p>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3750.9200371319657!2d-43.947240400000005!3d-19.927774199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa697bf8f38ebbd%3A0x220d9762a9e946d7!2sCinema%20Cinemark!5e0!3m2!1spt-BR!2sbr!4v1763765488651!5m2!1spt-BR!2sbr" 
                width="200" 
                height="150"
                style="border:0;" 
                allowfullscreen="" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade">
                </iframe> 
            </div>
            <div class="cinema">
            <h3 id="cinema4">ItaúPower Shopping</h3>
            <p class="nome-cinema">Cineart</p>
            <p>Endereço: F2, Av. General David Sarnoff, 5160 - 2º Andar - Cidade Industrial, Contagem - MG, 32210-110</p>
            <p>Como chegar?</p>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3750.476724752143!2d-44.02092969999999!3d-19.946444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa695e373272655%3A0x507b2b3ad76f6725!2sCineart%20-%20Ita%C3%BAPower%20Shopping!5e0!3m2!1spt-BR!2sbr!4v1763765683726!5m2!1spt-BR!2sbr" 
                width="200" 
                height="150"
                style="border:0;" 
                allowfullscreen="" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade">
                </iframe>  
            </div>
        </div>
        </main> `;
}

document.getElementById("navbar-cinemas").addEventListener("click", (e) => {
    e.preventDefault();
    navigate("cinemas");
});

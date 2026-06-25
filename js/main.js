/* =========================
   VARIÁVEIS GLOBAIS
========================= */

let current = "";
let currentPlans = [];
let currentInfo = [];

const heroImages = [
    "/assets/hero1.png",
    "/assets/hero2.png",
    "/assets/hero3.png"
];

let heroIndex = 0;


/* =========================
   DADOS VIP
========================= */

const vipImages = {
    "VIP": "vip_tag.png",
    "ULTRA": "ultra_tag.png",
    "SUPREMO": "supremo_tag.png",
    "LENDARIO": "lendario_tag.png",
    "EURION": "eurion_tag.png"
};

const vipData = {
    VIP: {
        plans: [
            { name: "7 Dias", price: "2.00", url: "https://eurionmc.craftingstore.net/package/1559540" },
            { name: "30 Dias", price: "4.90", url: "https://eurionmc.craftingstore.net/package/1559543" },
            { name: "90 Dias", price: "11.90", url: "https://eurionmc.craftingstore.net/package/1559546" },
            { name: "Permanente", price: "13.90", url: "https://eurionmc.craftingstore.net/package/1560996" }
        ],
        info: ["Kit inicial", "Acesso ao /warp vip", "Tag exclusiva", "Bônus de economia"]
    },

    ULTRA: {
        plans: [
            { name: "7 Dias", price: "3.50", url: "https://eurionmc.craftingstore.net/package/1559549" },
            { name: "30 Dias", price: "8.90", url: "https://eurionmc.craftingstore.net/package/1559552" },
            { name: "90 Dias", price: "19.90", url: "https://eurionmc.craftingstore.net/package/1559555" },
            { name: "Permanente", price: "24.90", url: "https://eurionmc.craftingstore.net/package/1561002" }
        ],
        info: ["Todos benefícios do VIP", "Kit melhorado", "Fly em áreas específicas", "Comandos extras"]
    },

    SUPREMO: {
        plans: [
            { name: "7 Dias", price: "5.90", url: "https://eurionmc.craftingstore.net/package/1559558" },
            { name: "30 Dias", price: "13.90", url: "https://eurionmc.craftingstore.net/package/1559561" },
            { name: "90 Dias", price: "29.90", url: "https://eurionmc.craftingstore.net/package/1561008" },
            { name: "Permanente", price: "37.90", url: "https://eurionmc.craftingstore.net/package/1559564" }
        ],
        info: ["Todos benefícios ULTRA", "Kit avançado", "Eventos exclusivos", "Mais dinheiro inicial"]
    },

    LENDARIO: {
        plans: [
            { name: "7 Dias", price: "8.90", url: "https://eurionmc.craftingstore.net/package/1559567" },
            { name: "30 Dias", price: "19.90", url: "https://eurionmc.craftingstore.net/package/1559570" },
            { name: "90 Dias", price: "44.90", url: "https://eurionmc.craftingstore.net/package/1559573" },
            { name: "Permanente", price: "54.90", url: "https://eurionmc.craftingstore.net/package/1561005" }
        ],
        info: ["Todos benefícios SUPREMO", "Fly no spawn", "Kit lendário", "Prioridade em filas"]
    },

    EURION: {
        plans: [
            { name: "7 Dias", price: "13.90", url: "https://eurionmc.craftingstore.net/package/1559576" },
            { name: "30 Dias", price: "34.90", url: "https://eurionmc.craftingstore.net/package/1559579" },
            { name: "90 Dias", price: "74.90", url: "https://eurionmc.craftingstore.net/package/1559582" },
            { name: "Permanente", price: "89.90", url: "https://eurionmc.craftingstore.net/package/1561014" }
        ],
        info: ["VIP máximo", "Todos comandos", "Kit completo", "Tag especial"]
    }
};

/* =========================
   SISTEMA DE COMPRA DE ECOINS
========================= */
function buyCoins(quantidade) {
    // Mapeia a quantidade de moedas clicada para o respectivo link da CraftingStore
    let url = "";

    switch(quantidade) {
        case 100:
            url = "https://eurionmc.craftingstore.net/package/1561459";
            break;
        case 350:
            url = "https://eurionmc.craftingstore.net/package/1561465"; // coloque o link do pacote de R$ 9,99
            break;
        case 900:
            url = "CONTEUDO_DA_SUA_URL_AQUI"; // coloque o link do pacote de R$ 22,90
            break;
        case 2500:
            url = "CONTEUDO_DA_SUA_URL_AQUI"; // coloque o link do pacote de R$ 49,90
            break;
        case 6500:
            url = "CONTEUDO_DA_SUA_URL_AQUI"; // coloque o link do pacote de R$ 109,90
            break;
        default:
            return;
    }

    if (url !== "" && url !== "CONTEUDO_DA_SUA_URL_AQUI") {
        window.open(url, '_blank'); // Abre a página de pagamento em uma nova aba
    } else {
        alert("Este pacote de ECoin ainda está sendo configurado na loja!");
    }
}

/* =========================
   MODAL VIP
========================= */

function openModal(vip){
    const modal = document.getElementById("modal");
    const nameEl = document.getElementById("vipName");
    const iconEl = document.getElementById("vipIcon");

    if (!vipData[vip]) return; // segurança

    modal.style.display = "flex";

    nameEl.textContent = vip;
    iconEl.src = "/assets/" + vipImages[vip];

    const data = vipData[vip];
    currentPlans = data.plans;
    currentInfo = data.info;

    renderPlans();

    const infoBox = document.getElementById("info");
    infoBox.innerHTML = "";
    infoBox.classList.add("hidden");

    current = "";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function renderPlans() {
    const container = document.getElementById("plans");
    container.innerHTML = "";

    currentPlans.forEach(plan => {
        const div = document.createElement("div");
        div.className = "plan";
        div.textContent = `${plan.name} - R$ ${plan.price}`;

        div.onclick = () => {
            document.querySelectorAll(".plan")
                .forEach(p => p.classList.remove("active"));

            div.classList.add("active");
            current = plan.url;
        };

        container.appendChild(div);
    });
}

function toggleInfo() {
    const infoBox = document.getElementById("info");

    if (!infoBox.innerHTML.trim()) {
        renderInfo();
    }

    infoBox.classList.toggle("hidden");
}

function renderInfo() {
    const infoBox = document.getElementById("info");

    infoBox.innerHTML = `
        <ul>
            ${currentInfo.map(i => `<li>${i}</li>`).join("")}
        </ul>
    `;
}


/* =========================
   HERO / GALERIA
========================= */

function openPreview(index) {
    const modal = document.getElementById("imgModal");
    const img = document.getElementById("modalImg");

    heroIndex = index;
    img.src = heroImages[heroIndex];

    modal.style.display = "flex";
}

function closePreview() {
    document.getElementById("imgModal").style.display = "none";
}

function nextImg() {
    heroIndex = (heroIndex + 1) % heroImages.length;
    document.getElementById("modalImg").src = heroImages[heroIndex];
}

function prevImg() {
    heroIndex = (heroIndex - 1 + heroImages.length) % heroImages.length;
    document.getElementById("modalImg").src = heroImages[heroIndex];
}


/* =========================
   HERO / DRAG + SWIPE
========================= */

const slider = document.querySelector(".hero-side");

if (slider) {

    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener("mousedown", (e) => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("mouseleave", () => isDown = false);
    slider.addEventListener("mouseup", () => isDown = false);

    slider.addEventListener("mousemove", (e) => {
        if (!isDown) return;

        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;

        slider.scrollLeft = scrollLeft - walk;
    });

    let touchStart = 0;
    let touchScroll = 0;

    slider.addEventListener("touchstart", (e) => {
        touchStart = e.touches[0].pageX;
        touchScroll = slider.scrollLeft;
    });

    slider.addEventListener("touchmove", (e) => {
        const x = e.touches[0].pageX;
        const walk = (x - touchStart) * 2;

        slider.scrollLeft = touchScroll - walk;
    });
}


/* =========================
   MENU MOBILE
========================= */

function toggleMenu() {
    const nav = document.getElementById("nav");
    const btn = document.querySelector(".menu-toggle");

    nav.classList.toggle("active");
    btn.textContent = nav.classList.contains("active") ? "✕" : "☰";
}


/* =========================
   EVENTOS (FINAL)
========================= */

const buyBtn = document.getElementById("buy");

if (buyBtn) {
    buyBtn.onclick = () => {
        if (current) {
            window.location.href = current;
        }
    };
}

/* =========================
   SUPORTE INFO TOGGLE
========================= */

function toggleSupportInfo(){
    const info = document.getElementById("supportInfo");

    if (!info) return;

    info.classList.toggle("hidden");
}

/* =========================
   SUPPORT MODAL
========================= */

function openSupport(){
    document.getElementById("supportModal").style.display = "flex";
}

function closeSupport(){
    document.getElementById("supportModal").style.display = "none";
}

/* fechar clicando fora */
document.addEventListener("click", function(e){
    const modal = document.getElementById("supportModal");

    if (e.target === modal){
        modal.style.display = "none";
    }
});
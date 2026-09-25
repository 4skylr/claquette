const STOCK = {
  warehouses: [
    { nameAr: "المستودع الصغير", qty: 7361.35, gross: 9322.4 },
    { nameAr: "نقطة التعبئة", qty: 1470, gross: 1635.13 },
    { nameAr: "المستودع الرئيسي", qty: 60052.78, gross: 33302.97 }
  ],
  grand: { qty: 68884.13, gross: 44260.5 },
  lines: [
    { name: "130 Oz TUB", nameAr: "دلو فشار 130", mini: 60, refuel: 14, stores: 500 },
    { name: "46 Oz TUB", nameAr: "دلو فشار 46", mini: 180, refuel: 3, stores: 4925 },
    { name: "64 Oz TUB", nameAr: "دلو فشار 64", mini: 51, refuel: 16, stores: 600 },
    { name: "85 Oz TUB", nameAr: "دلو فشار 85", mini: 38, refuel: 14, stores: 1300 },
    { name: "Arwa - 500 ML", nameAr: "أروى 500 مل", mini: 21, refuel: 50, stores: 528 },
    { name: "BARBICAN CAN", nameAr: "باربيكان علبة", mini: 0, refuel: 19, stores: 30 },
    { name: "RANI CAN", nameAr: "راني علبة", mini: 0, refuel: 32, stores: 64 },
    { name: "MONSTER CAN", nameAr: "مونستر", mini: 0, refuel: 22, stores: 0 },
    { name: "M&M CHOCO 150 GM", nameAr: "إم آند إم شوكو 150", mini: 10, refuel: 9, stores: 45 },
    { name: "SLUSH - Glass 12 Oz", nameAr: "كأس سلاش 12", mini: 25, refuel: 17, stores: 5600 },
    { name: "HOT DOG - Tray", nameAr: "صينية هوت دوج", mini: 10, refuel: 10, stores: 3075 }
  ]
};
const money = (n) => Number(n).toLocaleString("ar-SA", { maximumFractionDigits: 2 }) + " ر.س";
const qty = (n) => Number(n).toLocaleString("ar-SA", { maximumFractionDigits: 2 });
function home() {
  return `<article class="hero"><span class="pill">شباك مفتوح</span><div class="welcome">مرحباً بكم في نوار</div><p class="note">Noir Cinema — العثيم مول عنيزة</p></article><div class="grid kpis" style="margin-top:16px">${STOCK.warehouses.map(w => `<article class="card ticket"><h3>${w.nameAr}</h3><div class="num">${money(w.gross)}</div><p class="note">الكمية: ${qty(w.qty)}</p></article>`).join("")}<article class="card ticket"><h3>إجمالي المخزون</h3><div class="num">${money(STOCK.grand.gross)}</div><p class="note">الثلاثة مستودعات</p></article></div>`;
}
function cash() { return `<article class="card"><h3>رصيد الصندوق النثري</h3><div class="num">بانتظار جرد الصندوق</div></article>`; }
function stock() {
  const rows = STOCK.lines.map(l => `<tr><td>${l.nameAr}</td><td>${qty(l.mini)}</td><td>${qty(l.refuel)}</td><td>${qty(l.stores)}</td><td>${qty(l.mini+l.refuel+l.stores)}</td></tr>`).join("");
  return `<article class="card"><table><thead><tr><th>الصنف</th><th>Mini</th><th>Refuel</th><th>STORES</th><th>المجموع</th></tr></thead><tbody>${rows}</tbody></table></article>`;
}
function sales() { return `<article class="card"><h3>شاشة البيع</h3><p class="note">تفتح بعد أسعار البيع.</p></article>`; }
function products() {
  const rows = STOCK.lines.map(l => `<tr><td>${l.nameAr}</td><td>${l.name}</td></tr>`).join("");
  return `<article class="card"><table><thead><tr><th>عربي</th><th>النظام</th></tr></thead><tbody>${rows}</tbody></table></article>`;
}
const titles = { home: "لوحة التحكم", cash: "الصندوق", stock: "الجرد", sales: "المبيعات", products: "الأصناف" };
const renderers = { home, cash, stock, sales, products };
function show(view) {
  document.querySelectorAll(".view").forEach(el => el.classList.add("hidden"));
  const node = document.getElementById("view-" + view);
  node.classList.remove("hidden");
  node.innerHTML = renderers[view]();
  document.getElementById("title").textContent = titles[view];
  document.querySelectorAll("nav button").forEach(b => b.classList.toggle("active", b.dataset.view === view));
}
document.querySelectorAll("nav button").forEach(b => b.addEventListener("click", () => show(b.dataset.view)));
show("home");

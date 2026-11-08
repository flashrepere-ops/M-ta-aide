// CONFIG - BAC REUSSITE INTERNATIONAL
const CONFIG = {
  // Ton WhatsApp - c'est ton Yas qui reçoit les messages
  whatsapp: "+22872230580",

  // Tes 2 numéros pour recevoir l'argent
  yasMoney: "+22872230580",   // Yas : 72 23 05 80
  moovMoney: "+22899288161",  // Moov : 99 28 81 61

  // CinetPay / FedaPay - à remplir plus tard
  cinetpayApiKey: "",
  fedapayApiKey: "",

  premiumPriceFCFA: 500,
  appName: "BAC REUSSITE INTERNATIONAL"
};

function payerWhatsApp() {
  let msg = "Bonjour, je veux le Premium BAC REUSSITE - 500 F CFA. Voici ma capture de paiement.";
  window.open("https://wa.me/22872230580?text=" + encodeURIComponent(msg));
}

function payerYas() {
  alert("Envoie 500 F CFA sur Yas Money : +228 72 23 05 80\n\nEnsuite envoie ta capture sur WhatsApp au +228 72 23 05 80.");
  payerWhatsApp();
}

function payerMoov() {
  alert("Envoie 500 F CFA sur Moov Money : +228 99 28 81 61\n\nEnsuite envoie ta capture sur WhatsApp au +228 72 23 05 80.");
  payerWhatsApp();
}
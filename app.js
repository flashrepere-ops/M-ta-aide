// BAC REUSSITE INTERNATIONAL - APP.JS
// Compte à rebours AUTOMATIQUE + Devises + Opérateurs + Premium

let state = {
  country: 'Togo',
  serie: 'D',
  premium: false,
  operateur: 'Yas Money'
};

// ===== DEVISES + OPERATEURS PAR PAYS =====
const DATA = {
  'Togo': { curr:'F CFA', code:'XOF', flag:'🇹🇬', premium:500, bal:7000, ops:['Yas Money','Moov Money Togo'], examDate:'2027-06-15', exam:'BAC' },
  'Bénin': { curr:'F CFA', code:'XOF', flag:'🇧🇯', premium:500, bal:7000, ops:['MTN MoMo Bénin','Moov Money Bénin','Celtiis Cash'], examDate:'2027-06-22', exam:'BAC' },
  'Sénégal': { curr:'F CFA', code:'XOF', flag:'🇸🇳', premium:500, bal:7000, ops:['Orange Money','Wave','Free Money'], examDate:'2027-07-06', exam:'BAC' },
  "Côte d'Ivoire": { curr:'F CFA', code:'XOF', flag:'🇨🇮', premium:500, bal:7000, ops:['Orange Money','MTN MoMo','Moov Money','Wave'], examDate:'2027-06-28', exam:'BAC' },
  'Ghana': { curr:'GH₵', code:'GHS', flag:'🇬🇭', premium:13, bal:115, ops:['MTN MoMo Ghana','AirtelTigo Money','Telecel Cash'], examDate:'2027-05-12', exam:'WASSCE' },
  'Nigeria': { curr:'₦', code:'NGN', flag:'🇳🇬', premium:1250, bal:17500, ops:['OPay','PalmPay','MTN MoMo Nigeria'], examDate:'2027-05-17', exam:'WASSCE' },
  'Cameroun': { curr:'F CFA', code:'XAF', flag:'🇨🇲', premium:500, bal:7000, ops:['MTN MoMo','Orange Money'], examDate:'2027-06-14', exam:'BAC' },
  'Mali': { curr:'F CFA', code:'XOF', flag:'🇲🇱', premium:500, bal:7000, ops:['Orange Money','Moov Money'], examDate:'2027-06-21', exam:'BAC' },
  'Niger': { curr:'F CFA', code:'XOF', flag:'🇳🇪', premium:500, bal:7000, ops:['Airtel Money','Moov Money','Orange Money'], examDate:'2027-06-24', exam:'BAC' },
  'Burkina Faso': { curr:'F CFA', code:'XOF', flag:'🇧🇫', premium:500, bal:7000, ops:['Orange Money','Moov Money'], examDate:'2027-06-20', exam:'BAC' },
  'Guinée': { curr:'FG', code:'GNF', flag:'🇬🇳', premium:7500, bal:105000, ops:['Orange Money','MTN MoMo Guinée'], examDate:'2027-06-25', exam:'BAC' }
};

// ===== COMPTE À REBOURS AUTOMATIQUE =====
// Il calcule tout seul : Date examen - Aujourd'hui
// Si la date est passée, il passe à l'année prochaine tout seul
function daysLeft(){
  let d = new Date(DATA[state.country].examDate);
  let t = new Date(); t.setHours(0,0,0,0);
  let diff = Math.ceil((d - t) / 86400000);
  if(diff < 0){
    d.setFullYear(d.getFullYear() + 1);
    diff = Math.ceil((d - t) / 86400000);
  }
  return diff;
}

// ===== CHANGER DE PAYS =====
// Quand tu changes de pays, tout change : devise + opérateurs + compte à rebours
function setPays(p){
  state.country = p;
  state.operateur = DATA[p].ops[0]; // Reset : 1er opérateur du nouveau pays, pas de Yas qui reste bloqué
  updateWallet();
  show('home');
}

function updateWallet(){
  let c = DATA[state.country];
  document.getElementById('walletTop').textContent = c.bal.toLocaleString('fr-FR') + ' ' + c.curr;
  document.getElementById('currTop').textContent = c.flag + ' ' + c.code;
}

// ===== PREMIUM =====
// Par défaut : premium = false -> tout est verrouillé 🔒
// Après achat : premium = true -> tout se débloque
function buyPremium(){
  state.premium = true;
  alert('🎉🎁 DÉBLOQUÉ ✅ Premium activé !');
  show('home');
}

function recharger(){
  let c = DATA[state.country];
  let m = document.getElementById('mont').value;
  alert('Recharge ' + m + ' ' + c.curr + ' via ' + state.operateur + ' - ' + state.country + '\n\nEN VRAI : brancher CinetPay / FedaPay ici.\nPour l instant : envoie par ' + state.operateur + ' et envoie capture 【entity-WhatsApp¦canonical_name=WhatsApp】.');
}

// ===== QUIZ =====
function startQuiz(){
  let qs = [
    {q:'lim 1/x en +∞ = ?', a:['0','1','+∞'], r:0},
    {q:'E(X) pour B(5;0.5) = ?', a:['2.5','5','0.5'], r:0},
    {q:"(uv)' = ?", a:["u'v+uv'","u'v'","u+v"], r:0},
    {q:'u0=2, r=3, u5 = ?', a:['17','14','20'], r:0},
    {q:'pH neutre = ?', a:['7','0','14'], r:0},
    {q:'CEDEAO créée en ?', a:['1975 à Lagos','1960','1980'], r:0},
    {q:'Indépendance Togo ?', a:['27 avril 1960','27 avril 1958','1er juin 1960'], r:0},
    {q:'Âge pour voter au Togo ?', a:['18 ans','21 ans','16 ans'], r:0},
    {q:'U = ?', a:['R×I','R/I','I/R'], r:0},
    {q:'Devise Togo ?', a:['Travail - Liberté - Patrie','Unité - Travail - Progrès','Paix - Travail - Patrie'], r:0}
  ];
  let h = '';
  qs.forEach((x,i)=>{
    h += `<div class="fiche"><p class="q">Question ${i+1} / 10 - ${x.q}</p>` + x.a.map((o,j)=>`<label><input type="radio" name="q${i}" value="${j}"> ${o}</label><br>`).join('') + `</div>`;
  });
  h += `<button class="btn-gold" onclick="corrQuiz()">Voir mon score</button><div id="score"></div>`;
  document.getElementById('quizBox').innerHTML = h;
}

function corrQuiz(){
  let ans = [0,0,0,0,0,0,0,0,0,0];
  let s = 0;
  ans.forEach((a,i)=>{
    let v = document.querySelector(`input[name="q${i}"]:checked`);
    if(v && parseInt(v.value)===a) s++;
  });
  document.getElementById('score').innerHTML = `<h2>Score: ${s}/10 ${s>=6?'🎉 Bravo !':'💪 Continue !'}</h2><button class="btn-dark" onclick="startQuiz()">Recommencer - Nouvel ordre</button>`;
}
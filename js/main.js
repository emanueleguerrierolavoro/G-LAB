(function(){
  // Indirizzo dell'App web di Google Apps Script (vedi Codice-contatti.gs).
  // Finché è vuoto, il modulo apre WhatsApp con il messaggio già scritto.
  var CONTATTI_URL = '';
  var WA = 'https://wa.me/393662082667';

  var mb=document.querySelector('.mb'),menu=document.getElementById('menu');
  if(mb&&menu){
    mb.addEventListener('click',function(){var on=menu.classList.toggle('on');mb.setAttribute('aria-expanded',on)});
    menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){menu.classList.remove('on');mb.setAttribute('aria-expanded','false')})});
  }
  var f=document.getElementById('prev');
  if(!f) return;
  var $=function(id){return document.getElementById(id)};
  var v=function(id){return $(id).value.trim()};
  var err=function(m){var e=$('fErr');e.textContent=m;e.style.display=m?'block':'none'};
  f.addEventListener('submit',function(e){
    e.preventDefault(); err('');
    if(v('fNome').length<2){err('Scrivi il tuo nome.');$('fNome').focus();return}
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v('fEmail'))){err('Controlla l’indirizzo email.');$('fEmail').focus();return}
    if(!$('fOk').checked){err('Serve il consenso per poterti ricontattare.');return}
    var dati={action:'contatto',nome:v('fNome'),azienda:v('fAz'),email:v('fEmail'),telefono:v('fTel'),tipo:v('fTipo'),messaggio:v('fMsg'),consenso:true,sito:v('fSito')};
    if(!CONTATTI_URL){
      var t=['Buongiorno, vorrei un preventivo.','Nome: '+dati.nome,dati.azienda&&'Azienda: '+dati.azienda,'Email: '+dati.email,dati.telefono&&'Telefono: '+dati.telefono,'Interessato a: '+dati.tipo,dati.messaggio].filter(Boolean).join('\n');
      window.open(WA+'?text='+encodeURIComponent(t),'_blank');return;
    }
    var b=$('fInvia');b.disabled=true;b.textContent='Invio in corso…';
    fetch(CONTATTI_URL,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(dati)})
      .then(function(r){return r.json()})
      .then(function(r){
        if(r&&r.ok){f.querySelectorAll('input,select,textarea,button').forEach(function(x){x.disabled=true});$('fOkMsg').style.display='block';b.textContent='Richiesta inviata'}
        else{err((r&&r.messaggio)||'Qualcosa non ha funzionato. Riprova o scrivici su WhatsApp.');b.disabled=false;b.textContent='Invia richiesta'}
      })
      .catch(function(){err('Connessione non riuscita. Riprova o scrivici su WhatsApp.');b.disabled=false;b.textContent='Invia richiesta'});
  });
})();

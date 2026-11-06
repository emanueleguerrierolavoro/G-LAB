(function(){
  var mb=document.querySelector('.mb'),menu=document.getElementById('menu');
  if(mb&&menu){
    mb.addEventListener('click',function(){var on=menu.classList.toggle('on');mb.setAttribute('aria-expanded',on)});
    menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){menu.classList.remove('on');mb.setAttribute('aria-expanded','false')})});
  }
  var f=document.getElementById('prev');
  if(f){f.addEventListener('submit',function(e){
    e.preventDefault();
    var v=function(id){return document.getElementById(id).value.trim()};
    if(!v('fNome')){document.getElementById('fNome').focus();return}
    var t=['Buongiorno G-Lab Informatica, vorrei un preventivo.','Nome: '+v('fNome'),v('fAz')&&'Azienda: '+v('fAz'),v('fTel')&&'Telefono: '+v('fTel'),'Interessato a: '+v('fTipo'),v('fMsg')].filter(Boolean).join('\n');
    window.open('https://wa.me/393662082667?text='+encodeURIComponent(t),'_blank');
  })}
})();

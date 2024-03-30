function getPilihancomputer(){
    const comp = Math.random();

    if( comp < 0.32) return  'semut';
    if (comp >= 0.32 && comp < 0.72)return'orang';
    return 'gajah';
    
}

function getHasil(comp, player){
   
    if(comp==player) return 'Seri';
    if (player=='semut') return  (comp == 'gajah') ? 'menang' : 'kalah';
    if(player=='orang')  return (comp == 'gajah') ? 'kalah'  : 'menang';
    if(player=='gajah') return (comp == 'orang') ? 'menang': 'kalah';
}

// const gajah = document.querySelector('.gajah');

// gajah.addEventListener('click',function(){

//     const pilihankomputer = getPilihancomputer();
//     const pilihanplayer = gajah.className;
//     const hasil = getHasil(pilihankomputer,pilihanplayer);
    
//     const imgcomp = document.querySelector('.img-komputer');

//     imgcomp.setAttribute('src','img/'+pilihankomputer+'.png');

//     const info = document.querySelector('.info');

//     info.innerHTML = hasil;

// });

// const orang = document.querySelector('.orang');

// orang.addEventListener('click', function (){

//     const pilihankomputer = getPilihancomputer();
//     const pilihanplayer = orang.className;
//     const hasil = getHasil(pilihankomputer,pilihanplayer);

//     const imgcomp = document.querySelector('.img-komputer');
//     imgcomp.setAttribute('src','img/'+pilihankomputer+'.png');

//     const info = document.querySelector('.info');
//     info.innerHTML=hasil;

// });

const pilihan = document.querySelectorAll('li img');

pilihan.forEach(function(e){

    e.addEventListener('click',function(){
        const pilihankomputer = getPilihancomputer();
        const pilihanplayer = e.className;
        const hasil = getHasil(pilihankomputer,pilihanplayer);

        const imgcomp =document.querySelector('.img-komputer');

        imgcomp.setAttribute('src','img/'+pilihankomputer+'.png');
        
        const info = document.querySelector('.info');
        info.innerHTML = hasil;
    });
});
var jackport = new FontFace('jackport', 'url(fonts/StraightVarsity.otf)');

jackport.load().then(function(font) {
    document.fonts.add(font);
});

function generarcanvas()
{
    // Obtenemos datos básicos
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Ponemos imagen inicial
    let img = document.getElementById('primera');
    ctx.drawImage(img, 0 ,0);

    // Obtenemos quienes juegan para calcular tamaño de letra
    let nombres = document.querySelectorAll('input[name="jugadores"]:checked');

    // Mejor instanciar aqui por si le damos varias veces al botocín
    let increment = 110;
    let fuente = 100;

    // Si tenemos +10 nombres hay que reducir tamaño de letra y espaciado...
    let resto = nombres.length-10;
    if(resto>0)
    {
        // Ajustamos peruanamente...
        if(resto<4) resto*=8;
        else if(resto<6) resto*=7;
        else resto*=6;

        fuente -= resto;
        increment -= resto;
    }

    // Preparamos para escribir
    ctx.font = fuente+'px jackport';
    ctx.strokeStyle = '#1749b3';
    ctx.fillStyle = 'white';
    ctx.lineWidth = '3';

    // Escribimos
    let start = 800;
    for(var i=0; nombres[i]; ++i){
        let nomid = nombres[i].value;
        let nombre = document.querySelector('label[for="'+nomid+'"]').textContent;
        ctx.fillText(nombre,150,start);
        ctx.strokeText(nombre,150,start);
        start+=increment;
    }

    canvas.style.border = "1px solid black";
    canvas.style.display = "block";
}
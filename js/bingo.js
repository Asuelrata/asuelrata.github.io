function generardivs()
{
    let bingo =  document.getElementById('selectorbingo');
    let cookies = document.cookie;
    for(let y=1;y<=6;y++) {
        for(let x=1;x<=6;x++) {
            let div = document.createElement('div');
            let identificador = 'bingo'+x+y;
            div.setAttribute('id',identificador);
            if(cookies.includes(identificador)) div.classList.add('sel');
            div.addEventListener('click',function(){seleccionar(identificador)},false);
            bingo.append(div);
        }
    }
}

function seleccionar(dato)
{
    let cookies = document.cookie;
    // Si existe, borramos
    if(cookies.includes(dato)) {
        document.cookie = dato+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/bingo.html;";
        document.getElementById(dato).classList.remove('sel');
    }
    else {
        let tmp = estediciembre();
        document.cookie = dato+"=true; expires="+tmp+"; path=/bingo.html;";
        document.getElementById(dato).classList.add('sel');
    }
}

function estediciembre()
{
    let pt = new Date();
    pt.setMonth('11');
    pt.setDate('31');
    return pt.toUTCString()
}


function generarcanvas()
{
    // Obtenemos datos básicos
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Ponemos los pokes en la base
    let img = document.getElementById('bingopokes');
    ctx.drawImage(img, 0 ,0);

    // Vamos a leer las cookies para poner los cuadrados
    let cookies = decodeURIComponent(document.cookie);
    let list = cookies.split(';');

    // Vamos a utilizar sel para determinar si las casillas deben ser azules o verdes
    let xall = [];
    let yall = [];
    for(let i=0;i<=6;i++)
    {
        if(document.querySelectorAll('.sel[id^="bingo'+i+'"]').length==6) xall.push(i);
        if(document.querySelectorAll('.sel[id$="'+i+'"]').length==6) yall.push(i);
    }
    
    for(let i=0;i<list.length;i++) 
    {
        let c = list[i];

        // Pequeña depuración que javascript es gilipollassss
        while (c.charAt(0) == ' ') { c = c.substring(1); }

        // No sé si usaré cookies en otro lugar, pero si sí, filtramos que empiecen por bingo
        if(c.includes('bingo'))
        {
            // Quitamos bingo y =true. Voy a 
            c = c.replace('bingo','');
            c = c.replace('=true','');

            // Ultima comprobacion para tonticos, veamos que tenga dos letras
            if(c.length == 2)
            {
                // Cogemos coordenadas en bruto
                let x = parseInt(c.charAt(0));
                let y = parseInt(c.charAt(1));

                // Ponemos color en base a si las líneas estan completas
                if(xall.includes(x) || yall.includes(y)) ctx.fillStyle = 'rgba(0,0,221,0.5)';
                else ctx.fillStyle = 'rgba(0,221,0,0.5)';

                // Dibujamos
                let xdraw = (x-1)*180;
                let ydraw = (y-1)*180;
                ctx.fillRect(xdraw,ydraw,180,180)
            }
        }
    }

    // Terminamos con el grid
    img = document.getElementById('bingogrid');
    ctx.drawImage(img, 0 ,0);

    canvas.style.border = "1px solid black";
    canvas.style.display = "block";

    var link = document.createElement('a');
    link.setAttribute('download', 'bingopokeñol.png');
    link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
    link.click();
}
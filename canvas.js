window.addEventListener('load', function(event){ //Allt i skriptet används när sidan laddar klart

let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;
let json = document.getElementById("exptJ"); 
let status = document.getElementById('status');
let selectColor = document.getElementById('color');
let inputColor = document.getElementById('input-color');
let addColor = document.getElementById('add-color'); 
let hexColors = '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$';
let userHex;
let jsonObj = [];


 // Exportera till JSON
            let exptJ = document.getElementById('exportJSON');
            let jsonInfo = document.getElementById('jsonInfo');
            exptJ.addEventListener('mouseover', function(event){
                status.innerHTML ="Klicka för JSON";
            });

            exptJ.addEventListener('click', function(event){

                let text ="";
                for(i = 0; i < jsonObj.length; i++){
                  let jsobjs = JSON.stringify(jsonObj[i], null, 2)
                  text +=jsobjs;
                }
                jsonInfo.innerHTML = "JSON: " + text;
            })

//Lägga till färger i listan
addColor.addEventListener('click',function(event){
        userHex = inputColor.value.toLowerCase();
        let newOption = document.createElement('option');
        newOption.value = userHex;
        newOption.innerHTML = userHex;
        selectColor.appendChild(newOption);
        status.innerHTML ="Color added to list";
})

//Välj färger
function getColor(){
    let c = document.getElementById('color').value;
    return c;
}

selectColor.addEventListener('change', function(event){
    context.strokeStyle = getColor();
})

//Rita triangel
let dt = document.getElementById('dt');
dt.addEventListener('click', function(event){
    triangle();
});

dt.addEventListener('mouseover',function(event){
    status.innerHTML = "Click here to draw a triangle";
})
let clickList = [];
let triangle = function(){
    let click = 0;
    
    canvas.addEventListener('click', function dtl(event) {
    let rect = canvas.getBoundingClientRect();
    click++;
    if (click === 1) {
        x1 = (event.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
        y1 = (event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
        context.fillRect(x1, y1, 1, 1);
        context.beginPath();
        context.moveTo(x1, y1);
        status.innerHTML = "Click in canvas to choose your second point.";
        cancelBtn(dtl);
    } 
    if (click === 2) {
        x2 = (event.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
        y2 = (event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
        context.fillRect(x2, y2, 1, 1);
        context.lineTo(x2, y2);
        status.innerHTML = "Click in canvas to choose your last point.";
        cancelBtn(dtl);
    }
    if (click === 3) {
        x3 = (event.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
        y3 = (event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
        context.fillRect(x3, y3, 1, 1);
        context.lineTo(x3, y3);
        context.closePath();
        context.stroke();
        status.innerHTML = "Nice!";
		jsonObj.push({ x1: x1, y1: y1, x2: x2, y2: y2, x3: x3, y3: y3 });
    }
});
}

//Rita rektangel
let dr = document.getElementById('dr');
dr.addEventListener('click', function(event){
    rectangle();
});

dr.addEventListener('mouseover', function(event){
    status.innerHTML = "Click here to draw a rectangle";
})
let rectangle = function(){
        let click = 0;
        canvas.addEventListener('click', function drl(event){
        let rect = canvas.getBoundingClientRect();
        click++;
        
        if(click === 1){
        x1 = (event.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
        y1 = (event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
        context.fillRect(x1, y1, 1, 1);
        context.beginPath();
        status.innerHTML = "Click in canvas to choose your second point.";
            cancelBtn(drl);
        }
        if (click === 2) {
        x2 = (event.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
        y2 = (event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
        context.rect(x1,y1,x2-x1,y2-y1);
        context.stroke();   
        status.innerHTML = "Nice!";
		jsonObj.push({ x1: x1, y1: y1, x2: x2, y2: y2});
    }
    })
}

//Rita cirkel
let dc = document.getElementById('dc');
dc.addEventListener('click', function(event){
    circle();
});

dc.addEventListener('mouseover', function(event){
    status.innerHTML = "Click here to draw a circle";
})

let circle = function(){
    let click = 0;
    canvas.addEventListener('click', function dcl(event){
     let rect = canvas.getBoundingClientRect();
        click++;
        if (click === 1){
        x1 = (event.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
        y1 = (event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
        context.fillRect(x1, y1, 1, 1);
        context.beginPath(); 
        status.innerHTML = "Choose second point."; 
        cancelBtn(dcl);
        }
        if (click === 2) {
        x2 = (event.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
        y2 = (event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
        let r = Math.sqrt(Math.pow((x2 - x1),2) +Math.pow((y2 -y1),2));   
        context.arc(x1,y1,r,0,2*Math.PI);
        context.stroke();
        status.innerHTML = "Nice!"; 
		jsonObj.push({ x1: x1, y1: y1, x2: x2, y2: y2});		
       }
    })
}

//Rensa & avbryt canvas
let clear = document.getElementById('clear');
clear.addEventListener('click', function(event){
    context.clearRect(0, 0, canvas.width, canvas.height);
	jsonInfo.innerHTML = "";
	json.style.display = "none";
})
clear.addEventListener('mouseenter', function(event){
    let status = document.getElementById('status');
    status.innerHTML = "Click to clear canvas"
})

clear.addEventListener('mouseleave', function(event){
    let status = document.getElementById('status');
    status.innerHTML = "Status"
})

clear.addEventListener('click', function(event){
    let status = document.getElementById('status');
    status.innerHTML = "Canvas cleared."
})

let cancel = document.getElementById('cancel');

function cancelBtn(funC){
    cancel.addEventListener('click', function(event){
    canvas.removeEventListener('click', funC);
})
    
}
    

//Funktioner för statusbaren

canvas.addEventListener("click", function(event){ //Visar vilka koordinater man är på i canvasen vid klick
  status.innerHTML = "You clicked in canvas at coordinates: " + event.clientX +
    "," + event.clientY; 
});

canvas.addEventListener("mouseover", function(event){
	status.innerHTML = "Draw on canvas."
	
});

canvas.addEventListener("mouseleave", function(event){
	status.innerHTML = "Status"
	
});

dropdown.style.display = "none"; //Drop-down i menyn ska ej vara synlig förrän man vill det

meny.addEventListener("mouseenter", function(event){ //När muspekaren är över meny-knappen visas denna text
    status.innerHTML = "Click to open menu."
    
});

meny.addEventListener("mouseleave", function(event){ //När muspekaren är över meny-knappen visas denna text
    status.innerHTML = "Status"
    
});
    
dropdown.addEventListener("mouseleave", function(event){//När muspekaren lämnar dropdown-menyn ska statusbaren återgå till default text
    //status.innerHTML = "Status"                       //och dropdown ska inte visas.
    dropdown.style.display = "none";
    
});
    
meny.addEventListener("click", function(event){ //När man klickar på menyn ska dropdown visas, annars inte
    if(dropdown.style.display == "none"){
        dropdown.style.display = "block";
    } else {
        dropdown.style.display = "none";
    }
    });
	
	
dc.addEventListener("click", function(event){
	status.innerHTML = "Click in canvas to set out first point.";
		
});

dc.addEventListener("mouseleave", function(event){
	status.innerHTML = "Click in canvas to set out first point.";
		
});

dt.addEventListener("click", function(event){
	status.innerHTML = "Click in canvas to set out first point.";
		
});

dt.addEventListener("mouseleave", function(event){
	status.innerHTML = "Click in canvas to set out first point.";
		
});

dr.addEventListener("click", function(event){
	status.innerHTML = "Click in canvas to set out first point.";
		
});

dr.addEventListener("mouseleave", function(event){
	status.innerHTML = "Click in canvas to set out first point.";
		
});
	
cancel.addEventListener("mouseenter", function(event){
	status.innerHTML = "Click here to cancel drawing";
		
});

cancel.addEventListener("click", function(event){
	status.innerHTML = "Drawing canceled";
		
});
	
cancel.addEventListener("mouseleave", function(event){
	status.innerHTML = "Status";
		
});	

exptJ.addEventListener("mouseenter", function(event){
	status.innerHTML = "Click to export drawing to JSON";
		
});	

exptJ.addEventListener("mouseleave", function(event){
	status.innerHTML = "Status";
		
});	

});
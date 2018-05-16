function selector1(index) {
    changeTo(index);
    switch (index){
        case "1":
            document.getElementById("commit").style.display="none";
            // document.getElementById("container").innerHTML = "<div id=\"container2\"></div>";
            break;
        case "2":
            document.getElementById("container2").innerHTML = "<div id=\"container21\"></div>";
            document.getElementById("commit").style.display="none";
            createInput();
            break;
        case 3:

            break;
        case 4:
            break;
        case 5:
            break;
    }

}

function changeTo(index) {
    for(let count = 0; count < 5; count ++){
        document.getElementById("container"+(count + 1)).style.display="none";
    }
    document.getElementById("container"+index).style.display="block";
}

function createInput() {
    let x = document.getElementById("container2");
    let target = document.getElementById("container21");

    let y = document.createElement("input");
    y.id = "tableName";
    y.type = "text";
    y.placeholder = "Table Name";

    let z = document.createElement("input");
    z.id = "totalColumns";
    z.type = "number";
    z.placeholder = "Columns Numbers";
    z.onblur = addInput;

    x.insertBefore(y, target);
    x.insertBefore(z, target);

}
function addInput() {
    let num = parseInt(document.getElementById("totalColumns").value);
    let x = document.getElementById("container21");
    x.innerHTML = "";

    if(num > 0){
        for (let count = 0; count < num; count ++){
            let y = document.createElement("input");
            y.type = "text";
            y.placeholder = "Attribute";
            y.className = "inputList";
            x.appendChild(y);
        }

        document.getElementById("commit").style.display="block";
    }
}

let tableNum = 0;

function displayThead() {
    let a = document.getElementById("select2");
    let b = document.createElement("option");
    b.innerHTML = document.getElementById("tableName").value;
    b.selected = true;
    a.appendChild(b);

    let arr = document.getElementsByClassName("inputList");
    let x = document.getElementById("preview");
    x.innerHTML = "";
    let y = document.createElement("tr");

    for(let num = 0; num < arr.length; num ++){
        let z = document.createElement("th");
        z.innerHTML = arr[num].value;
        y.appendChild(z);
    }
    x.appendChild(y);

}
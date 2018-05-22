let tableNum = 0;
let tables = []; //Table对象的数组
let currentTableIndex = 0;
function Table(name, ths, trs) {
    this.name = name;
    //ths是th的数组，其长度为ColumnsNumbers
    //trs是tr的二维数组，一维是tds，tds数组的长度也是ColumnsNumbers
    this.ths = ths;
    this.trs = trs;
}

function selector1(index) {
    let x = document.getElementById("container");
    x.innerHTML = "";
    currentTableIndex = document.getElementById("select2").value;
    switch (index){
        case "1":
            document.getElementById("commit").style.display="none";
            break;
        case "2":
            document.getElementById("commit").style.display="none";
            let inputOfName = document.createElement("input");
            inputOfName.id = "tableName";
            inputOfName.type = "text";
            inputOfName.placeholder = "Table Name";
            let inputOfCols = document.createElement("input");
            inputOfCols.id = "totalColumns";
            inputOfCols.type = "number";
            inputOfCols.placeholder = "Columns Numbers";
            inputOfCols.onblur = addInput;
            x.appendChild(inputOfName);
            x.appendChild(inputOfCols);
            break;
        case "3":
            document.getElementById("commit").style.display="none";
            let arr = tables[currentTableIndex - 1].ths;    //字符串数列
            if(arr.length > 0){
                for (let count = 0; count < arr.length; count ++){
                    let y = document.createElement("input");
                    y.type = "text";
                    y.placeholder = arr[count];
                    y.className = "tdList";
                    x.appendChild(y);
                }
                document.getElementsByClassName("tdList")[arr.length-1].onblur = function () {
                    document.getElementById("commit").style.display = "block";
                    document.getElementById("commit").onclick = displayTd;
                }
            }
            break;
        case "4":
            document.getElementById("commit").style.display="block";
            document.getElementById("commit").onclick = deleteRow;

            let arr1 = tables[currentTableIndex - 1].ths;    //字符串数列
            if(arr1.length > 0) {
                for (let count = 0; count < arr1.length; count++) {
                    let y = document.createElement("input");
                    y.type = "text";
                    y.placeholder = arr1[count];
                    y.className = "tdDelete";
                    x.appendChild(y);
                }
            }
            break;
        case "5":
            document.getElementById("commit").style.display="block";
            document.getElementById("commit").onclick = deleteTable;
            let y = document.createElement("p");
            y.innerHTML = "WARNING: You cannot undo this action!";
            x.appendChild(y);
            break;
    }
}

function deleteTable() {
    currentTableIndex = document.getElementById("select2").value;
    if(currentTableIndex > 0){
        tables.splice(currentTableIndex-1, 1);
        tableNum --;
        let mother = document.getElementById("select2");
        mother.removeChild(mother.getElementsByTagName("option")[currentTableIndex]);
        for(let i = currentTableIndex; i < tableNum+1; i++){
            mother.getElementsByTagName("option")[i].value --;
        }
        if(tableNum > 0){
            document.getElementById("select2").value = 1;
            selector2();
        } else{
            document.getElementById("select2").value = 0;
            selector2();
        }
    }
}

function deleteRow() {
    let isEmpty = true;
    for(let count = 0; count < document.getElementsByClassName("tdDelete").length; count ++){
        if(document.getElementsByClassName("tdDelete")[count].value != "")
            isEmpty = false;
    }
    if(isEmpty){
        tables[currentTableIndex-1].trs = new Array();
        selector2();
    }else {
        let currentTd = document.getElementsByClassName("tdDelete");    //得到待删除的row对应的node数组
        let temp = -1;
        for(let num = 0; num < tables[currentTableIndex-1].trs.length; num ++){
            let isEqual = true;
            for(let count = 0; count < currentTd.length; count ++){
                if(currentTd[count].value != tables[currentTableIndex-1].trs[num][count])
                    isEqual = false;
            }
            if(isEqual == true){    //某一行完全相同
                temp = num;
                break;
            }
        }
        if(temp != -1){
            tables[currentTableIndex-1].trs[temp] = new Array();
            selector2();
        }
    }
}

function displayTd() {
    let x = document.getElementById("preview");
    let y = document.createElement("tr");
    let tdArr = new Array();
    let currentTd = document.getElementsByClassName("tdList");
    for(let count = 0; count < currentTd.length; count ++){
        tdArr[count] = currentTd[count].value;
        let z = document.createElement("td");
        z.innerHTML = currentTd[count].value;
        y.appendChild(z);
    }
    x.appendChild(y);
    tables[currentTableIndex - 1].trs[tables[currentTableIndex-1].trs.length] = tdArr;
    //本来length是0，这么一声明之后对tables[0]赋值为数组，且length变成了1，继续下次轮回

}

function addInput() {
    let colNum = parseInt(document.getElementById("totalColumns").value);
    let x = document.getElementById("container");
    let allNodes = x.childNodes;
    if(allNodes.length > 2){
        for(let o = allNodes.length-1; o > 1 ; o --){
            x.removeChild(allNodes[o]);
        }
    }
    if(colNum > 0){
        x.appendChild(document.createElement("br"));
        for (let count = 0; count < colNum; count ++){
            let y = document.createElement("input");
            y.type = "text";
            y.placeholder = "Attribute";
            y.className = "inputList";
            x.appendChild(y);
        }
        document.getElementsByClassName("inputList")[colNum-1].onblur = function () {
            document.getElementById("commit").style.display = "block";
            document.getElementById("commit").onclick = displayThead;
        }
    }
}

function displayThead() {
    tableNum ++;
    let a = document.getElementById("select2");
    let b = document.createElement("option");
    b.value = tableNum; //方便根据option的value确定显示哪一个table，从1开始
    b.innerHTML = document.getElementById("tableName").value;
    b.selected = true;
    a.appendChild(b);

    let arr = document.getElementsByClassName("inputList");
    let x = document.getElementById("preview");
    x.innerHTML = "";
    let y = document.createElement("tr");
    let thArr = new Array();

    for(let num = 0; num < arr.length; num ++){
        let z = document.createElement("th");
        z.innerHTML = arr[num].value;
        thArr[num] = arr[num].value;
        y.appendChild(z);
    }
    x.appendChild(y);
    tables[tableNum-1] = new Table(document.getElementById("tableName").value, thArr, new Array());
}

function selector2(){
    let x = document.getElementById("preview");
    x.innerHTML = "";
    currentTableIndex = document.getElementById("select2").value;
    if(currentTableIndex > 0){
        let y = document.createElement("tr");
        for(let num = 0; num < tables[currentTableIndex-1].ths.length; num ++){
            let z = document.createElement("th");
            z.innerHTML = tables[currentTableIndex-1].ths[num];
            y.appendChild(z);
        }
        x.appendChild(y);
        for(let num = 0; num < tables[currentTableIndex-1].trs.length; num ++){
            let p = document.createElement("tr");
            for(let count = 0; count < tables[currentTableIndex-1].trs[num].length; count ++){
                let q = document.createElement("td");
                q.innerHTML = tables[currentTableIndex-1].trs[num][count];
                p.appendChild(q);
            }
            x.appendChild(p);
        }
    }
}
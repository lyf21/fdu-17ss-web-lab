const countries = [
    { name: "Canada", continent: "North America", cities: ["Calgary","Montreal","Toronto"], photos: ["canada1.jpg","canada2.jpg","canada3.jpg"] },
    { name: "United States", continent: "North America", cities: ["Boston","Chicago","New York","Seattle","Washington"], photos: ["us1.jpg","us2.jpg"] },
    { name: "Italy", continent: "Europe", cities: ["Florence","Milan","Naples","Rome"], photos: ["italy1.jpg","italy2.jpg","italy3.jpg","italy4.jpg","italy5.jpg","italy6.jpg"] },
    { name: "Spain", continent: "Europe", cities: ["Almeria","Barcelona","Madrid"], photos: ["spain1.jpg","spain2.jpg"] }
];
window.onload = function () {
    let mother = document.getElementsByClassName("flex-container");
    let item = new Array(4);

    for(let num = 0; num < 4; num ++){
        item[num] = document.createElement("div");
        item[num].className = "item";
        mother[0].appendChild(item[num]);

        let h2 = document.createElement("h2");
        h2.innerHTML = countries[num].name;

        let p = document.createElement("p");
        p.innerHTML = countries[num].continent;

        let box1 = document.createElement("div");
        box1.className = "inner-box";
        let h3 = document.createElement("h3");
        h3.innerHTML = "Cities";
        let ul = document.createElement("ul");
        for(let city_num = 0; city_num < countries[num].cities.length; city_num ++){
            let li = document.createElement("li");
            li.innerHTML = countries[num].cities[city_num];
            ul.appendChild(li);
        }
        box1.appendChild(h3);
        box1.appendChild(ul);

        let box2 = document.createElement("div");
        box2.className = "inner-box";
        let h31 = document.createElement("h3");
        h31.innerHTML = "Popular Photos";
        box2.appendChild(h31);
        for(let photo_num = 0; photo_num < countries[num].photos.length; photo_num ++){
            let img = document.createElement("img");
            img.className = "photo";
            img.src = "images/"+countries[num].photos[photo_num];
            box2.appendChild(img);
        }

        let button = document.createElement("button");
        button.innerHTML = "Visit";

        item[num].appendChild(h2);
        item[num].appendChild(p);
        item[num].appendChild(p);
        item[num].appendChild(box1);
        item[num].appendChild(box2);
        item[num].appendChild(button);
    }
}



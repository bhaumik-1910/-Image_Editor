const fileInput = document.querySelector(".file-input"),
filterOptions = document.querySelectorAll(".filter button"),
filterName = document.querySelector(".filter-info .name"),
filterValue = document.querySelector(".filter-info .value"),
rotateOptions = document.querySelectorAll(".rotate button"),
filterSlider = document.querySelector(".slider input"),
previewImg = document.querySelector(".preview-img img"),
resetfilterBtn = document.querySelector(".reset-filter"),
chooseImgBtn = document.querySelector(".choose-img"),
saveImgBtn = document.querySelector(".save-img");

let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
let rotate = 0, flipHorizontal = 1, flipVertical = 1;

const applyFilters = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}

const loadImage = () => {
    let file = fileInput.files[0]; //getting user selected File
    if(!file)return; //return if user hasn't selected file
    previewImg.src = URL.createObjectURL(file); // passing file url as preview img src
    previewImg.addEventListener("load", () => {
        resetfilterBtn.click(); // clicking resetbtn, so the filter value reset if the user select new img
        document.querySelector(".container").classList.remove("disable");
    });
}

filterOptions.forEach(option => {
    option.addEventListener("click", () => { //adding click event listener to all filter button
        document.querySelector(".active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;

        if(option.id === "brightness") {
            filterSlider.max = "200";
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;
            console.log('b%');
        } else if(option.id === "saturation") {
            filterSlider.max = "200";
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`;
            console.log('s%');
        } else if(option.id === "inversion") {
            filterSlider.max = "100";
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`;
            console.log('i%');
        } else {
            filterSlider.max = "100";
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
            console.log('g%');
        }
    });
});

const updateFilter = () => {
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filter .active"); //getting selected filter btn

    if(selectedFilter.id === "brightness") {
        brightness = filterSlider.value;
        console.log('b');
    } else if(selectedFilter.id === "saturation") {
        saturation = filterSlider.value;
        console.log('s');
    } else if(selectedFilter.id === "inversion") {
        inversion = filterSlider.value;
        console.log('i');
    } else {
        grayscale  = filterSlider.value;
        console.log('g');
    }
    applyFilters();
}

rotateOptions.forEach(option => {
    option.addEventListener("click", () => { //adding click event listener to all rotate/flip buttons
        if(option.id === "left") {
            rotate -= 90; //if clicked btn is left rotate, decrement rotate value by -90
            
        } else if(option.id === "right") {
            rotate += 90; //if clicked btn is right rotate, increment rotate value by +90
            
        } else if(option.id === "horizontal") {
            // if flipHorizontal value is 1, set this to -1 else set 1
            flipHorizontal = flipHorizontal === 1 ? -1 : 1; 
            
        } else {
            // if flipVertical value is 1, set this to -1 else set 1
            flipVertical = flipVertical === 1 ? -1 : 1;   
        }
        applyFilters();
    });
});

const resetFilter = () => {
    // resetting all variable value to its default value
    brightness = '100'; saturation = '100'; inversion = '0'; grayscale = '0';
    rotate = 0; flipHorizontal = 1; flipVertical = 1;
    filterOptions[0].click(); // clicking brightness btn, so the brightness selected by default
    applyFilters();
}

const saveImage = () => {
    const canvas = document.createElement("canvas"); // creating canvas element
    const ctx = canvas.getContext("2d"); // canvas.getContext return a drawing context no the canvas
    console.log(2);
    canvas.width = previewImg.naturalWidth; //satting canvas width to actual image width
    console.log(4);
    canvas.height = previewImg.naturalHeight; //satting canvas height to actual image height
    console.log(3);

    const p = prompt("enter img form");

    //applying user selected filters to canavas filter
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2); //transleting canvas from center
    if(rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(flipHorizontal, flipVertical); //flip canvas, horizontelly / vertically
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    const link = document.createElement("a"); // creating <a> element 
    
    link.download =`image.${p}`; // passing <a> tag download value to "image.jpg"
    link.href = canvas.toDataURL(); // passing <a> tag href value to canvas data url
    link.click(); // clicking <a> tag so the image download
}

fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input", updateFilter);
resetfilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());

// const fileInput = document.querySelector(".file-input"),
// filterOptions = document.querySelectorAll(".filter button"),
// filterName = document.querySelector(".filter-info .name"),
// filterValue = document.querySelector(".filter-info .value"),
// filterSlider = document.querySelector(".slider input"),
// rotateOptions = document.querySelectorAll(".rotate button"),
// previewImg = document.querySelector(".preview-img img"),
// resetFilterBtn = document.querySelector(".reset-filter"),
// chooseImgBtn = document.querySelector(".choose-img"),
// saveImgBtn = document.querySelector(".save-img");

// let brightness = "100", saturation = "100", inversion = "0", grayscale = "0";
// let rotate = 0, flipHorizontal = 1, flipVertical = 1;

// const loadImage = () => {
//     let file = fileInput.files[0];
//     if(!file) return;
//     previewImg.src = URL.createObjectURL(file);
//     previewImg.addEventListener("load", () => {
//         resetFilterBtn.click();
//         document.querySelector(".container").classList.remove("disable");
//     });
// }

// const applyFilter = () => {
//     previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
//     previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
// }

// filterOptions.forEach(option => {
//     option.addEventListener("click", () => {
//         document.querySelector(".active").classList.remove("active");
//         option.classList.add("active");
//         filterName.innerText = option.innerText;

//         if(option.id === "brightness") {
//             filterSlider.max = "200";
//             filterSlider.value = brightness;
//             filterValue.innerText = `${brightness}%`;
//         } else if(option.id === "saturation") {
//             filterSlider.max = "200";
//             filterSlider.value = saturation;
//             filterValue.innerText = `${saturation}%`
//         } else if(option.id === "inversion") {
//             filterSlider.max = "100";
//             filterSlider.value = inversion;
//             filterValue.innerText = `${inversion}%`;
//         } else {
//             filterSlider.max = "100";
//             filterSlider.value = grayscale;
//             filterValue.innerText = `${grayscale}%`;
//         }
//     });
// });

// const updateFilter = () => {
//     filterValue.innerText = `${filterSlider.value}%`;
//     const selectedFilter = document.querySelector(".filter .active");

//     if(selectedFilter.id === "brightness") {
//         brightness = filterSlider.value;
//     } else if(selectedFilter.id === "saturation") {
//         saturation = filterSlider.value;
//     } else if(selectedFilter.id === "inversion") {
//         inversion = filterSlider.value;
//     } else {
//         grayscale = filterSlider.value;
//     }
//     applyFilter();
// }

// rotateOptions.forEach(option => {
//     option.addEventListener("click", () => {
//         if(option.id === "left") {
//             rotate -= 90;
//         } else if(option.id === "right") {
//             rotate += 90;
//         } else if(option.id === "horizontal") {
//             flipHorizontal = flipHorizontal === 1 ? -1 : 1;
//         } else {
//             flipVertical = flipVertical === 1 ? -1 : 1;
//         }
//         applyFilter();
//     });
// });

// const resetFilter = () => {
//     brightness = "100"; saturation = "100"; inversion = "0"; grayscale = "0";
//     rotate = 0; flipHorizontal = 1; flipVertical = 1;
//     filterOptions[0].click();
//     applyFilter();
// }

// const saveImage = () => {
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");
//     canvas.width = previewImg.naturalWidth;
//     canvas.height = previewImg.naturalHeight;
    
//     ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
//     ctx.translate(canvas.width / 2, canvas.height / 2);
//     if(rotate !== 0) {
//         ctx.rotate(rotate * Math.PI / 180);
//     }
//     ctx.scale(flipHorizontal, flipVertical);
//     ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
//     const link = document.createElement("a");
//     link.download = "image.jpg";
//     link.href = canvas.toDataURL();
//     link.click();
// }

// filterSlider.addEventListener("input", updateFilter);
// resetFilterBtn.addEventListener("click", resetFilter);
// saveImgBtn.addEventListener("click", saveImage);
// fileInput.addEventListener("change", loadImage);
// chooseImgBtn.addEventListener("click", () => fileInput.click());
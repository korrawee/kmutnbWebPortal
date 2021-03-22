const content = document.querySelector('.content');
const navBar = document.querySelector('nav');
const page = document.querySelector("page");

//EventListeners


scrollNav();
genContent();

//Functions

//ADD Contents
function genContent(){
    //Read data from JSON file
    fetch("./src/data/data.json") 
    .then(response => response.json())
    .then(data => {
        //Working with the data HERE
        switch(page.classList.value){
            case "index":
                let catLen = Object.keys(data).length; // catLen = number of category
                for(let catIndex=0 ; catIndex < catLen ; catIndex++){
                    let catElement = Object.values(data[catIndex])[0];

                    for(let i=0 ; i < catElement.length ; i++){
                        appendContent(content, catElement[i].img, catElement[i].topic);
                    }
                }
                break;
            case "award":
                console.log(data[1].award.length);
                for(let i=0 ; i < data[1].award.length ; i++){
                    appendContent(content, data[1].award[i].img, data[1].award[i].topic);
                }
                break;
            case "invention":
                console.log(data[2].invent.length);
                for(let i=0 ; i < data[2].invent.length ; i++){
                    appendContent(content, data[2].invent[i].img, data[2].invent[i].topic);
                }
                break;
            case "scholarship":
                console.log(data[3].scholarship.length);
                for(let i=0 ; i < data[3].scholarship.length ; i++){
                    appendContent(content, data[3].scholarship[i].img, data[3].scholarship[i].topic);
                }
                break;
            case "research":
                console.log(data[0].research.length);
                for(let i=0 ; i < data[0].research.length ; i++){
                    appendContent(content, data[0].research[i].img, data[0].research[i].topic);
                }
                break;
        }//End switch cases
        
    });
    
    
}
function appendContent(parent, imgSrc, contentSrc){
    //Create content section
    const newSection = document.createElement('section');
    newSection.classList = 'content-child';

    //Add Image element
    const newImage = document.createElement('img');
    newImage.src = imgSrc;
    newImage.id = 'img';

    //Add link
    const newLink = document.createElement('a');
    newLink.href = "www.google.co.th";
    newLink.appendChild(newImage);
    newSection.appendChild(newLink);

    //Add content element
    const newContent = document.createElement('p');
    newContent.id = 'content-text';
    newContent.innerText = contentSrc;
    newSection.appendChild(newContent);

    parent.appendChild(newSection);
}

//NAVIGATION BAR animation
function scrollNav(){
    window.addEventListener('scroll', () =>{
        if(window.scrollY > 20){
            navBar.classList.add('sticky');
        }else{
            navBar.classList.remove('sticky');
        }
    });
}

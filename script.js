const content = document.querySelector('.content');
const navBar = document.querySelector('nav');
const page = document.querySelector("page");
const homeText = document.querySelector(".home-text");
const searchInput = document.querySelector('.search-input');

var data = {};
var contentChild = [];
//EventListeners
searchInput.addEventListener('keydown', (e) => {
    if(e.keyCode == 13){//Pressed RETURN key call search func.
        homeText.innerHTML = "<h4>ผลลัพธ์การค้นหา</h4>"; //change home text

        contentChild.forEach(e => {         //remove old contents
            e.classList.add('content-child-rm');
        });

        let result = document.querySelector('.content h2');
        let matched = search(e);

        if(matched == 0){ // No content match with search value
            result.classList.add('no-result-show');
        }else{
            result.classList.remove('no-result-show');
        }
    } 
});

scrollNav();
genContent();

//Functions

//ADD Contents
function genContent(){
    //Read data from JSON file
    fetch("./src/data/data.json") 
    .then(response => response.json())
    .then(d => {
        //Working with the data HERE
        data = d;
        console.log(data.length);
        switch(page.classList.value){
            case "index":
                let catLen = data.length; // catLen = number of category
                let articleName = [];
                for(let catIndex=0 ; catIndex < catLen ; catIndex++){ // Loop each category
                    let articles = Object.values(data[catIndex])[0];

                    for(let i=0 ; i < articles.length ; i++){ // Loop each article
                        if(!articleName.includes(articles[i].topic)){ // check is this article displayed
                        articleName.push(articles[i].topic)
                        appendContent(content, articles[i].img, 
                                    articles[i].topic,
                                    articles[i].detail, 
                                    articles[i].url);
                        }
                    }
                }
                break;
            case "award":
                console.log(data[1].award.length);
                for(let i=0 ; i < data[1].award.length ; i++){
                    appendContent(content, data[1].award[i].img, 
                                    data[1].award[i].topic,
                                    data[1].award[i].detail, 
                                    data[1].award[i].url);
                }
                break;
            case "invention":
                console.log(data[2].invent.length);
                for(let i=0 ; i < data[2].invent.length ; i++){
                    appendContent(content, data[2].invent[i].img, 
                                    data[2].invent[i].topic,
                                    data[2].invent[i].detail, 
                                    data[2].invent[i].url);
                }
                break;
            case "scholarship":
                console.log(data[3].scholarship.length);
                for(let i=0 ; i < data[3].scholarship.length ; i++){
                    appendContent(content, data[3].scholarship[i].img, 
                                    data[3].scholarship[i].topic,
                                    data[3].scholarship[i].detail, 
                                    data[3].scholarship[i].url);
                }
                break;
            case "research":
                console.log(data[0].research.length);
                for(let i=0 ; i < data[0].research.length ; i++){
                    appendContent(content, data[0].research[i].img,
                                    data[0].research[i].topic,
                                    data[0].research[i].detail,
                                    data[0].research[i].url);
                }
                break;
        }//End switch cases
    });
    
    
}
function appendContent(parent, imgSrc, topicSrc, contentSrc, urlSrc){
    //Create content section
    const newSection = document.createElement('section');
    contentChild.push(newSection);  // store content into array
    newSection.classList = 'content-child';

    //Add Image element
    const newImage = document.createElement('img');
    newImage.src = imgSrc;
    newImage.id = 'img';
    //newImage.classList.add('img-transition');
    newImage.addEventListener('click', () => {
        window.open(urlSrc, "_blank");
    });
    newSection.appendChild(newImage);

    //Add topic & detail element
    const contentText = document.createElement('div');
    contentText.classList.add("content-text");
        //Add topic
    const newTopic = document.createElement('a');
    newTopic.id = 'content-topic';
    newTopic.addEventListener('click', () => {
        window.open(urlSrc, "_blank");
    });    
    newTopic.innerText = topicSrc;
    contentText.appendChild(newTopic);

        //Add content element
    const newContent = document.createElement('p');
    newContent.id = 'content-detail';
    newContent.innerText = contentSrc;
    contentText.appendChild(newContent);

    newSection.appendChild(contentText);
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

//Search function
function search(e){
        let matched = 0;
        let searchValue = searchInput.value;
    
        data.forEach(element => {   // Loop in data
            let contents = Object.values(element)[0]; // contents in category
            contents.forEach(eachContent => {           // Loop each content
                if(eachContent.topic.includes(searchValue) || 
                    eachContent.detail.includes(searchValue)){ //Is search value in any content?
                    matched +=1; //counting matched content

                    appendContent(content, eachContent.img, // show the content
                        eachContent.topic, 
                        eachContent.detail, 
                        eachContent.url);
                }else{
                    console.log("Mismatch");
                }
            });
        });
        return matched;       
}

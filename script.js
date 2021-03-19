const content = document.querySelector('.content');

//EventListeners



for(let i=0; i< 10; i++){
    genContent(content);
}

//Functions
function genContent(content){
    //Create content section
    const newSection = document.createElement('section');
    newSection.classList = 'content-child';
    //Add Image element
    const newImage = document.createElement('img');
    newImage.src = './src/img/mock.png';
    newImage.id = 'img';
    newSection.appendChild(newImage);

    //Add content element
    const newContent = document.createElement('p');
    newContent.id = 'content-text';
    newContent.innerText = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quod, vero dicta quibusdam numquam, iusto optio fugiat quisquam veritatis excepturi adipisci eaque distinctio error natus deserunt tenetur eveniet blanditiis? Temporibus.';
    newSection.appendChild(newContent);

    content.appendChild(newSection);
}
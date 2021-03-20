const content = document.querySelector('.content');
const navBar = document.querySelector('nav');
//EventListeners


scrollNav();
for(let i=0; i< 10; i++){
    genContent(content);
}

//Functions

//ADD Contents
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

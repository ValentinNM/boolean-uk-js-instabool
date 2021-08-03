// write your code here
console.log("working");


let images = [];
const imageContainrEL = document.querySelector(".image-container");

fetch("http://localhost:3000/images")
  .then((res) => res.json())
  .then((data) => {
    console.log("Inside db data: ", data);
    images = data;
renderPostCard(images);
});
  


function renderPostCard (images) { 
   
    const articleEl = document.createElement ("article");

    const imageTitleEl = document.createElement("h2");
    imageTitleEl.className = 'title';
    imageTitleEl.innerText = "Title of image to be put here";
    
    articleEl.append(imageTitleEl);

    const image = images[0].image;
    // console.log("image:", image);
    const postImgEl = document.createElement ("img");
    postImgEl.className = "image";
    postImgEl.src = image;
    articleEl.append(postImgEl);



    const likesSectionDivEl = document.createElement("div");
    likesSectionDivEl.className = "likes-section";
    const spanEl = document.createElement("span");
    spanEl.className = "likes";
    spanEl.innerText = "0 likes";
    
    const likeButtonEl = document.createElement("button");
    likeButtonEl.className = "like-button";
    likeButtonEl.innerText = " ♥ ";
    
    likesSectionDivEl.append(spanEl, likeButtonEl);
    articleEl.append(likesSectionDivEl);
    
    
    // for (let i = 1; i < images.length; i++) { 
        //     console.log("loop data: ", images);
        //     const pet = images[i];
        //     const petComments = pet.comments;
        //     console.log("petComments:", petComments);
        
        
        // }
        
    const comment = images[0].comments[0].content;

    const commentsUlEl = document.createElement("ul");
    commentsUlEl.className = "comments";
    const commentEl = document.createElement("li");
    commentEl.innerText = comment;
    commentsUlEl.append(commentEl);
    articleEl.append(commentsUlEl);

    const formEl = document.createElement("form");
    formEl.className = "comment-form";
    const userInputEl = document.createElement ("input");
    userInputEl.className = "comment-input"
    userInputEl.type = "text";
    userInputEl.name = "comment";
    userInputEl.placeholder = "Add a comment...";
    formEl.append(userInputEl);

    const commentButtonEl = document.createElement("button");
    commentButtonEl.className = "comment-button";
    commentButtonEl.type = "submit";
    commentButtonEl.innerText = "Post";

    formEl.append(commentButtonEl);

    articleEl.append(formEl);
    
    imageContainrEL.append(articleEl);
}






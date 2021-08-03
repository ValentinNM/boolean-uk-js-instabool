// write your code here
console.log("working");


let images = [];
let commentsData = [];

const imageContainrEL = document.querySelector(".image-container");

fetch("http://localhost:3000/images")
  .then((res) => res.json())
  .then((data) => {
    console.log("Inside images data: ", data);
    images = data;

    renderPostCard(images);
});

function renderPostCard (images) { 
    console.log('images:', images);

    
    images.forEach(imageData => {
    console.log("image data; ", imageData);  
    const articleEl = document.createElement ("article");
    articleEl.className = "image-card";

    const imageTitleEl = document.createElement("h2");
    imageTitleEl.className = 'title';
    imageTitleEl.innerText = imageData.title;
    
    articleEl.append(imageTitleEl);

    const postImgEl = document.createElement ("img");
    postImgEl.className = "image";
    postImgEl.src = imageData.image;
    articleEl.append(postImgEl);

    const likesSectionDivEl = document.createElement("div");
    likesSectionDivEl.className = "likes-section";
    const spanEl = document.createElement("span");
    spanEl.className = "likes";
    spanEl.innerText = `${imageData.likes} likes`;
    
    const likeButtonEl = document.createElement("button");
    likeButtonEl.className = "like-button";
    likeButtonEl.innerText = " ♥ ";

    likeButtonEl.addEventListener("click", () => {
        console.log("clicked", imageData.id, imageData.likes);
    // const previousLikes = imageData.likes ;

    const fetchOptions = {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({likes: imageData.likes + 1})
    };
    
    fetch(`http://localhost:3000/images/${imageData.id}`, fetchOptions)
        .then((res) => res.json())
        .then((updatedLikes) => {
          console.log("Inside PATCH Fetch: ", updatedLikes);
          spanEl.innerText = `${imageData.likes += 1} likes`;

        });
      
    })
    
    likesSectionDivEl.append(spanEl, likeButtonEl);
    articleEl.append(likesSectionDivEl);
        
    const commentsUlEl = document.createElement("ul");
    commentsUlEl.className = "comments";

    imageData.comments.forEach(comment => { 
        
        const commentEl = document.createElement("li");
        commentEl.innerText = comment.content;
        commentsUlEl.append(commentEl);
        
    });
    
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

    })
}


// create function to render all comments

// create function to render all the post containers on the feed

// function the new comments to be added in the comments section




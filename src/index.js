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



    // **** Mornig lecture syntax START **** \\

    // likesButton.addEventListener("click", () => {
    //     console.log("Single Source Of Truth: ", images)
    
    //     // You need access to the "id" and the current "likes" of an image/post
    
    //     // Write our fetch request in here...
    //     const url = `http://localhost:3000/images/${image.id}`
    
    //     const imageUpdate = {
    //       likes: image.likes + 1,
    //     }
    
    //     const fetchOptions = {
    //       method: "PATCH",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(imageUpdate),
    //     }
    
    //     fetch(url, fetchOptions)
    //       .then(res => res.json())
    //       .then(updatedImage => {
    //         console.log("Inside PATCH fetch: ", updatedImage)
    
    //         // likesSpanEl.innerText = `${updatedImage.likes} likes`
    
    //         // const imageCardEl = renderImageCard(updatedImage)
    
    //         // imagesSectionEl.append(imageCardEl)
    
    //         const updatedImages = []
    
    //         for (let i = 0; i < images.length; i++) {
    //           const image = images[i]
    
    //           if (image.id === updatedImage.id) {
    //             console.log("Copy: ", { ...image })
    //             updatedImages.push({
    //               ...image,
    //               likes: updatedImage.likes,
    //             })
    //           } else {
    //             updatedImages.push({
    //               ...image,
    //             })
    //           }
    //         }
    
    //         console.log("Update for SSOT: ", updatedImages)
    
    //         // const updatedImages = images.map(image => {
    //         //   if (image.id !== updatedImage.id) return image
    
    //         //   return {
    //         //     ...image,
    //         //     likes: updatedImage.likes,
    //         //   }
    //         // })
    
    //         images = updatedImages
    
    //         renderImagesList(images)
    //       })
    //   })

      /// Mornig lecture syntax END

    
    articleEl.append(commentsUlEl);

    const formEl = document.createElement("form");
    formEl.className = "comment-form";
    const userInputEl = document.createElement ("input");
    userInputEl.className = "comment-input"
    userInputEl.type = "text";
    userInputEl.name = "comment";
    userInputEl.placeholder = "Add a comment...";

    // userInputEl.addEventListener("input", () => {
    //     console.log("submited");
    // })

    formEl.append(userInputEl);

    const commentButtonEl = document.createElement("button");
    commentButtonEl.className = "comment-button";
    commentButtonEl.type = "submit";
    commentButtonEl.innerText = "Post";

    formEl.addEventListener("submit", (event) => {
        console.log("submited", imageData.comment);
        event.preventDefault();

        const fetchOptions = {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: userInputEl,
                imageId: imageData.id,
            })
        };
        
        fetch('http://localhost:3000/comments', fetchOptions)
            .then((res) => res.json())
            .then((newComment) => {
              console.log("Inside POST Fetch: ", newComment);
                // smth to do with line 112-114
            });

    })

    formEl.append(commentButtonEl);

    articleEl.append(formEl);
    
    imageContainrEL.append(articleEl);

    })
}


// create function to render all comments

// create function to render all the post containers on the feed

// function the new comments to be added in the comments section




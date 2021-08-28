let counter = 0;

const addPost = () => {
    counter += 1;
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res => res.json())
        .then(data => {
            showPost(data, counter);
        })
}

const showPost = (postData, counter) => {
    const postsWrap = document.getElementById("postsWrap");
    postsWrap.textContent = "";


    for (let i = 0; i < counter; i++) {
        if (counter == postData.length) {
            break;
        }


        const div = document.createElement("div");
        div.setAttribute("style", "margin-bottom: 10px");

        const h1 = document.createElement("h1");
        h1.setAttribute("style", "display: inline; color: lightgray");

        const h2 = document.createElement("h4")
        h2.setAttribute("style", "display: inline; color: orange; cursor: pointer; ");
        h2.setAttribute("title", "click to show detail");

        h2.setAttribute("onclick", `goPostDetail(${postData[i].id})`);

        h2.setAttribute("data-bs-target", "#offcanvasRight");
        h2.setAttribute("data-bs-toggle", "offcanvas");
        // h2.setAttribute("aria-controls", "offcanvasRight");

        const p = document.createElement("p")

        h1.innerText = `${postData[i].id}. `;
        h2.innerText = postData[i].title


        div.appendChild(h1);
        div.appendChild(h2);
        // div.appendChild(p);

        postsWrap.appendChild(div);
    }
}


const goPostDetail = (idClicked) => {
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res => res.json())
        .then(data => {
            for (const info of data) {
                if (info.id === idClicked) {
                    const offcanvasTitle = document.getElementById("offcanvasRightLabel");

                    const offcanvasBody = document.getElementById("offcanvas-body");

                    offcanvasTitle.innerText = info.title;
                    offcanvasBody.innerText = info.body

                    showComment(info.id);
                }
            }
        })
}

const showComment = Id => {
    fetch("https://jsonplaceholder.typicode.com/comments")
        .then(res => res.json())
        .then(data => {
            const commentWrap = document.getElementById("commentWrap");
            commentWrap.textContent = "";
            for (const comment of data) {
                if (comment.postId == Id) {

                    const div = document.createElement("div");
                    div.innerHTML = `
                        <div class="mx-auto mt-3" style="border-bottom: 1px solid rgb(236, 235, 235); width: 80%;">

                            <h6 style="font-size: 14px;" id="commentEmail" class="text-success m-0">${comment.email}</h6>
                            <p style="font-size: 13px;" class="text-black-50 mb-2" id="commentDetail">${comment.body}</p>

                        </div>
                    `
                    commentWrap.appendChild(div);
                }
            }
        })
}
var post_item_data = [
    {
        id: 1,
        avatar: "https://lh3.googleusercontent.com/a/ALm5wu1TJd6L5obraPYRcwYf_SwmGZnDHpPwpjUXvaaigw=s288-p-rw-no",
        first_name: "Ruelito",
        last_name: "Ytac",
        post_message: "Sample test POST Data",
        reply_data: [
            {
                id: 1,
                avatar: "https://lh3.googleusercontent.com/a/ALm5wu1TJd6L5obraPYRcwYf_SwmGZnDHpPwpjUXvaaigw=s288-p-rw-no",
                first_name: "Ruelito",
                last_name: "Ytac",
                reply_message: "Sample test REPLY Data",
            }
        ]
    }
]

document.addEventListener("DOMContentLoaded", function(){
    renderPostItem();               /* This will render all the post item. */
    renderAllReplyData();           /* This will render all the reply data. */
    document.getElementById("post_item_input").addEventListener("keyup", submitPostItem);   /* This will submit the post item form data. */
    document.addEventListener("keyup", submitReplyItem);                                    /* This will submit the reply item form data. */
    document.addEventListener("click", removeSelectedPostReplyData);                        /* This will remove the selected post reply data. */
});

/**
 * DOCU: This will submit the post item form data.
 * Last Updated Date: October 31, 2022
 * @author Ruelito
 * @param event - This is the event that is triggered when the user hits enter.
 */
const submitPostItem = (event) => {
    /* This will check if the user hit enter and has a value. */
    if(event.key === "Enter" && document.getElementById("post_item_input").value.trim().length){
        post_item_data.push({
            id: post_item_data.length + 1,
            avatar: "https://lh3.googleusercontent.com/a/ALm5wu1TJd6L5obraPYRcwYf_SwmGZnDHpPwpjUXvaaigw=s288-p-rw-no",
            first_name: "Ruelito",
            last_name: "Ytac",
            post_message: event.target.value.replace(/(\r\n|\r|\n)/gm, ""),
            reply_data: []
        });

        event.target.value = "";
        renderPostItem();
    }
}

/**
 * DOCU: This will submit the reply item form data.
 * Last Updated Date: October 31, 2022
 * @author Ruelito
 * @param event - This is the event that is triggered when the user hits enter.
 */
const submitReplyItem = (event) => {
    /* This will check if the user hit enter and has a reply_item_input class. */
    if(event.key === "Enter" && event.target.classList[0] === "reply_item_input"){
        let reply_item_form = event.target.closest("form");
        
        post_item_data.map(post_item => {
            /* This will check if the post item data is equal to selected post item id. */
            if(post_item.id === parseInt(reply_item_form.querySelector(".post_item_id").value)){
                post_item.reply_data.push({
                    id: post_item.reply_data.length + 1,
                    avatar: "https://lh3.googleusercontent.com/a/ALm5wu1TJd6L5obraPYRcwYf_SwmGZnDHpPwpjUXvaaigw=s288-p-rw-no",
                    first_name: "Ruelito",
                    last_name: "Ytac",
                    reply_message: event.target.value.replace(/(\r\n|\r|\n)/gm, "")
                });

                renderReplyData(post_item.id);
            }
        });

        event.target.value = "";
    }
}

/**
 * DOCU: This will submit the post item form data.
 * Last Updated Date: October 31, 2022
 * @author Ruelito
 * @param event - This is the event that is triggered when the user hits enter.
 */
const renderPostItem = () => {
    let post_item_clone = document.querySelector("#clone_items .post_item").cloneNode(true);

    post_item_data.map(post_item => {
        renderPostReplyItemData(post_item_clone, post_item, post_item.post_message, "data-post-id", false);
        post_item_clone.querySelector(".post_item_id").value = post_item.id;
    });

    document.querySelector("#post_list").appendChild(post_item_clone);
}

/**
 * DOCU: This will render the selected post item reply data.
 * Last Updated Date: October 31, 2022
 * @author Ruelito
 * @param event - This will fetch the post_id data.
 */
const renderReplyData = (post_id) => {
    let reply_item_clone = document.querySelector("#clone_items .reply_item").cloneNode(true);

    post_item_data.map(post_item => {
        /* This will check if the post item data is equal to selected post item id. */
        if(post_item.id === parseInt(document.querySelector(`.post_item[data-post-id="${ post_id }"] .post_item_id`).value)){
            post_item.reply_data.map(reply_item => {
                renderPostReplyItemData(reply_item_clone, reply_item, reply_item.reply_message, "data-reply-id", true);
                document.querySelector(`.post_item[data-post-id="${ post_id }"] .reply_list`).appendChild(reply_item_clone);
            });
        }
    });
}

/**
 * DOCU: This will render all the reply data.
 * Last Updated Date: October 31, 2022
 * @author Ruelito
 * @param event - This is the event that is triggered when the user hits enter.
 */
const renderAllReplyData = () => {
    let reply_item_clone = document.querySelector("#clone_items .reply_item").cloneNode(true);

    post_item_data.map(post_item => {
        post_item.reply_data.map(reply_item => {
            renderPostReplyItemData(reply_item_clone, reply_item, reply_item.reply_message, "data-reply-id", true);
            document.querySelector(`.post_item[data-post-id="${ post_item.id }"] .reply_list`).appendChild(reply_item_clone);
        });
    });
}

/**
 * DOCU: This will remove the selected post reply data.
 * Last Updated Date: October 31, 2022
 * @author Ruelito
 * @param event - This is the event that is triggered when the user hits enter.
 */
const removeSelectedPostReplyData = (event) => {
    /* Check if it has a remove_data. */
    if(event.target.classList[0] === "remove_data"){
        event.target.closest("li").remove();
    }
}

/**
 * DOCU: This will render the post/reply details.
 * Last Updated Date: October 31, 2022
 * @author Ruelito
 * @param selected_clone_item - This will fetch the clone item data.
 * @param item_data - This will fetch selected the item data.
 * @param data_message - This will get the data message item.
 * @param data_item_id - This will get the selected item data id.
 * @param is_reply - This will check if its reply.
 */
const renderPostReplyItemData = (selected_clone_item, item_data, data_message, data_item_id, is_reply) => {
    selected_clone_item.querySelector("img").setAttribute("src", item_data.avatar);
    selected_clone_item.querySelector("h3").innerHTML = `${ item_data.first_name } ${ item_data.last_name } ${ (is_reply) ? "<span>1 min ago</span>" : "" } `;
    selected_clone_item.querySelector("p").textContent = data_message;
    selected_clone_item.setAttribute(data_item_id, item_data.id);
}
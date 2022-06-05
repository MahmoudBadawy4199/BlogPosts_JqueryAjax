let postID = localStorage.getItem('postID');
let urlLink = `https://jsonplaceholder.typicode.com/posts/${postID}`;

let postObject;

    $.ajax ({
        method: 'GET',
        url:urlLink
    }).done(function(data,status){
        if(status == "success"){
            postObject = data;
            checkInputs();
        }
    })



function checkInputs(){
    $('.save').click(function (event) {
        event.preventDefault();
        validateInput();
    });


    $('.cancel').click(function (event) {
        localStorage.clear();
        window.close();
    });
}


function validateInput(){
    let editPostTitleText = $("#post_title").val();
    let editPostDescriptionText = $("#post_desc").val();


    if(!editPostTitleText || !editPostDescriptionText){
        alert("Change Both values");
    }
    else {
            savePost(editPostTitleText,editPostDescriptionText);
    }
}


function savePost(newTitle,newDesc){
    postObject.title = newTitle;
    postObject.body = newDesc;
    $.ajax({
        type: 'PUT',
        url: urlLink,
        data: JSON.stringify(postObject),
    }).done(function () {
        alert('Post update SUCCESS');
        window.close();
    }).fail(function (msg) {
        alert('FAIL');
    })

}
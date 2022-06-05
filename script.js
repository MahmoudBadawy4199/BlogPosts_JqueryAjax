
  $(document).ready(function(){
    loadDataFromApi();
  })
  let dataFromApi;
  function loadDataFromApi(){
    $.ajax ({
        method: 'GET',
        url:"https://jsonplaceholder.typicode.com/posts"
    }).done(function(data,status){
        if(status == "success"){
          dataFromApi = data;
            updateUI(dataFromApi)
        }
        else{
             alert("Refresh to load again") 
        }
    })
}

  
  function updateUI(data){
    for (var i = 0; i <data.length; i++){
        let title = data[i].title;
        let userID = data[i].userId;
        let postID = data[i].id;
        let body = data[i].body;

        $(".container").append(`
        <div id = ${postID} class="blog-card">
        <h2>${title}</h2>
        <p>${body}</p>
        <p>User ID: ${userID}</p>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
        </div>`
       );
    }
    $(".edit").click(function (event) {
       let postID = event.target.parentElement.id;
       localStorage.setItem("postID",postID);
       window.open("page2.html");
        
    });
    $('.delete').click(function (event) {
      let postID = event.target.parentElement.id;
      confirm("Are you sure ?")?deletePost(postID): console.log("canceld");
    });
}


function deletePost(postID){
  let urlLink = `https://jsonplaceholder.typicode.com/posts/${postID}`;

  $.ajax({
    url: urlLink,
    type: 'DELETE',
    success: function(result) {
        splicePosts(postID);
    }
});
}

function splicePosts(postID){

  const indexOfObject = dataFromApi.findIndex(object => {
    return object.id === postID;
  });
  
  dataFromApi.splice(indexOfObject, 1);
  $(`#${postID}`).remove();
  alert("Removed successfully");
}
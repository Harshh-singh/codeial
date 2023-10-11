{
    //method to submit the form data for new post using ajax
    let createpost = function(){

        let newpostform = $('#new-post-form');

        newpostform.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/post/create',
                data: newpostform.serialize(),
                success: function(data){

                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));

                     // call the create comment class
                     new PostComments(data.data.post._id);

                     // CHANGE :: enable the functionality of the toggle like button on the new post
                     new ToggleLike($(' .toggle-like-button', newPost));
 
                     new Noty({
                         theme: 'relax',
                         text: "Post published!",
                         type: 'success',
                         layout: 'topRight',
                         timeout: 1500
                         
                     }).show();


                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


//method to create a post in dom

let newPostDom = function(post){
    return $(`<li id="post-${post._id}">
    <p>
            <small>
                ${post.user.name}
            </small>
            <br>
         
            ${post.content}
            
            <br>

            <small>
        <a class='toggle-like-btn' data-likes='0' href='/likes/toggle/?id=${post._id}&type=Post'>
            0 Likes
        </a>
            
            </small>

            <small>
            <a class="delete-post-button" href="post/destroy/${post._id}">
                <button>Delete</button>
            </a>
            </small>

        </p>

            <div class="post-comments">
            
                <form action="/comments/create" method="post">
                <input type="text" name="content" placeholder="Type here to add comment...">
                <input type="hidden" name="post" value="${ post._id }">
                <input type="submit" value="add comment">
                
                </form>
             

                <div class="post-comments-list">
                <ul id="post-comments-${ post._id }">
                    
                    
                    </li>
                </ul>
                </div>
            </div>                      
        </li>`)
}


//method to delete post from dom

let deletePost = function(deletelink){
    $(deletelink).click(function(e){
        e.preventDefault();

        $.ajax({
            type: 'get',
            url: $(deletelink).prop('href'),
            success: function(data){
                $(`#post-${data.data.post_id}`).remove();
            },error: function(error){
                console.log(error.responseText);
            }
        });
    });
}

createpost();
}
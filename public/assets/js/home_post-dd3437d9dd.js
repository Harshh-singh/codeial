{let t=function(){let e=$("#new-post-form");e.submit(function(t){t.preventDefault(),$.ajax({type:"post",url:"/post/create",data:e.serialize(),success:function(t){var e=o(t.data.post);$("#posts-list-container>ul").prepend(e),s($(" .delete-post-button",e)),new PostComments(t.data.post._id),new ToggleLike($(" .toggle-like-button",e)),new Noty({theme:"relax",text:"Post published!",type:"success",layout:"topRight",timeout:1500}).show()},error:function(t){console.log(t.responseText)}})})},o=function(t){return $(`<li id="post-${t._id}">
    <p>
            <small>
                ${t.user.name}
            </small>
            <br>
         
            ${t.content}
            
            <br>

            <small>
        <a class='toggle-like-btn' data-likes='0' href='/likes/toggle/?id=${t._id}&type=Post'>
            0 Likes
        </a>
            
            </small>

            <small>
            <a class="delete-post-button" href="post/destroy/${t._id}">
                <button>Delete</button>
            </a>
            </small>

        </p>

            <div class="post-comments">
            
                <form action="/comments/create" method="post">
                <input type="text" name="content" placeholder="Type here to add comment...">
                <input type="hidden" name="post" value="${t._id}">
                <input type="submit" value="add comment">
                
                </form>
             

                <div class="post-comments-list">
                <ul id="post-comments-${t._id}">
                    
                    
                    </li>
                </ul>
                </div>
            </div>                      
        </li>`)},s=function(e){$(e).click(function(t){t.preventDefault(),$.ajax({type:"get",url:$(e).prop("href"),success:function(t){$("#post-"+t.data.post_id).remove()},error:function(t){console.log(t.responseText)}})})};t()}
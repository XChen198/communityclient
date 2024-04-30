const baseUrl = 'http://localhost:3001'

// 获取帖子的评论
export const getComments = (postId: string, currentPage: number) => {
    try {
        const response = fetch(`${baseUrl}/api/comment?postId=${postId}&currentPage=${currentPage}`, {
            method: 'GET',
            credentials: 'include'
        });
        return response;
    } catch (error) {
        console.log('Error fetching comments', error);
    }
}

// 获取评论的子评论
export const getChildComments = (parentId: string, currentPage: number) => {
    try {
        const response = fetch(`${baseUrl}/api/comment/child?parentId=${parentId}&currentPage=${currentPage}`, {
            method: 'GET',
            credentials: 'include'
        });
        return response;
    } catch (error) {
        console.log('Error fetching child comments', error);
    }
}


// 上传评论
export const postComment = (postId: string, content: string) => {
    try {
        const response = fetch(`${baseUrl}/api/comment/post`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                postId,
                content
            })
        });
        return response;
    } catch (error) {
        console.log('Error posting comment', error);
    }
}
// 回复一级评论
export const replyFirstComment = (parentId: string, postId: string, content: string) => {
    try {
        const response = fetch(`${baseUrl}/api/comment/reply`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                parentId,
                postId,
                content
            })
        });
        return response;
    } catch (error) {
        console.log('Error replying comment', error);
    }
}

// 回复二级以及以上评论
export const replySecondComment = (parentId: string, postId: string, content: string, replyId: string) => {
    try {
        const response = fetch(`${baseUrl}/api/comment/reply`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                parentId,
                postId,
                content,
                replyId
            })
        });
        return response;
    } catch (error) {
        console.log('Error replying comment', error);
    }
}

// 删除评论
export const delteComment = (commentId: string) => {
    try {
        const response = fetch(`${baseUrl}/api/comment`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: commentId
            })
        });
        return response;
    } catch (error) {
        console.log('Error deleting comment', error);
    }
}

// 获取所有评论(管理员)
export const getAllComments = (currentPage: number) => {
    try {
        const response = fetch(`${baseUrl}/api/permission/getAllComments?currentPage=${currentPage}`, {
            method: 'GET',
            credentials: 'include'
        });
        return response;
    } catch (error) {
        console.log('Error fetching all comments', error);
    }
}
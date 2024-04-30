const baseUrl = 'http://localhost:3001'

// 获取帖子列表，关键词搜索，分页
export const getPosts = (currentPage: number, keyWord: string, type: string) => {
    try {
        const response = fetch(`${baseUrl}/api/post/getposts?currentPage=${currentPage}&keyWord=${keyWord}&type=${type}`, {
            method: 'GET',
            credentials: 'include',
        })
        return response
    } catch (error) {
        console.log('Error fetching posts', error);
    }
}

// 获取帖子详情
export const getPost = (postId: string) => {
    try {
        const response = fetch(`${baseUrl}/api/post/${postId}`, {
            method: 'GET',
            credentials: 'include',
        })
        return response
    } catch (error) {
        console.log('Error fetching post', error);
    }
}


// 上传图片
export const uploadImg = (img: FormData) => {
    try {
        const response = fetch(`${baseUrl}/api/post/uploadimg`, {
            method: 'POST',
            credentials: 'include',
            body: img
        })
        return response
    } catch (error) {
        console.log('Error uploading image', error);
    }
}

// 创建帖子
export const createPost = (type: string, title: string, content: string) => {
    try {
        console.log(type, title, content);

        const response = fetch(`${baseUrl}/api/post`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ type, title, content })
        })
        return response
    } catch (error) {
        console.log('Error creating post', error);
    }
}

// 获取用户已经发布的帖子
export const getUserPosts = (currentPage: number) => {
    try {
        const response = fetch(`${baseUrl}/api/post/getuserposts?currentPage=${currentPage}`, {
            method: 'GET',
            credentials: 'include',
        })
        return response
    } catch (error) {
        console.log('Error fetching user posts', error);
    }
}

// 删除帖子
export const deletePostById = (postId: string) => {
    try {
        const response = fetch(`${baseUrl}/api/post/${postId}`, {
            method: 'DELETE',
            credentials: 'include',
        })
        return response
    } catch (error) {
        console.log('Error deleting post', error);
    }
}

// 更新帖子
export const updatePostById = (postId: string, type: string, title: string, content: string) => {
    try {
        const response = fetch(`${baseUrl}/api/post/${postId}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ type, title, content })
        })
        return response
    } catch (error) {
        console.log('Error updating post', error);
    }
}

// 获取最热帖子
export const getHotPosts = () => {
    try {
        const response = fetch(`${baseUrl}/api/post/gethotposts`, {
            method: 'GET',
            credentials: 'include',
        })
        return response
    } catch (error) {
        console.log('Error fetching hot posts', error);
    }
}
const baseUrl = 'http://localhost:3001'

// 获取用户信息
export const getUserInfo = () => {
    try {
        const response = fetch(`${baseUrl}/api/user`, {
            credentials: 'include'
        })
        return response
    } catch (error) {
        console.log('Error fetching user info', error);
    }
}

// 修改用户密码
export const changePassword = (oldPassword: string, newPassword: string) => {
    try {
        const response = fetch(`${baseUrl}/api/user`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                oldPassword,
                newPassword
            }),
            credentials: 'include'
        })
        return response
    } catch (error) {
        console.log('Error changing password', error);
    }
}
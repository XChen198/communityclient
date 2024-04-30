const baseUrl = 'http://localhost:3001'


// 注册
export const signup = (username: string, password: string, confirmPassword: string, captcha: string) => {
    try {
        const response = fetch(`${baseUrl}/api/auth/signup`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
                confirmPassword,
                captcha
            })
        })
        return response
    } catch (error) {
        console.log('Error signing up:', error);
    }
}

// 登录
export const login = (username: string, password: string) => {
    try {
        const response = fetch(`${baseUrl}/api/auth/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        return response
    } catch (error) {
        console.log('Error fetching login', error);
    }
}


// 退出登录
export const logout = () => {
    try {
        const response = fetch(`${baseUrl}/api/auth/logout`, {
            credentials: 'include',
            method: 'POST'
        })
        return response
    } catch (error) {
        console.log('Error logging out:', error);
    }
}

// 获取图形验证码
export const getCaptha = () => {
    try {
        const response = fetch(`${baseUrl}/api/auth/captcha`, {
            credentials: 'include'
        })
        return response
    } catch (error) {
        console.log('Error fetching captcha:', error);
    }
}

// 检查是否是管理员
export const checkAdmin = () => {
    try {
        const response = fetch(`${baseUrl}/api/permission/check`, {
            credentials: 'include',
        })
        return response
    } catch (error) {
        console.log('Error checking admin:', error);
    }
}
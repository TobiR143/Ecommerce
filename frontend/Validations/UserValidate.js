export class UserValidate {
    static username ({ username }) {
        if (username.length <= 3)
            return { error: "Username must have at least 4 charcaters", success: false}
        return { success: true }
    }
    static password ({ password }) {
        if (password.length <= 5)
            return { error: "Password must have at least 6 charcaters" , success: false}
        return { success: true }
    }
}
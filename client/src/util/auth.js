//for test
const users = [
    { email: "admin", password: "admin##3804", name: "admin"}
]
export function signIn({email, password}) {
    const user = users.find(
        (user) => user.email === email && user.password === password
    );
    if( user == undefined) throw new Error();
    return user;
}
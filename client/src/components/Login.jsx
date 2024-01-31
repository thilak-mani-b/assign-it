export const Login = () => {
    function signInWithGoogleHandler(){
        window.open("http://localhost:4000/auth/google/callback","_self")
    }
    return (
        <div>
            Login
            <button onClick={signInWithGoogleHandler}>Sign in with google</button>
        </div>
    )
}
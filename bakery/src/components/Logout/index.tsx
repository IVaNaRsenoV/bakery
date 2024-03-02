export const Logout = () => {
    function logout() {
        fetch("http://localhost:5000/users/logout", {
            method: "POST",
            credentials: 'include'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Ошибка сети!");
                }
                return response.text();
            })
            .then(data => console.log('Куки удалены'))
            .catch(error => console.error("Произошла ошибка!"))
    }

    return (
        <div>
            <h1>Are you sure ?</h1>
            <button onClick={logout}>yes</button>
        </div>
    )
}
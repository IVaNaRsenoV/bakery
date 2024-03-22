export async function api(path: string, method: string, data?: { login: string, password: string }) {
    await fetch(`http://localhost:5000/users/${path}`, {
        method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Ошибка сети!");
            }
            return response.text();
        })
        .then(data => {
            if (path === "login") {
                localStorage.setItem("token", data);
            } else if (path === "logout") {
                localStorage.removeItem("token");
            }
            console.log('Значение куки: ', data)
        })
        .catch(error => console.error("Произошла ошибка!"))
}
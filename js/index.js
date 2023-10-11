'use stict'

document.addEventListener("DOMContentLoaded", () => {

    let user, containerId="register-container"

    const User = (name, age) => {
        return {
            name,
            age,
            toConsole () {
                console.log("user", this)
            }
        }
    }
    
    const registerForm = (containerId) => {

        let html = `
            <form action="#">
                <input id="user-name" placeholder="Please enter user name" type="text" length="10" /> 
                <input id="user-age" placeholder="Please enter user age" type="number" min="0" /> 
                <input id="submit" type="submit" value="Register" />
            </form>
    
        `
        document.getElementById(containerId).innerHTML=html
        document.getElementById("submit").addEventListener("click", (ev) => {
            let username = document.getElementById("user-name").value
            let userage = +document.getElementById("user-age").value
            user = User(username, userage)
            
            console.log({ user })

            localStorage.setItem("user", JSON.stringify(user))
            location.reload()
        })
    }

    const deregister = (containerId) => {
        let html=`
            <form action="#">
                <span class="label">Username:</span><span class="username">${user.name}</span>
                <span class="label">Age:</span><span class="userage">${user.age}</span>
                <input id="deregister" type="submit" value="Logout" />        
            </form>
        `

        document.getElementById(containerId).innerHTML=html
        document.getElementById("deregister").addEventListener("click", () => {
            user = null
            localStorage.removeItem("user")
            location.reload()
        })
    }
    
    
    
    user = JSON.parse(localStorage.getItem("user"))
    console.log({ user })
    if(!user) {
        // we need a register form
        registerForm(containerId)
    } else {
        deregister(containerId)
    }

    let users = []
    document.getElementById("store-data").addEventListener("click", () => {
        users.push(User("Tom", 30))
        users.push(User("Dick", 31))
        users.push(User("Harriet", 32))
    
        localStorage.setItem("users", JSON.stringify(users))
        users.forEach(user => {
            user.toConsole()
        })
    })

    document.getElementById("get-data").addEventListener("click", () => {
        users = []
        
        let _users = JSON.parse(localStorage.getItem("users"))
        console.log("_users", _users)  // these are not the original users. There is no toConsole() method
        _users.forEach(user => {
            users.push(User(user.name, user.age))
        })
        console.log("users", users)

        let html = "<ul>"
        users.forEach((user) => {
            html+= `
                <li>${user.name} - ${user.age}</li>
            `
        })
        html += "</ul>"
        document.getElementById("data-container").innerHTML = html
    })
    



})
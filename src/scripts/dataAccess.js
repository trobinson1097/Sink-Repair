import { render } from "./main.js"
const API = "http://localhost:8088"
const mainContainer = document.querySelector("#container")

export const getRequests = () => {
    return applicationState.requests.map(request => ({...request}))
}
export const getPlumbers = () => {
    return applicationState.plumbers.map(plumber => ({...plumber}))
}

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
    .then(response => response.json())
    .then(
        (serviceRequests) => {
            // Store the external state in application state
            applicationState.requests = serviceRequests
        }
        )
    }
    
    const applicationState = { 
        requests: [],
        plumbers: []
    
    }
    
export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

mainContainer.addEventListener(
        "stateChanged",
        customEvent => {
            render()
        }
    )

    // a function that initiates the fetch request for delete 
export const deleteRequest = (id) => {
        //the delete must have a primary ket sent as an argument so you can identify and delete a single source 
        return fetch(`${API}/requests/${id}`, { method: "DELETE" })
            .then(
                () => {
                    mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
                }
            )
    }


export const fetchPlumbers = () => {
        return fetch(`${API}/plumbers`)
            .then(response => response.json())
            .then(
                (data) => {
                    applicationState.plumbers = data
                }
            )
    }

    export const saveCompletion = (completionRequest) => {
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(completionRequest)
        }
    
    
        return fetch(`${API}/completions`, fetchOptions)
            .then(response => response.json())
            .then(() => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            })
    }

    export const fetchCompletions = () => {
        return fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (plumberRequest) => {
                // Store the external state in application state
                applicationState.completion = plumberRequest
            }
            )
        }
        
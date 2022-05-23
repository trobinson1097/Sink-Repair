import { getRequests } from "./dataAccess.js"
import { deleteRequest, getPlumbers } from "./dataAccess.js"
import { saveCompletion } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

export const Requests = () => {
    const requests = getRequests()
    const plumbers = getPlumbers()

    let html = `
        <ul>
            ${requests.map((request) => convertRequestToListElement(request, plumbers)).join("")
        }
        </ul>
    `

    return html
}
// function that that can send a delete request to the api 
const convertRequestToListElement = (request, plumbers) => {
    return `<li> 
    ${request.description}
        <select class="plumbers" id="plumbers">
        <option value="">Choose</option>
            ${plumbers.map(
                plumber => {
            return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
        }
    ).join("")
        }
    </select>
    <button class="request__delete"
                id="request--${request.id}">
            Delete
        </button>
    </li>`
}

// adding an event listener to the mainContainer element 
mainContainer.addEventListener("click", click => {
    // when user clicks delete invoke the function that deletes single resource (id)
    if (click.target.id.startsWith("request--")) {
        const [, requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

// create change event 
mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
           const completion = {
                requestId,
                plumberId,
                dateCreated: Date.now
           }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
           saveCompletion(completion)

        }
    }
)
// add doc event function that 
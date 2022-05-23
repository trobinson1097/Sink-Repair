import { SinkRepair } from "./SinkRepair.js"
import { fetchRequests } from "./dataAccess.js"
import { fetchPlumbers } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

export const render = () => {
    fetchRequests()
        .then(() => fetchPlumbers())
        .then(
            () => {
                mainContainer.innerHTML = SinkRepair()
            }
        )
}

render()


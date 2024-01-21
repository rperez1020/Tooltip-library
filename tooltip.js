import addGlobalEventListener from "./utils/addGlobalEventListener";

const tooltipContainer = document.createElement('div')
tooltipContainer.classList.add("tooltip-container")
document.body.append(tooltipContainer)

addGlobalEventListener("mouseover", "[data-tooltip]", e => {
    const tooltip = createTooltipElement(e.target.dataset.tooltip)
    tooltipContainer.append(tooltip)

    e.target.addEventListener("mouseleave", () => {
        tooltip.remove()
    },
    {once: true}
    )
})

function createTooltipElement(text){
    const tooltip = document.createElement("div")
    tooltip.classList.add("tooltip")
    tooltip.innerText = text
    return tooltip
}
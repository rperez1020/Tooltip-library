import addGlobalEventListener from "./utils/addGlobalEventListener";

const DEFAULT_SPACING = "10"
const tooltipContainer = document.createElement('div')
tooltipContainer.classList.add("tooltip-container")
document.body.append(tooltipContainer)

addGlobalEventListener("mouseover", "[data-tooltip]", e => {
    const tooltip = createTooltipElement(e.target.dataset.tooltip)
    tooltipContainer.append(tooltip)
    positionTooltip(tooltip, e.target)
    
    

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

function positionTooltip(tooltip, element){
    const elementRect = element.getBoundingClientRect()
    const tooltipRect = tooltip.getBoundingClientRect()
    const spacing = parseInt(element.dataset.spacing) || DEFAULT_SPACING

    tooltip.style.top =    `${elementRect.top - tooltipRect.height - spacing}px`
    tooltip.style.left =    `${elementRect.left + elementRect.width / 2 - tooltipRect.width / 2}px`

    const bounds = isOutOfBounds(tooltip)
    
    if(bounds.top){
        resetTooltipPosition(tooltip)
    }
    if(bounds.right){
        tooltip.style.right = 0
        tooltip.style.left = "initial"
    }
    if(bounds.left){

    }

}

function isOutOfBounds(element){
    const rect = element.getBoundingClientRect()
    const containerRect = tooltipContainer.getBoundingClientRect()

    return{
        left: rect.left < containerRect.left,
        right: rect.right >= containerRect.right,
        top: rect.top < containerRect.top,
        bottom: rect.bottom > containerRect.bottom
    }
}

function resetTooltipPosition(tooltip){
    tooltip.style.top = "initial"
    tooltip.style.bottom = "initial"
    tooltip.style.left = "initial"
    tooltip.style.right = "initial"

}
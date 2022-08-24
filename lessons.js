const lessonsContainer = document.querySelector(".lessons-container")
const nextContainer = document.querySelector(".next-container")
const prevContainer = document.querySelector(".prev-container")
let transformation = ""
let clientW  = document.body.clientWidth

setTimeout(() => {
  nextContainer.classList.add("first-active")
}, 1000);
setTimeout(() => {
  nextContainer.classList.remove("first-active")
}, 2000);



nextContainer.addEventListener("click", () => {
  transformation = lessonsContainer.style.transform
  clientW = document.body.clientWidth
  changeDimension()
})

prevContainer.addEventListener("click", () => {
  transformation = lessonsContainer.style.transform
  clientW = document.body.clientWidth

  if (transformation === "translate3d(-66.68%, 0px, 0px)" && clientW < 915) {
    lessonsContainer.style.transform = "translate3d(-33.34%, 0, 0)"
    nextContainer.classList.add("active")
  } else {
    lessonsContainer.style.transform = "translate3d(0, 0, 0)"
    ChangeClass(prevContainer, nextContainer)
  }
})

function changeDimension() {

  if ((transformation === "" || transformation === "translate3d(0px, 0px, 0px)")
  && clientW < 915) {
    lessonsContainer.style.transform = "translate3d(-33.34%, 0, 0)"
    prevContainer.classList.add("active")
    
  } else if (clientW < 915) {
    lessonsContainer.style.transform = "translate3d(-66.68%, 0, 0)"
    ChangeClass(nextContainer, prevContainer)

  } else if (clientW > 915) {
    lessonsContainer.style.transform = "translate3d(-33.34%, 0, 0)"
    ChangeClass(nextContainer, prevContainer)
  }
}

function ChangeClass(elementToremove, elementToAdd) {
  elementToremove.classList.remove("active")
  elementToAdd.classList.add("active")
}

function changeDirection() {
  if ((transformation === "" || transformation === "translate3d(0px, 0px, 0px)")) return
  
  if (transformation === "translate3d(-66.68%, 0px, 0px)") {
    lessonsContainer.style.transform = "translate3d(-33.34%, 0, 0)"
  } else if ((transformation !== "" || transformation !== "translate3d(0px, 0px, 0px)") && clientW < 915) {
    nextContainer.classList.add("active")
  } else if ((transformation !== "" || transformation !== "translate3d(0px, 0px, 0px)") && clientW > 915) {
    ChangeClass(nextContainer, prevContainer)
  } else if (clientW < 915) {
    ChangeClass(nextContainer, prevContainer)
  }
}

new ResizeObserver(Debounce(entries => {
  transformation = lessonsContainer.style.transform

  if ((clientW > 915 && entries[0].contentRect.width < 915) || 
  (clientW < 915 && entries[0].contentRect.width > 915)) {
    clientW = entries[0].contentRect.width
    changeDirection()
  }
}, 300)).observe(document.body)

function Debounce(fn, delay) {
    let timer = 0;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    }
  }
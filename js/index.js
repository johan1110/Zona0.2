let elLest = document.querySelector(".films__card-wrapper")
let elTemplate = document.querySelector("#template").content
let elForm = document.querySelector(".form")
let elFormSelekt = elForm.querySelector(".films__select")
let elFormFilter = elForm.querySelector(".films__filter")
let elFormInput = elForm.querySelector(".films__input-serach")
let elModal = document.querySelector(".modal")
let modalClosBtn = elModal.querySelector(".modal__close-btn")


window.addEventListener("click", e => {
    if(e.target == elModal){
        elModal.classList.remove("modal-active")
        document.body.style.overflow = "auto"  
    }
})


modalClosBtn.addEventListener("click", () => {
    elModal.classList.remove("modal-active")

    document.body.style.overflow = "auto"
})


function uniqueSelektFilm(arr, List) {
    let result = []
    arr.forEach(item => {
        item.genres.forEach(gener => {
            if (!result.includes(gener)) {
                result.push(gener)
            }
        })
    })

    result.forEach(element => {
        let newOption = document.createElement("option")
        newOption.textContent = element
        newOption.value = element

        List.appendChild(newOption)
    })
}

uniqueSelektFilm(films, elFormSelekt)


elForm.addEventListener("submit", e => {
    e.preventDefault()

    let inputValue = elFormInput.value.trim()

    let regex = new RegExp(inputValue, "gi")

    let filtiredArr = films.filter(item => item.title.match(regex))

    let filtiredFilm = []

    if (elFormSelekt.value.trim() == "All") {
        filtiredFilm = filtiredArr
    } else {
        filtiredFilm = filtiredArr.filter(item => item.genres.includes(elFormSelekt.value.trim()))
    }

    renderArr(filtiredFilm, elLest)
})


function renderArr(arr, List) {
    List.innerHTML = null
    arr.forEach(item => {
        let cloneTemplete = elTemplate.cloneNode(true)
        let filmsImg = cloneTemplete.querySelector(".films__img")
        let filmTitel = cloneTemplete.querySelector(".films__card-title")
        let relisDate = cloneTemplete.querySelector(".films__release-date")
        let filmBtn = cloneTemplete.querySelector(".films__btn")
        filmBtn.dataset.id = item.id

        filmBtn.addEventListener("click", e => {
            elModal.classList.add("modal-active")
            let filmId = e.target.dataset.id
            let modalImg = elModal.querySelector(".modal__img")
            let modalTitel = elModal.querySelector(".modal__title")
            let modalDescripton = elModal.querySelector(".modal__description")
            let modalGeners = elModal.querySelector(".genre__list")

            document.body.style.overflow = "hidden"


            modalGeners.innerHTML = null
            if (filmId == item.id) {
                modalImg.src = item.poster
                modalTitel.textContent = item.title
                modalDescripton.textContent = item.overview

                item.genres.map(g => {
                    let newLi = document.createElement("li")
                    newLi.textContent = g

                    modalGeners.appendChild(newLi)
                })
            }
        })




        filmsImg.src = item.poster
        relisDate.textContent = sortedDate(item.release_date)
        filmTitel.textContent = item.title
        List.appendChild(cloneTemplete)
    })
}

renderArr(films, elLest)
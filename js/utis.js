function sortedDate(date){
    let time = new Date (date)
    

    let dey = time.getDate()
    let month = time.getMonth() + 1
    let getYear = time.getFullYear()

    return dey + ".0" + month + "." + getYear
}
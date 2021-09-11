export const formatTodayDate = () => {
    let todayDate = new Date().toISOString().slice(0, 10)
    todayDate = todayDate.replace(/#|-/g,'').toString()
    return todayDate
}

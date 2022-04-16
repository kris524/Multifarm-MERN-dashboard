Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

Date.prototype.backMonth = function (months) {
    var date = new Date(this.valueOf());
    date.setMonth(date.getMonth() - months);
    return date;
}

function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date(currentDate));
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}

////////////////////////////////////////////////////////////
const xAxis = getDates((new Date()).backMonth(1), new Date());  //32

let converted_xAxis = []

console.log(xAxis.length)
for (let i = 0; i < xAxis.length; i++) {
    let a = xAxis[i].toLocaleDateString()
    // console.log(a)
    converted_xAxis.push(a)
}
// console.log(converted_xAxis)

module.exports = converted_xAxis
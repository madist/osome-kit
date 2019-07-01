String.prototype.toNumber = function () {
    return Number(this)
}
Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};
Number.prototype.toNumber = function () {
    return this
}
Number.prototype.pad = function (len) {
    let s = this.toString();
    if (s.length < len) {
        s = ('0000000000' + s).slice(-len);
    }
    return s;
}
String.prototype.numOfPercent = function () {
    return Number(this.replace('%', ''))
}
String.prototype.numOfPixel = function () {
    return Number(this.replace('px', ''))
}
HTMLElement.prototype.remove = function () {
    this.parentNode.removeChild(this)
    return this
}
Date.prototype.getPrevMonth = function () {
    let prevMonth = new Date()
    prevMonth.setDate(1)
    prevMonth.setFullYear(this.getFullYear())
    prevMonth.setMonth(this.getMonth() - 1)
    return prevMonth
}
Date.prototype.getNextMonth = function () {
    let nextMonth = new Date()
    nextMonth.setDate(1)
    nextMonth.setFullYear(this.getFullYear())
    nextMonth.setMonth(this.getMonth() + 1)
    return nextMonth
}
Date.prototype.getLastDate = function () {
    let nextMonth = new Date()
    nextMonth.setDate(1)
    nextMonth.setFullYear(this.getFullYear())
    nextMonth.setMonth(this.getMonth() + 1)
    nextMonth.setDate(0)
    return nextMonth.getDate()
}
Date.prototype.startOfDay = function () {
    let copyMonth = new Date()
    copyMonth.setDate(1)
    copyMonth.setFullYear(this.getFullYear())
    copyMonth.setMonth(this.getMonth())
    return copyMonth.getDay()
}
Date.prototype.endOfDay = function () {
    let copyMonth = new Date()
    copyMonth.setDate(1)
    copyMonth.setFullYear(this.getFullYear())
    copyMonth.setMonth(this.getMonth() + 1)
    copyMonth.setDate(0)
    return copyMonth.getDay()
}

const utils = {
    convertGanttNumberToDate: (startNumber, endNumber, eNum) => {
        let startNum = Math.max(startNumber + 1, 1)
        let endNum = Math.min(endNumber + 1, eNum)

        return { startNum: startNum, endNum: endNum }
    },
    convertDateToGanttNumber: (sDate, eDate, currentYear, indexOfCurrentMonth, eNum) => {

        let _startDate = new Date(sDate)
        let _endDate = new Date(eDate)
        let firstTileDate = 1
        let firstTileMonth = indexOfCurrentMonth + 1
        let firstTileYear = currentYear

        let startYear = _startDate.getFullYear()
        let endYear = _endDate.getFullYear()
        let startMonth = _startDate.getMonth() + 1
        let endMonth = _endDate.getMonth() + 1
        let startDate = _startDate.getDate()
        let endDate = _endDate.getDate()
        let startNum = 1
        let endNum = eNum

        let firstTileValue = firstTileYear * 10000 + firstTileMonth * 100 + firstTileDate
        let startDateValue = startYear * 10000 + startMonth * 100 + startDate
        let endDateValue = endYear * 10000 + endMonth * 100 + endDate
        let endTileValue = currentYear * 10000 + (indexOfCurrentMonth+1) * 100 + eNum

        if (startDateValue > endTileValue) {
            return
        }
        if (endDateValue < firstTileValue) {
            return
        }
        if (startDateValue > firstTileValue && startDateValue < endTileValue) {
            startNum = startDate 
        }
        if (endDateValue > firstTileValue && endDateValue < endTileValue) {
            
            endNum = Math.min(endDate, endNum)
        }
        return { startNum: startNum, endNum: endNum }
    },
    convertDateToNumber: (sDate, eDate, currentYear, indexOfCurrentMonth, startOfDay, firstTile, endOfMonthDate, eNum) => {
        let _startDate = new Date(sDate)
        let _endDate = new Date(eDate)
        let firstTileDate = firstTile.getAttribute('date').toNumber()
        let firstTileMonth = firstTile.getAttribute('month').toNumber()
        let firstTileYear = firstTile.getAttribute('year').toNumber()

        let startYear = _startDate.getFullYear()
        let endYear = _endDate.getFullYear()
        let startMonth = _startDate.getMonth() + 1
        let endMonth = _endDate.getMonth() + 1
        let startDate = _startDate.getDate()
        let endDate = _endDate.getDate()

        let startNum = 0
        let endNum = eNum

        let firstTileValue = firstTileYear * 10000 + firstTileMonth * 100 + firstTileDate
        let startDateValue = startYear * 10000 + startMonth * 100 + startDate
        let endDateValue = endYear * 10000 + endMonth * 100 + endDate
        let endTileValue = currentYear * 10000 + (indexOfCurrentMonth+1) * 100 + endOfMonthDate

        if (startDateValue > endTileValue) {
            return
        }
        if (endDateValue < firstTileValue) {
            return
        }
        if (startDateValue > firstTileValue && startDateValue < endTileValue) {
            startNum = startOfDay + startDate - 1
        }
        if (endDateValue > firstTileValue && endDateValue < endTileValue) {
            
            endNum = Math.min(Number(startOfDay) + endDate - 1, endNum)
        }
        return { startNum: startNum, endNum: endNum }
    }
}

export default utils
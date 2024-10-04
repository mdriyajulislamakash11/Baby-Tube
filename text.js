function getTimingStart(time) {
    const hours = parseInt(time / 3600);
    const remainingSecond = parseInt(time % 3600);
    const minute = parseInt(remainingSecond / 60);
    const second = remainingSecond % 60;
    return `${hours} hours ${minute} minute ${second} second ago`
}

console.log(getTimingStart(44584444))
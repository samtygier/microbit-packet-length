input.onButtonPressed(Button.A, function () {
    radio.sendString("abcdefghijklmnopqrstuvwxyz")
})
radio.onReceivedString(function (receivedString) {
    basic.showString("" + (receivedString.length))
})

input.onButtonPressed(Button.B, function () {
    let buf = Buffer.pack("hhhhhhhhhhhh",
        [1,2,3,4,5,6,7,8,9,10,11,12]);
    radio.sendBuffer(buf)
})
radio.onReceivedBuffer(function (receivedBuf) {
    let arr = receivedBuf.unpack("hhhhhhhhhhhh", 0);
    arr = arr.filter((x) => x>0)
    serial.writeLine(receivedBuf.toHex())
    let out = ""
    for (let a of arr) {out += `${a}, `}
    serial.writeLine(out)
    basic.showString("" + (arr.length))
})

radio.setGroup(1)

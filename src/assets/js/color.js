
const AvatarColors = ['#8C8DFF', '#7983C2', '#6D8DDE', '#5979F0', '#6695DF', '#8F7AC5', '#9D77A5', '#8A64D0', '#AA66C3', '#A75C96', '#C8697D', '#B74D62', '#BD637C', '#B3798E', '#9B6D77', '#B87F7F', '#C5595A', '#AA4848', '#B0665E', '#B76753', '#BB5334', '#C97B46', '#BE6C2C', '#CB7F40', '#A47758', '#B69370', '#A49373', '#AA8A46', '#AA8220', '#76A048', '#9CAD23', '#A19431', '#AA9100', '#A09555', '#C49B4B', '#5FB05F', '#6AB48F', '#71B15C', '#B3B357', '#A3B561', '#909F45', '#93B289', '#3D98D0', '#429AB6', '#4EABAA', '#6BC0CE', '#64B5D9', '#3E9CCB', '#2887C4', '#52A98B']

function uuidHashCode(name) {
    let components = name.split('-')
    if (components.length !== 5) { return 0 }
    let mostSigBits = `${components[0]}${components[1]}${components[2]}`
    let leastSigBits = `${components[3]}${components[4]}`
    let hilo = bytesToHex(bytesXor(hexToBytes64(mostSigBits), hexToBytes64(leastSigBits)))
    let p1 = hexToBytes(hilo.substr(0, 8))
    let p2 = hexToBytes(hilo.substr(8, 16))
    return parseInt(bytesToHex(bytesXor(p1, p2)), 16)
}

function hexToBytes(hex) {
    const bytes = []
    for (let c = 0; c < hex.length; c += 2) {
        bytes.push(parseInt(hex.substr(c, 2), 16))
    }
    return bytes
}
function bytesToHex(bytes) {
    for (var hex = [], i = 0; i < bytes.length; i++) {
        var current = bytes[i] < 0 ? bytes[i] + 256 : bytes[i]
        hex.push((current >>> 4).toString(16))
        hex.push((current & 0xF).toString(16))
    }
    return hex.join('')
}

function hexToBytes64(hex) {
    const bytes = []
    for (let c = 0; c < 16; c += 2) {
        if (c < hex.length) {
            bytes.push(parseInt(hex.substr(c, 2), 16))
        } else {
            bytes.push(0)
        }
    }
    return bytes
}

function bytesXor(a, b) {
    const r = []
    for (let c = 0; c < a.length; c++) {
        r[c] = a[c] ^ b[c]
    }
    return r
}


function getAvatarColorById(id) {
    return AvatarColors[Math.abs(uuidHashCode(id)) % AvatarColors.length]
}

export { getAvatarColorById }
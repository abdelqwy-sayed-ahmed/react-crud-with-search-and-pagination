let lastId = Math.floor(Math.random() * (1000000 - 0 + 1000000)) + 1000000;
export default function() {
    lastId++;
    return `${lastId}`;
}


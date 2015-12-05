
function start(){
    const proxy = new Proxy({}, {
        get(target, property) {
            return 35;
        }
    });
    console.log(proxy.name);
    console.log(proxy.age);
}

export default { start }

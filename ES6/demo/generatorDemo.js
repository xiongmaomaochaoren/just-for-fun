
function start(){
    function *helloGenerator(){
        yield "hello";
        yield "world"
        return "byeby";
    }

    let helloFn = helloGenerator();
    console.log(`${helloFn.next().value} ${helloFn.next().value}`);
}

export default { start }

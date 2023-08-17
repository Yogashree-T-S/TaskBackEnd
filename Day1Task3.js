import React from 'react';

function Task3(){
    const num1ref=React.createRef();
    const num2ref=React.createRef();
    const res=React.createRef();
    function product(e){
        e.preventDefault();
        res.current.innerText=(parseInt(num1ref.current?.value || 1) * parseInt(num2ref.current?.value || 1));
    }
    return(
    <form onSubmit={product}>
        <h2>Product</h2><br/>
        <b>num1 :</b>
        <input type="number" name="num1" ref={num1ref} style={{margin:"1rem"}}/>
        <b>num2 :</b>
        <input type="number" name="num2" ref={num2ref} style={{margin:"1rem"}}/>
        <b>Result :  </b>
        <span ref={res}></span>
        <button type="submit" name="Submit" style={{margin:"1rem"}}>Submit</button>
    </form>
    )
}
export default Task3;
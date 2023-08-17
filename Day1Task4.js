import React from 'react';
function Task4(){
    const nameref=React.createRef();
    const passwordref=React.createRef();
    function validate(e){
        e.preventDefault();
        if(nameref.current.value.trim()==="" || passwordref.current.value.trim()==="" || passwordref.current.value.trim().length<6)
            alert("Enter valid name and password");
    }
    return (
        <form onSubmit={validate}>
            <h2>Validation</h2><br/>
            <b>name :</b>
            <input type="text" name="name" ref={nameref} style={{margin:"1rem"}}/>
            <b>password :</b>
            <input type="text" name="password" ref={passwordref} style={{margin:"1rem"}}/>
            <button type="submit" style={{margin:"1rem"}}>Submit</button>
        </form>
    )
}
export default Task4;
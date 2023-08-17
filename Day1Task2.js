function Task2(props){
    // let res=props.arr.filter((ele)=>ele%2===0)
    // return <h1>{res}</h1>
    return (
        <ul>
            {props.arr.map(element => {
                if(element%2===0){
                    return <li>{element}</li>
                }
            })}
        </ul>
    )
    
}
export default Task2
import { useRef, useState } from "react";
const Form = (props) =>{

    const ref  = useRef(null)
    //const [error, setError] = useState([])
    
    const HandleSubmit = (e) => {
        //debugger;
        e.preventDefault()
        //call the gateway api
        fileUpload()
        props.filename("")
        e.target[0].value = null

        
    }

    const HandleChange = (e) =>{
        const  file = e.target.files[0].name
        //console.log(file)
        props.filename(file)
    }

   async function fileUpload (){
        try{
            let response = await fetch.post("https://c5548t22l9.execute-api.eu-north-1.amazonaws.com/dev")
            if(response.ok){
                console.log(response)
            }
        }
        catch(err){
            console.log(err)
            //setError(err)
        }
    

   }


    return(
        <form onSubmit={HandleSubmit} >
           
            <p>
                <input type="file" ref={ref} onChange={HandleChange}/>
            </p>
            <button >SUBMIT</button>
        </form>
    )
    
}
    

export default Form

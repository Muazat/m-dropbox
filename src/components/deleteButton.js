import axios from "axios"
import { useEffect, useState } from "react"

const Button = (props) => {
    const [response, setResponse] = useState("")
    //console.log(`username is ${props.username}`)
    const HandleClick = async (e) => {
        try{
            console.log("delete function")
            let res = axios.delete(`https://pimvhp4mb5.execute-api.eu-north-1.amazonaws.com/dev/savedfiles/?username=${props.username}&filename=${props.filename}`)

            if (res.ok) {
                setResponse("File sucessfully deleted")
                console.log(res)
            } else {
                console.log(res)
                setResponse("File no deleted")
            }
        }catch (err) {
            console.log(err)
        }
    }

    return (
        <button onClick={HandleClick}>Delete</button>
    )    

}
export default Button
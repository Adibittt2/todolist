import React from "react";
import { useState ,useEffect} from "react";
// import {List} from "./list";
import "./style.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';



const storageFun = ()=>{

    return(
        JSON.parse(localStorage.getItem("key"))
    )
};

const Home = ()=>{

const [inputs,setInput] = useState("");
const [data,setData] = useState(storageFun());
const [editData,setEditData] = useState("");

// second method also works but for learning new thing storageFun() is created outside Home

// const [data,setData] = useState(JSON.parse(localStorage.getItem("key")));


useEffect(()=>{

    localStorage.setItem("key",JSON.stringify(data))
    
},[data])



const deleteFun = (ind)=>{

  const del=  data.filter((ele)=>{

        return (
            ele.id !== ind
        )
    })

    setData(del);
}

const deleteAll = ()=>{

    setData([]);
}


const edit = (index)=>{

    const editElement = data.find((ele)=>{
  
        return(ele.id === index);
      
    })
    // yaha par editElement complete Object( both id and name) show karega na ki return value because of index parameter.
    // edit() ye fun jahan v call hua h wahi pe return value dega it means ele.id;

// console.log(editElement)

    setInput(editElement.name);

    setEditData(index);

}

return(

<>

<div className="container-fluid bg-success d-flex align-items-center justify-content-center" style={{height:"100vh"}}>

<div className="container rounded border border-white" style={{backgroundColor:"#41054c"}}>

    <div className="row justify-content-center">
        <div className="col-md-4 text-white"> <h1>This is home page</h1>
        </div>
       </div>

<div className="row justify-content-center"> 

<div className="col-lg-5">

<InputGroup className="mb-3">
        <Form.Control
        //   placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          type="text" placeholder="Enter here" value = {inputs} onChange={(e)=>{setInput(e.target.value)}}
        />
        <Button className="btn btn-info mx-2 w-20" variant="outline-secondary" id="button-addon2" 
        
        onClick={()=>{

            const obj = {
                id:new Date().getTime().toString(),
                name:inputs
                        }
            
                        if(obj.name !== ""){
                if(editData !== ""){
            
                    const abc = data.map((ele)=>{
            
                        if(ele.id === editData){
            
                            return ({...ele,name:inputs})
                            // return {id:editData,name:inputs}
                        }
                        else{
                            return ele;
                        }
                    })
            
                    setData(abc);
            
                    
                }
                else if(editData === ""){
                   
                     setData([obj,...data])
                     setInput("");
                }
            }
            else{
                alert("Empty not allowed");
            }
             
            }}
            >
          Enter
        </Button>

        <Button  className="btn btn-danger mx-2" onClick={deleteAll}>Delete All</Button>

      </InputGroup>
      
      </div>
</div>


<div className="row justify-content-center">

    <div className="col-lg-4 text-center">
<ol>
    {data.map((ele)=>{

        return(
            <>
            <div className="bg-success rounded" style = {{display:"flex",backgroundColor:"grey",margin:"1px",color:"white"}}>
            <li className="pt-2" style={{width:"200px"}}>{ele.name}</li>

            <Button className="btn btn-warning m-1" onClick={()=>{
                edit(ele.id)
            }}>Edit</Button>
            <Button className="btn btn-danger m-1" onClick={()=>{
                deleteFun(ele.id)
            }}>Delete</Button>
            </div>
           </>
    
        )
    })}

    </ol>

    </div>
    </div>

</div>
</div>
</>

)

}
export {Home};

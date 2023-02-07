import React,{useState} from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios'
const style={
    section:{
        marginLeft:'30%',
        marginRight:'30%',
        marginTop:'40px',
        backgroundColor:'lightgray ',
        paddingTop:'20px',
        paddingBottom:'20px',
        paddingRight:'70px',
        paddingLeft:'70px',
        borderRadius:'5px',
        boxShadow: '5px 10px gray'
    },
    labelSetUp:{
        margin:'5px',
        marginLeft:'10px',
        color:'red'
    },
    btn:{
        marginLeft:'40%', 
        marginTop:'10px',
        backgroundColor: '#008CBA',
        paddingTop:'15px',
        paddingBottom:'15px',
        paddingRight:'19px',
        paddingLeft:'19px',
        color:'white'
    },
}
function SignIn() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const[user,setUser] = useState({
        email:"",
        password:"",
     })
     const handleChange =e=>{
         const{name,value}=e.target;
         setUser({
           ...user,
           [name]:value  
         })
     }
     const navigate=useNavigate()
     const onSubmit=async()=>{
        await axios.post(`http://localhost:8000/api/v1/user/signin`,  user )
        .then(res => {
        console.log(res);
        console.log(res.data);
        localStorage.setItem('token',res.data.token)
        localStorage.setItem('token',res.data.user)
        navigate("/dashboard")  
        })  
     }
    //  value={user.email}
  return (
    <div style={style.section}>
        <h1 style={{textAlign:"center"}}>Sign In</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Field>
                    <label>Email</label>
                    <input placeholder='email' type="text" {...register("email",{required:{value:true,message:'Mandatory field'}})}  onChange={handleChange} />
                    <label style={{color:"red"}}>{errors?.email?.message}</label>
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input placeholder='password' type="text" {...register("password",{required:{value:true,message:'Mandatory field'}})}  onChange={handleChange} />
                    <label style={{color:"red"}}>{errors?.password?.message}</label>
                </Form.Field>
               
                <Button  type='submit' style={style.btn} >Submit</Button>
            </Form>
        </div>
  );
}

export default SignIn;

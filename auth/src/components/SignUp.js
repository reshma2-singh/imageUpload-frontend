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
   background:{
backgroundColor:'lightgray '
   }
}
function SignUp() {
    const { register,handleSubmit, formState: { errors } } = useForm();
    const[user,setUser] = useState({name:"",email:"",password:"",confirmPassword:""})    
  const handleChange=e=>{
   const{name,value}=e.target;
   console.log(name,value)
   setUser({
    ...user,[name]:value
   })

  }
  const navigate=useNavigate()
const onSubmit=async()=>{

   
   await axios.post(`http://localhost:8000/api/v1/user/signup`,  user )
    .then(res => {
    console.log(res);
    console.log(res.data);
    localStorage.setItem('token',res.data.token)
    localStorage.setItem('token',res.data.user)
    navigate("/dashboard")  
    })   
} 
  return (
    <div style={style.section}>
        <h1 style={{textAlign:"center"}}>Sign Up</h1>
            <Form  onSubmit={handleSubmit(onSubmit)}>
                <Form.Field>
                    <label>Name</label>
                    <input placeholder='Name'  {...register('name',{required:{value:true,message:"Mandatory field"}})} type="text" onChange={handleChange} />
                    <label style={{color:"red"}} >{errors?.name?.message}</label>
                </Form.Field>
         <Form.Field>
                    <label>Email</label>
                    <input placeholder='Email'  {...register('email',{required:{value:true,message:"Mandatory field"}})}  type="text" onChange={handleChange}/>
                    <label style={{color:"red"}} >{errors?.email?.message}</label>
                </Form.Field>  
               <Form.Field>
                    <label>Password</label>
                    <input placeholder='Password' {...register('password',{required:{value:true,message:"Mandatory field"}})}  type="text" onChange={handleChange}/>
                    <label style={{color:"red"}} >{errors?.password?.message}</label>
                </Form.Field>
                <Form.Field>
                    <label>Confirm Password</label>
                    <input placeholder='Confirm Password'  {...register('confirmPassword',{required:{value:true,message:"Mandatory field"}})}  type="text" onChange={handleChange}/>
                    <label style={{color:"red"}} >{errors?.confirmPassword?.message}</label>
                </Form.Field>  
            
                <Button type='submit' style={style.btn} >Submit</Button>
            </Form>
        </div>
  );
}

export default SignUp;

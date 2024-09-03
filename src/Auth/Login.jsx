
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Form, Input } from 'antd';


const LoginFunction = () => {
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState(false);

  // To disable submit button at the beginning.
  useEffect(() => {
    setClientReady(true);
  }, []);
  const onFinish = (values) => {
    console.log('Finish:', values);
  };
  
  return (
    <div className="rectangle">
   
      <img className="studentgirl " src="./src/assets/student.png"/>
      <img className="leaves " src="./src/assets/leaves.png"/>
       <img className="green-background  " src="./src/assets/gif.gif"/>
       <h1 className="logintext">Sign in  </h1>
       <h1 className="logintext2">Explore more manuscript </h1>
       <img className="logorstree" src="./src/assets/LogoResearchTree.png"/>
      
       <Form
       
       style={{position: 'absolute', left: '50px', top: '300px', display: 'block',  }}
       form={form} 
       name="horizontal_login" 
       layout="inline" 
       onFinish={onFinish}>
      
      <Form.Item
        
        style={{height: '66px'}}
        name="username"
        rules={[
          {
            required: true,
            message: '',
          },
        ]}
      >
        <Input prefix={<UserOutlined />} className='Username' placeholder="Username" />
      </Form.Item>
      <Form.Item

        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input prefix={<LockOutlined />} className='Username' type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item shouldUpdate>
        {() => (
          <Button
            style={{width: '104px', height: '52px', marginLeft:'130px' ,marginTop: '12px', border: 'none', background: '#0BF677', borderRadius: '20px'}}
         
            htmlType="submit"
            disabled={
              !clientReady ||
              !form.isFieldsTouched(true) ||
              !!form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            <span style={{color: 'white', fontSize: '16px', fontWeight: 'bolder'}}>
            Login
            </span>
           
          </Button>
        )}
      </Form.Item>
    </Form>
     
     
     <h1 className="Register"><span className="text1">Don’t have an Account?</span> <Link to="/Register" className="text2">Sign up here</Link></h1>
    </div>
  )
}

export default LoginFunction
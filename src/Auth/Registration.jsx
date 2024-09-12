
import React, { useEffect, useState } from 'react';
import './register.css';

import Course from './Course'

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Form, Input, Alert, Typography } from 'antd';


const LoginFunction = () => {
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState(false);

  // To disable submit button at the beginning. test
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
       <h1 className="logintext">REGISTER AS <span className="text-[#0BF677]">STUDENT</span>  </h1>
       <h1 className="logintext2">Fill in the details to create your account.
       </h1>
       <img className="logorstree" src="./src/assets/LogoResearchTree.png"/>
      
       <Form
      
      form={form}
      name="dependencies"
      autoComplete="off"
      style={{
        maxWidth: '364px',
        marginTop: '-400px',
        marginLeft: '56px',
      }}
      layout="vertical"
    >
      <Form.Item
        
        style={{height: '46px'}}
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
          },
        ]}
      >
        <Input prefix={<LockOutlined />}  className='Password' placeholder="Password"/>
      </Form.Item>

      {/* Field */}
      <Form.Item
      
        name="Confirm password"
        dependencies={['password']}
        rules={[
          {
            required: true,
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input  prefix={<LockOutlined />} className='Retype-Password'placeholder="Re-type your password" />
      </Form.Item>
      <Course />
   
    </Form>



     <h1 className="Register"><span className="text1">Don’t have an Account?</span> <span className="text2">Sign up here</span></h1>
    </div>
  )
}

export default LoginFunction
import React, {useState, useContext, useReducer} from 'react'
import {useHistory, Link} from 'react-router-dom'
import {Card,Form, Button, Container, Row, Col, Alert} from "react-bootstrap";
import {userContext} from '../context/context'
import axios from 'axios';
import {BsArrowRepeat} from 'react-icons/bs'
import Error from '../component/Error'


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  const history = useHistory()
  // const {dispatch} = useReducer()
  const {state,dispatch} = useContext(userContext);
  const {user} = state
  const validateInput =() =>{
      return email.length>0 && password.length>0
  }
  
  const handleSubmit = async(e) =>{
      e.preventDefault()
      try{
          setLoading(true)
          const formValues ={
              email,
              password
          }
          const config = {
              headers:{
                  'Content-Type':'application/json'
              }
          }
          const {data} = await axios.post('/users/login',formValues, config)
          console.log("Form input:", formValues)
          console.log('Data from server', data)
          dispatch({
            type:'LOGIN',
            payload:data
          })
          history.push('/')
        } catch(err){
          err.response.data.msg && setError(err.response.data.msg);
          setLoading(false)
          console.log('Error:',error)
        }
      }
      console.log('From userContext',user)

    return (
    <Container className="mt-3" >
     <Row className='justify-content-center align-items-center' style={{minHeight:"50vh"}}>
      <Col xs={8} md={5} >
        <Card>
          <Card.Body className='mb-4'>
            <h2 className='text-center my-4'>LOGIN</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group size="lg" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  autoFocus
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="password" >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button block size="lg" type="submit" className='my-4' disabled={!validateInput()}>
                <BsArrowRepeat className={loading ? 'loading' : 'hide'}/>Login
              </Button>
            </Form>
            <h4 className='text-center'>Are you a new customer? </h4>
            
              <h5 className='text-center'><Link to='register' >Register</Link></h5>
           
          </Card.Body>
        </Card>
      </Col>
      </Row>
    </Container>
       
    )
}

export default Login

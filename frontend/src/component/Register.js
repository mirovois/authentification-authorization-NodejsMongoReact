import React, {useState, useContext, useReducer} from 'react'
import {useHistory, Link} from 'react-router-dom'
import {Card,Form, Button, Container, Row, Col, Alert} from "react-bootstrap";
import {UserContext} from '../context/context'
import axios from 'axios';
import {BsArrowRepeat} from 'react-icons/bs'


const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  const history = useHistory()
  const {state,dispatch} = useContext(UserContext);
  const {user} = state

  const validateInput =() =>{
      return email.length>0 && password.length>0 && passwordConfirm.length>0
  }
  
  const handleSubmit = async(e) =>{
      e.preventDefault()
      if (password !== passwordConfirm) {
        return setError('Passwords do not match!!!')
      }
      try{
          setLoading(true)
          const newUser ={
              email,
              password,
          }
          const {data} = await axios.post('/users',newUser)
          console.log('Data from server', data)
          dispatch({
            type:'REGISTER',
            payload:data
          })
          alert('You have registered to our service!!!')
          history.push('/login')
        } catch(err){
          err.response.data.msg && setError(err.response.data.msg);
          setLoading(false)
          console.log('Error:',error)
        }
      }
      console.log('Register-From userContext',user)

    return (
    <Container className="mt-3" >
     <Row className='justify-content-center align-items-center' style={{minHeight:"50vh"}}>
      <Col xs={8} md={5} >
        <Card>
          <Card.Body className='mb-4'>
            <h2 className='text-center my-4'>Register</h2>
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
              <Form.Group size="lg" controlId="passwordConfirm" >
                <Form.Label>Password confirmation</Form.Label>
                <Form.Control
                  type="password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
              </Form.Group>
              <Button block size="lg" type="submit" className='my-4' disabled={!validateInput()}>
                <BsArrowRepeat className={loading ? 'loading' : 'hide'}/>Sign up
              </Button>
            </Form>
            <h4 className='text-center'>Have you got an account with us? </h4>
            
              <h5 className='text-center'>You can login <Link to='login' >here</Link></h5>
           
          </Card.Body>
        </Card>
      </Col>
      </Row>
    </Container>
       
    )
}

export default Register

import React, { useState, useEffect } from 'react'
import { Card, Alert, Container, Row } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import firebase from '../firebase'
import { v4 as uuidv4 } from 'uuid'
import NavbarComponent from './Dashboard Components/NavbarComponent.jsx'
const Dashboard = () => {
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState('')

  const ref = firebase.firestore().collection('posts')

  //REALTIME GET FUNCTION
  function getSchools() {
    setLoading(true)
    ref.onSnapshot((querySnapshot) => {
      const items = []
      querySnapshot.forEach((doc) => {
        items.push(doc.data())
      })
      setPosts(items)
      setLoading(false)
    })
  }

  useEffect(() => {
    getSchools()
    // eslint-disable-next-line
  }, [])

  // ADD FUNCTION
  function addPost(item) {
    ref
      //.doc() use if for some reason you want that firestore generates the id
      .doc(item.id)
      .set(item)
      .catch((err) => {
        console.error(err)
      })
  }
  const handleLogout = async () => {
    setError('')
    try {
      await logout()
      history.push('/login')
    } catch {
      setError('Failed to logout')
    }
  }
  return (
    <>
      <NavbarComponent handleLogout={handleLogout} />
      <Container className='mt-5'>
        <Row>
          <div className='col-xl-3'>
            <Card>
              <Card.Body>
                <h2 className='text-center mb-4'>Profile</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                <strong>Email:</strong> {currentUser.email}
              </Card.Body>
            </Card>
          </div>
          <div className='col-5'>
            <div className='border rounded p-4'>
              <label className='font-weight-bold'>Add a post!</label>
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                type='text'
                className='form-control '
                placeholder='Enter post message'
              />
              <button
                className='btn btn-success btn-sm'
                onClick={() => addPost({ text, id: uuidv4() })}
              >
                Post!
              </button>
            </div>
            <ul className='mt-4 list-group p-4 border rounded'>
              <h4 className='mb-4'>Posts</h4>
              {posts.map((item) => (
                <div key={item}>
                  <li className='list-group-item'>{item.text}</li>
                </div>
              ))}
            </ul>
          </div>
        </Row>
      </Container>
    </>
  )
}

export default Dashboard

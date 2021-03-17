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
    ref.orderBy('orderNum').onSnapshot((querySnapshot) => {
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

    setText('')
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

  const generateDate = () => {
    const date = new Date()
    return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
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
          <div className='col-xl-7 col-md-12'>
            <h4 className='mb-4'>Chat</h4>
            <ul
              className='list-group p-4 border rounded'
              style={{ height: '60vh', overflow: 'scroll' }}
            >
              {loading && <h4>Loading...</h4>}
              {posts.length === 0 && (
                <div>
                  <h4>No chats yet</h4>
                  <p>Start a conversation!</p>
                </div>
              )}

              {posts
                .map((item, index) =>
                  item.email !== currentUser.email ? (
                    <div key={index}>
                      <li className='list-group-item border-right-0 border-left-0 border-top-0'>
                        <span className='font-weight-bold text-muted'>
                          {item.email.slice(0, item.email.indexOf('@'))}:
                        </span>
                        <span> {item.text}</span>
                        <div
                          className='text-muted'
                          style={{ fontSize: '12px' }}
                        >
                          {item.date}
                        </div>
                      </li>
                    </div>
                  ) : (
                    <div key={index} className='text-primary'>
                      <li className='list-group-item border-right-0 border-left-0 border-top-0 text-right'>
                        <span className='font-weight-bold'>You:</span>
                        <span> {item.text}</span>
                        <div
                          className='text-muted'
                          style={{ fontSize: '12px' }}
                        >
                          {item.date}
                        </div>
                      </li>
                    </div>
                  )
                )
                .reverse()}
            </ul>

            <div className='w-100 mt-2'>
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                type='text'
                className='form-control '
                placeholder='Enter a message'
              />
              <button
                className='btn btn-success btn-sm mt-2 w-100'
                onClick={() =>
                  addPost({
                    text,
                    id: uuidv4(),
                    email: currentUser.email,
                    date: generateDate(),
                    orderNum: posts.length,
                  })
                }
              >
                Send message!
              </button>
            </div>
          </div>
        </Row>
      </Container>
    </>
  )
}

export default Dashboard

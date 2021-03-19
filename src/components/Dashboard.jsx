import React, { useState, useEffect, useRef } from 'react'
import { Card, Alert, Container, Row } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import firebase from '../firebase'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import NavbarComponent from './Dashboard Components/NavbarComponent.jsx'
const Dashboard = () => {
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  const messagesEndRef = useRef(null)

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState('')

  const ref = firebase.firestore().collection('cahts')

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
  function addPost(e) {
    e.preventDefault()
    const id = uuidv4()
    ref
      //.doc() use if for some reason you want that firestore generates the id
      .doc(id)
      .set({
        text,
        id,
        email: currentUser.email,
        orderNum: posts.length,
        time: moment().format('LLL'),
      })
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [posts])

  return (
    <>
      <NavbarComponent handleLogout={handleLogout} />
      <Container
        className='mt-5 bg-white shadow-sm p-5'
        style={{ borderRadius: '15px' }}
      >
        <Row>
          <div className='col-xl-3 col-lg-3 col-sm-12 mx-auto'>
            {/* logged in user */}
            <Card
              className='mb-4'
              style={{ background: '#f3f6fb', borderRadius: '15px' }}
            >
              <Card.Body className='text-center'>
                <span className='lead'>Logged in as</span>
                <div className='text-dark' style={{ fontSize: '25px' }}>
                  {currentUser.email.slice(0, currentUser.email.indexOf('@'))}
                </div>

                {error && <Alert variant='danger'>{error}</Alert>}
              </Card.Body>
            </Card>
          </div>
          {/* right column */}
          <div className='col-xl-9 col-lg-9 col-sm-12 mx-auto col-md-12'>
            {/*  start of chat */}
            <div
              className='p-4 border-0 shadow-sm'
              style={{
                borderTopLeftRadius: '15px',
                height: '60vh',
                overflowX: 'hidden',
                background: '#F3F6FB',
              }}
            >
              {loading && <h4>Loading...</h4>}
              {posts.length === 0 && (
                <div>
                  <h4>No chats yet</h4>
                  <p>Start a conversation!</p>
                </div>
              )}

              {posts.map((item, index) =>
                item.email !== currentUser.email ? (
                  // friends chat
                  <div key={index} className='rounded'>
                    <span className='font-weight-bold text-muted ml-3'>
                      {item.email.slice(0, item.email.indexOf('@'))}:
                    </span>
                    {/* start of text parent */}
                    <div
                      style={{ borderRadius: '15px' }}
                      className='border-0 shadow-sm bg-white py-3 px-4 mt-2'
                    >
                      <span className='text-dark'> {item.text}</span>
                    </div>
                    <div
                      className='text-muted mb-4 ml-3'
                      style={{ fontSize: '12px' }}
                    >
                      {item.time}
                    </div>
                    <div ref={messagesEndRef} />
                  </div>
                ) : (
                  // current user chat
                  <div key={index} className='text-dark'>
                    <div className='font-weight-bold text-right mr-4'>You:</div>

                    {/* text div */}
                    <div
                      style={{ borderRadius: '40px' }}
                      className='border-0 text-center py-3 col-4  ml-auto px-4 bg-primary shadow-sm'
                    >
                      <span className='text-light' style={{ fontSize: '16px' }}>
                        {item.text}
                      </span>
                    </div>
                    <div
                      className='text-muted text-right mr-4 mb-4'
                      style={{ fontSize: '12px' }}
                    >
                      {item.time}
                    </div>

                    {/* this ref is for scroll target */}
                    <div ref={messagesEndRef} />
                  </div>
                )
              )}
            </div>
            {/* form */}
            <div
              style={{ borderRadius: '15px' }}
              className='shadow-sm p-3 d-flex justify-content-around align-items-center mt-4'
            >
              <form onSubmit={addPost} className='col-10'>
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  type='text'
                  className='form-control'
                  placeholder='Enter a message'
                />
              </form>
              <button
                className='btn btn-primary btn-sm col-2'
                onClick={addPost}
              >
                Send!
              </button>
            </div>
          </div>
        </Row>
      </Container>
    </>
  )
}

export default Dashboard

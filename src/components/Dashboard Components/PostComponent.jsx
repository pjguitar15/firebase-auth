import React, { useContext, useState } from 'react'
import { PostData, CurrLoggedIn } from '../../GlobalState'
import { Modal, Button } from 'react-bootstrap'
const PostComponent = () => {
  const [postData, setPostData] = useContext(PostData)
  const [currLoggedIn] = useContext(CurrLoggedIn)
  const [inputValue, setInputValue] = useState('')
  // to grab the comment ID to determine which comment to update
  const [currCommReplyId, setCurrCommReplyId] = useState('')
  const [showAction, setShowAction] = useState(false)
  const [currDeleteUsername, setCurrDeleteUsername] = useState('')
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)

  // handlers likeCount increment
  const niceHandler = (id) => {
    const updatedList = postData.map((item) => {
      if (item.id === id) {
        // lets users only able to hit like once
        const isLiked = item.likes.includes(currLoggedIn.fullname)

        // ternary, if user is on likedUser list, then returns back items without updating anything
        return !isLiked
          ? {
              ...item,
              nice: item.nice + 1,
              likes: [...item.likes, currLoggedIn.fullname],
              isLiked: true,
            }
          : { ...item }
      }
      return item
    })
    setPostData([...updatedList])
  }

  // handlers dislikeCount increment
  const nopeHandler = (id) => {
    const updatedList = postData.map((item) => {
      if (item.id === id) {
        // lets users only able to hit dislike once
        const isDisLiked = item.dislikes.includes(currLoggedIn.fullname)
        // ternary, if user is on dislikedUser list, then returns back items without updating anything
        return !isDisLiked
          ? {
              ...item,
              nope: item.nope + 1,
              dislikes: [...item.dislikes, currLoggedIn.fullname],
              isDisliked: true,
            }
          : { ...item }
      }
      return item
    })
    setPostData([...updatedList])
  }

  const replyCommentHandler = (e) => {
    e.preventDefault()
    postData.map((item) => {
      if (item.id === currCommReplyId) {
        item.comments.push({
          id: Date.now(),
          fullname: currLoggedIn.fullname,
          user: currLoggedIn.username,
          text: inputValue,
          img: currLoggedIn.img,
          likes: [],
          dislikes: [],
          likeCount: 1,
          dislikeCount: 0,
        })
        return item
      }
      return item
    })
    setInputValue('')
    // console.log(test)
    // alert('test')
  }

  // commented out bec, buttons were removed
  // const replyNiceHandler = (id) => {
  //   alert('test')
  // }

  // const replyNopeHandler = (id) => {
  //   alert('test')
  // }

  const showDeleteDialog = (id) => {
    if (currLoggedIn.username === id) {
      setShow(true)
      setCurrDeleteUsername(id)
    } else {
      alert('You can only delete your own posts')
    }
  }

  // delete handler
  const deleteHandler = () => {
    setShow(false)
    const updated = postData.filter(
      (item) => item.username !== currDeleteUsername
    )

    setPostData([...updated])
  }

  // edit handler
  // const editHandler = () => {
  //   alert('edit')
  // }
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Dialog</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
        <Modal.Footer>
          <Button className='btn-sm' variant='danger' onClick={deleteHandler}>
            Delete
          </Button>
          <Button className='btn-sm' variant='secondary' onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      {postData
        .map((item, index) => (
          <div key={index} className='postComponent mt-5'>
            <div className='postParent shadow-sm pr-0'>
              {/* actions dropdown */}
              <div className='col-12 text-right'>
                <i
                  onClick={() => setShowAction(!showAction)}
                  style={{ position: 'relative' }}
                  type='button'
                  className='text-right fas fa-ellipsis-h'
                ></i>

                <ul
                  style={{ display: showAction ? 'block' : 'none' }}
                  className='list-group action-drop-down text-light shadow-sm col-2 p-0 text-center rounded'
                >
                  <li
                    onClick={() => showDeleteDialog(item.username)}
                    className='list-item bg-danger'
                  >
                    Delete
                  </li>
                  {/* <li onClick={editHandler} className='list-item bg-info'>
                    Edit
                  </li> */}
                </ul>
              </div>
              {/* end actions dropdown */}
              <div className='mainPostContent'>
                {/* row */}
                <div className='row d-flex align-items-center'>
                  <div className='postUserImg col-2 p-0'>
                    <div
                      style={{
                        width: '100%',
                        height: '50%',
                      }}
                      className='imgParent'
                    >
                      <img
                        style={{ clipPath: 'circle()', objectFit: 'cover' }}
                        src={item.img}
                        alt='userimg'
                      />
                    </div>
                  </div>
                  <div className='col-10 px-0'>
                    <h5>{item.fullname}</h5>
                    <p className='postText'>{item.text}</p>
                  </div>
                </div>

                {/* end of row */}

                <div className='postInteract'>
                  {/* start of btn div */}
                  <div>
                    <button
                      onClick={() => niceHandler(item.id)}
                      className='likeButton'
                      style={{ color: item.isLiked ? '#1288d6' : '#9da0a1' }}
                    >
                      <i className='fas fa-thumbs-up'></i> nice
                      {item.nice > 0 && item.nice}
                    </button>
                    <button
                      onClick={() => nopeHandler(item.id)}
                      className='likeButton'
                      style={{
                        color: item.isDisliked ? '#DE3E44' : '#9da0a1',
                      }}
                    >
                      <i className='fas fa-thumbs-down'></i> nope
                      {item.nope > 0 && item.nope}
                    </button>
                  </div>
                  {/* End of button div */}

                  {/* form and img start */}
                  <div className='row d-flex align-items-center mt-2 mx-1'>
                    <div className='postUserImg col-1 p-0'>
                      <div
                        style={{
                          width: '80%',
                          height: '80%',
                        }}
                        className='imgParent d-flex justify-content-center'
                      >
                        <img
                          style={{
                            clipPath: 'circle()',
                            objectFit: 'cover',
                            height: '100%',
                          }}
                          src={currLoggedIn.img}
                          alt='userimg'
                        />
                      </div>
                    </div>
                    <div className='col-10 p-0'>
                      <form onSubmit={replyCommentHandler} className=' p-0'>
                        <input
                          onClick={() => setCurrCommReplyId(item.id)}
                          onChange={(e) => setInputValue(e.target.value)}
                          value={inputValue}
                          placeholder='comment'
                          className='commentInput col-8 mt-3'
                          type='text'
                          autoComplete='off'
                        />
                      </form>
                    </div>
                  </div>
                  {/* form and img end */}
                </div>
              </div>
              {item.comments.length > 0 && (
                <hr style={{ height: '0.3px', color: 'lightgrey' }} />
              )}

              {/* comment starts here */}
              {item.comments
                .map((item, index) => (
                  <div
                    key={index}
                    className='commentDiv'
                    style={{ display: 'flex', marginBottom: '20px' }}
                  >
                    <div style={{ width: '5%' }}></div>
                    <div
                      style={{
                        width: '95%',
                        borderLeft: '5px #F2F2F2 solid',
                        paddingLeft: '20px',
                      }}
                      className='mainPostContent'
                    >
                      <div
                        className='row'
                        style={{ display: 'flex', alignItems: 'center' }}
                      >
                        <div className='postUserImg col-1 p-0'>
                          <div className='imgParent'>
                            <img
                              style={{
                                clipPath: 'circle()',
                                objectFit: 'cover',
                              }}
                              src={item.img}
                              alt='userimg'
                            />
                          </div>
                        </div>
                        <div className='col-11 p-0'>
                          <h6>{item.fullname}</h6>
                          <p className='postText'>{item.text}</p>
                        </div>
                      </div>
                      {/* <div>
                        <div className='pt-1'>
                          <button
                            onClick={() => replyNiceHandler(item.id)}
                            className='reply-like-button'
                          >
                            <i className='fas fa-thumbs-up'></i> nice
                            {item.likeCount}
                          </button>
                          <button
                            onClick={() => replyNopeHandler(item.id)}
                            className='reply-like-button'
                          >
                            <i className='fas fa-thumbs-down'></i> nope
                            {item.nope}
                          </button>
                        </div>
                      </div> */}
                    </div>
                  </div>
                ))
                .reverse()}

              {/* comment ends here */}
            </div>
          </div>
        ))
        .reverse()}
    </>
  )
}

export default PostComponent

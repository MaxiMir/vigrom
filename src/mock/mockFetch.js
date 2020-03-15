import article from './json/article.json'
import users from './json/users.json'
import comments from './json/comments.json'


const gerError = (urn) => {
  const date = new Date()
  const timeData = [date.getHours(), date.getMinutes(), date.getSeconds()]
  const currTime = timeData.join(':')

  switch (urn) {
    case '/api/article':
      return `${ currTime } Sorry, article not found...`
    case '/api/comments':
      return `${ currTime } Sorry, comments not found...`
    case '/api/user/login':
      return `${ currTime } Login or password incorrect`
    case '/api/comments/add':
      return `${ currTime } Sorry, can't create new comment`
  }

  return `${ currTime } Something went wrong...`
}

const getArticleHandler = () => article

const registerHandler = data => {
  if (!data) {
    return
  }

  const isValidData = Object.values(data).every(Boolean)

  if (!isValidData) {
    return
  }

  const { userName: name, userEmail: email } = data
  const token = generateToken()

  return { name, email, token }
}

const loginHandler = data => {
  const { userLogin, userPassword } = data
  const userInDb = users[userLogin] || null

  if (!userInDb) {
    return
  }

  const { name, email, password } = userInDb

  if (password !== userPassword) {
    return
  }

  const token = generateToken()
  return { name, email, token }
}

const getComments = () => {
  return comments.all.map(item => {
    const [userName, userComment, commentDate] = item

    return { userName, userComment, commentDate }
  })
}

const createCommentHandler = commentData => {
  const { userName, userComment } = commentData

  if (!userName || !userComment) {
    return
  }

  commentData.commentDate = Date.now()

  return commentData
}

const generateToken = () => (Math.random() * 1e32).toString(36)

const mockFetch = async (urn, data) => {
  let response

  const handlers = {
    '/api/article': getArticleHandler,
    '/api/user/register': registerHandler,
    '/api/user/login': loginHandler,
    '/api/comments': getComments,
    '/api/comments/add': createCommentHandler
  }

  if (urn in handlers) {
    response = !data ? handlers[urn]() : handlers[urn](data)
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!response) {
        const error = gerError(urn)
        reject(error)
      }

      resolve(response)
    }, 1500)
  })
}

export default mockFetch

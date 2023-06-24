// $createdAt
// :
// "2023-06-17T18:32:20.132+00:00"
// $id
// :
// "648dfc33e9eb1a7e04a0"
// $updatedAt
// :
// "2023-06-17T18:32:21.066+00:00"
// email
// :
// "shubhamchopade453@gmail.com"
// emailVerification
// :
// true
// name
// :
// "Shubham Chopade"
// passwordUpdate
// :
// ""
// phone
// :
// ""
// phoneVerification
// :
// false
// prefs
// :
// {username: 'shubs', bio: 'This is a shubs profile', avatar: 'https://www.google.com'}
// registration
// :
// "2023-06-17T18:32:20.132+00:00"
// status
// :
// true

interface auth {
  $id: string
  $collection: string
  $createdAt: string
  $updatedAt: string
  email: string
  emailVerification: boolean
  name: string
  passwordUpdate: string
  phone: string
  phoneVerification: boolean
  prefs: {
    username: string
    bio: string
    avatar: string
  }
  registration: string
  status: boolean
}

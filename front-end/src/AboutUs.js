import { useState, useEffect } from 'react'
import axios from 'axios'
import loadingIcon from './loading.gif'

const AboutUs = () => {
  const [aboutData, setAboutData] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/about`)
      .then(response => {
        setAboutData(response.data)
      })
      .catch(err => {
        setError('Failed to load about us data.')
        console.error(err)
      })
      .finally(() => {
        setLoaded(true)
      })
  }, [])

  if (!loaded) return <img src={loadingIcon} alt="loading" />
  if (error) return <p>{error}</p>

  return (
    <>
      <h1>About Us</h1>
      {aboutData && (
        <>
          <img src={aboutData.imageUrl} alt={aboutData.name} width="300" />
          <h2>{aboutData.name}</h2>
          {aboutData.bio.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </>
      )}
    </>
  )
}

export default AboutUs

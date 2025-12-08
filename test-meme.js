const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')

async function testMemeCreation() {
  const form = new FormData()
  form.append('image', fs.createReadStream('./public/placeholder-meme.jpg'))
  form.append('topText', 'Test Meme')
  form.append('bottomText', 'Created via API')
  form.append('fontColor', '#FF0000')
  form.append('fontSize', '40')
  form.append('encrypt', 'true')
  form.append('creatorId', 'test-user-123')

  try {
    const response = await axios.post('http://localhost:3000/api/meme/create', form, {
      headers: form.getHeaders()
    })
    
    console.log('✅ Meme created successfully!')
    console.log('Response:', response.data)
  } catch (error) {
    console.error('❌ Error creating meme:', error.response?.data || error.message)
  }
}

testMemeCreation()

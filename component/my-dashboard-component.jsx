import { ApiClient } from 'admin-bro'
import { Box } from '@admin-bro/design-system'
import React, { useEffect, useState } from "react";


const api = new ApiClient()

const Dashboard = () => {
  const [data, setData] = useState({})

  useEffect(() => {
    api.getDashboard().then((response) => {
      setData(response.data)
    })
  }, [])

  return (
    <Box variant="grey">
      <Box variant="white">
        <h1>Hello, go to the left side bar for more options</h1>
      </Box>
    </Box>
  )
}

export default Dashboard
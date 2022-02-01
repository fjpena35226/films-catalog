import { useState } from 'react'

const useAlert = () => {
  const [alert, setAlert] = useState({ alertMessage: '', alertColor: '' })
  const { alertMessage, alertColor } = alert
  const alertOpen = alertMessage ? true : false

  const closeAlert = (handleClose) => {
    setAlert({
      alertMessage: undefined,
      alertColor: undefined,
    })

    if(handleClose && typeof handleClose === 'function') handleClose()
  }

  const showAlert = ({ alertMessage, alertColor }) => {
    setAlert({
      alertMessage,
      alertColor,
    })
  }

  return { showAlert, closeAlert, alertOpen, alertMessage, alertColor }
}

export default useAlert

import { Grid } from '@mui/material'

const Layout = ({ children }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  )
}

export default Layout

import { useState } from 'react'
import Head from 'next/head'
import { list as listFilms } from 'actions/filmsActions'
import classNames from 'classnames'
import {
  AppBar,
  Button,
  CircularProgress,
  Divider,
  Grid,
  InputAdornment,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  TextField,
  Toolbar,
} from '@mui/material'

import { getComparator, stableSort } from 'utils/sort'
import SearchIcon from '@mui/icons-material/Search'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import styles from 'styles/Home.module.css'

export default function Home() {
  const [filter, setFilter] = useState({
    filmName: '',
  })
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('episode')

  const handleRequestSort = (evt, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
    handleCloseMenu()
  }

  const [selectedItem, setSelectedItem] = useState()

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleOpenMenu = (evt) => {
    setAnchorEl(evt.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const { isLoading, data: films, error } = listFilms()

  const handleItemSelection = (film) => {
    setSelectedItem({
      ...film,
    })
  }

  const handleChangeFilter = (evt) => {
    const { name, value } = evt.target
    setFilter({
      [name]: value,
    })
    setSelectedItem(undefined)
  }

  let filteredFilms = films?.results
    ? films?.results?.map((film) => ({
        ...film,
        comparableDate: new Date(film.release_date).getTime(),
      }))
    : []

  if (filter.filmName) {
    filteredFilms = films?.results?.filter((film) =>
      film.title.toLowerCase().includes(filter.filmName.toLocaleLowerCase())
    )
  }

  return (
    <>
      <AppBar position='static'>
        <Toolbar variant='dense' className='toolbar'>
          <Button
            className={styles.sortBtn}
            onClick={handleOpenMenu}
            variant='contained'
          >
            Sort by...
          </Button>
          <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
            <MenuList dense sx={{ width: 160 }}>
              <MenuItem className='disabled'>
                <ListItemText>Sort By</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem onClick={(evt) => handleRequestSort(evt, 'episode_id')}>
                <ListItemText className={styles.orderItem}>
                  Episode
                </ListItemText>
                {orderBy === 'episode_id' &&
                  (order === 'asc' ? (
                    <ExpandLessIcon fontSize='small' />
                  ) : (
                    <ExpandMoreIcon fontSize='small' />
                  ))}
              </MenuItem>
              <MenuItem
                onClick={(evt) => handleRequestSort(evt, 'comparableDate')}
              >
                <ListItemText className={styles.orderItem}>Year</ListItemText>
                {orderBy === 'comparableDate' &&
                  (order === 'asc' ? (
                    <ExpandLessIcon fontSize='small' />
                  ) : (
                    <ExpandMoreIcon fontSize='small' />
                  ))}
              </MenuItem>
            </MenuList>
          </Menu>
          <TextField
            name='filmName'
            placeholder='Type to search...'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            variant='outlined'
            fullWidth
            onChange={handleChangeFilter}
          />
        </Toolbar>
      </AppBar>
      <div className={styles.container}>
        <Head>
          <title>Films catalog</title>
        </Head>
        <main className={styles.main}>
          <Grid
            className={styles.contentWrapper}
            container
            justifyContent='center'
            alignItems='self-start'
          >
            <Grid
              item
              xs={12}
              sm={6}
              className={classNames({
                [styles.listWrapper]: true,
                [styles.leftSide]: isLoading,
              })}
            >
              {isLoading ? (
                <CircularProgress />
              ) : (
                <List>
                  {filteredFilms &&
                    stableSort(
                      filteredFilms,
                      getComparator(order, orderBy)
                    )?.map((film, index) => (
                      <div key={`film-${index}`}>
                        <ListItemButton
                          onClick={(evt) => handleItemSelection(film)}
                        >
                          <Grid
                            container
                            justifyContent='space-between'
                            spacing={2}
                          >
                            <Grid item xs={3}>
                              <ListItemText
                                className={styles.filmEpisode}
                                primary={`episode ${film.episode_id}`}
                              />
                            </Grid>
                            <Grid item xs={7}>
                              <ListItemText primary={film.title} />
                            </Grid>
                            <Grid item xs={2}>
                              <ListItemText primary={film.release_date} />
                            </Grid>
                          </Grid>
                        </ListItemButton>
                        <Divider />
                      </div>
                    ))}
                </List>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              container
              justifyContent='center'
              alignItems='center'
              className={classNames({
                [styles.rightSide]: selectedItem ? false : true,
              })}
            >
              {selectedItem ? (
                <div className={styles.filmData}>
                  <h3> {selectedItem.title || ''} </h3>
                  <p> {selectedItem.opening_crawl || ''} </p>
                  <p> Directed by: {selectedItem.director || ''} </p>
                </div>
              ) : (
                'No movie selected'
              )}
            </Grid>
          </Grid>
        </main>
      </div>
    </>
  )
}

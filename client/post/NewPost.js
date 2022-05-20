import React, {useState, useEffect} from 'react'
import auth from './../auth/auth-helper'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Icon from '@material-ui/core/Icon'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import {create} from './api-post.js'
import IconButton from '@material-ui/core/IconButton'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tags from './Tags'
import fork from './../assets/images/fork.png'




const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#efefef',
    padding: `${theme.spacing(3)}px 0px 1px`
  },
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginBottom: theme.spacing(3),
    backgroundColor: 'rgba(65, 150, 136, 0.09)',
    boxShadow: 'none'
  },
  cardContent: {
    backgroundColor: 'white',
    paddingTop: 0,
    paddingBottom: 0
  },
  cardHeader: {
    paddingTop: 8,
    paddingBottom: 8
  },
  photoButton: {
    height: 30,
    marginBottom: 5
  },
  input: {
    display: 'none',
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: '90%'
  },
  center: {
    textAlign: 'center',
    display: 'block',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    width: '100%'
  },
  checkbox: {
    marginLeft: theme.spacing(2)
  },
  submit: {
    margin: theme.spacing(2)
  },
  filename:{
    verticalAlign: 'super'
  }
}))

export default function NewPost (props) {
  const classes = useStyles()
  const [values, setValues] = useState({
    text: '',
    photo: '',
    altText: '',
    error: '',
    location: '',
    user: {}
  })
  const jwt = auth.isAuthenticated()
  useEffect(() => {
    setValues({...values, user: auth.isAuthenticated().user})
  }, [])

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const clickPost = () => {
    let postData = new FormData()
    postData.append('text', values.text)
    postData.append('photo', values.photo)
    postData.append('altText', values.altText)
    postData.append('location', values.location)
    create({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, postData).then((data) => {
      if (data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, text:'', photo: '', altText: '', location: ''})
        props.addUpdate(data)
      }
    })
    setOpen(false);
  }

  const clickPostSkip = () => {
    let postData = new FormData()
    postData.append('text', values.text)
    postData.append('photo', values.photo)
    create({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, postData).then((data) => {
      if (data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, text:'', photo: '', altText: '', location: ''})
        props.addUpdate(data)
      }
    })
    setOpen(false);
  }

  const handleChange = name => event => {
    const value = name === 'photo'
      ? event.target.files[0]
      : event.target.value
    setValues({...values, [name]: value })
    // handleClickOpen()
  }
  const photoURL = values.user._id ?'/api/users/photo/'+ values.user._id : '/api/users/defaultphoto'
    return (<div className={classes.root}>
      <Card className={classes.card}>
      <CardHeader
            avatar={
              <Avatar src={photoURL}/>
            }
            title={values.user.name}
            className={classes.cardHeader}
          />
      <CardContent className={classes.cardContent}>
        <TextField
            placeholder="Write a caption..."
            multiline
            rows="3"
            value={values.text}
            onChange={handleChange('text')}
            className={classes.textField}
            margin="normal"
        />
        <input accept="image/*" onChange={handleChange('photo')} className={classes.input} id="icon-button-file" type="file" />
        <label htmlFor="icon-button-file">
          <IconButton color="secondary" className={classes.photoButton} component="span">
            <PhotoCamera />
            <Typography> Upload Image</Typography>
          </IconButton>
        </label> <span className={classes.filename}>{values.photo ? values.photo.name : ''}</span>
        { values.error && (<Typography component="p" color="error">
            <Icon color="error" className={classes.error}>error</Icon>
              {values.error}
            </Typography>)
        }

        {/* {values.photo !== '' && <TextField
            placeholder="Write alt text..."
            multiline
            rows="1"
            value={values.altText}
            onChange={handleChange('altText')}
            className={classes.textField}
            margin="normal"
        /> } */}

      </CardContent>
      <CardActions>
        {/* { values.altText !== '' ?
        <Button color="primary" variant="contained" disabled={values.text === ''} onClick={clickPost} className={classes.submit}>POST</Button> :
        <Button color="primary" variant="contained" disabled={values.text === ''} onClick={handleClickOpen} className={classes.submit}>POST</Button>
        } */}

<Button color="primary" variant="contained" disabled={values.text === ''} onClick={handleClickOpen} className={classes.submit}>POST</Button>

        
      </CardActions>
    </Card>

    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <DialogTitle id="alert-dialog-title">
      <Typography variant="h4" align="center">New Post</Typography>

      </DialogTitle>

        <DialogContent>
        {/* <img src={'/api/posts/photo/'} height={100} width={100}/> */}


        {/* {props.posts.map((item, i) => {
          return (
            item !== undefined && i == 3 && <img src={'/api/posts/photo/' + item._id} height={100} width={100}/>
          )
          })
        } */}

        {/* {console.log(props.posts)} */}
        {console.log(props.posts)}
        {/* <img src={'/api/posts/photo/' + values._id} height={100} width={100}/> */}
        {/* <img src={values.photo.webkitRelativePath} height={100} width={100}/> */}

        {/* <img src={'/api/posts/photo/' + this.props.post._id} height={100} width={100} /> */}

        {/* {console.log(values)} */}
        {/* {console.log(props.post._id)}
        {console.log('hi')} */}

        {/* <TextField
            placeholder="Write a caption... (required)"
            multiline
            rows="1"
            value={values.text}
            onChange={handleChange('text')}
            className={classes.textField}
            margin="normal"
        /> */}
        <TextField
            placeholder="Add location..."
            multiline
            rows="1"
            value={values.location}
            onChange={handleChange('location')}
            className={classes.textField}
            margin="normal"
        />
          <TextField
            placeholder="Write alt text here..."
            multiline
            rows="1"
            value={values.altText}
            onChange={handleChange('altText')}
            className={classes.textField}
            margin="normal"
        />

<br></br>
<br></br>

<input type="checkbox" id="topping" name="topping" value="likes" className={classes.checkbox}  />  Hide likes and views
<br></br>
<input type="checkbox" id="lol" name="lol" value="comments" className={classes.checkbox} /> Disable comments

<br></br>

<Tags/>





        {/* <br></br>
        <Typography className={classes.textField}> Hide likes and view counts on this post </Typography>
        <br></br>
        <Typography className={classes.textField}> Turn off commenting</Typography> */}


        </DialogContent>
        <DialogActions>
          <Button onClick={clickPostSkip}>Skip</Button>
          <Button onClick={clickPost} autoFocus>
            Add
          </Button>
        </DialogActions>
      </Dialog>
  </div>)

}

NewPost.propTypes = {
  addUpdate: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired
}


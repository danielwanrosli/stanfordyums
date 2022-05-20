import React, { useState } from 'react'
import {makeStyles} from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({
    tagsinputcontainer: {
        padding: '.5em',
        borderRadius: '3px',
        width: 'min(80vw, 600px)',
        marginTop: '1em',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '.5em'
    },
    tagitem: {
        backgroundColor: 'rgb(218, 216, 216)',
        display: 'inline-block',
        padding: '.5em .75em',
        borderRadius: '20px'
    }
  }))

function Tags() {
    const classes = useStyles()
    const [tags, setTags] = useState([])

    function handleKeyDown(e){
        if(e.key !== 'Enter') return
        const value = e.target.value
        if(!value.trim()) return
        setTags([...tags, value])
        e.target.value = ''
    }

    function removeTag(index){
        setTags(tags.filter((el, i) => i !== index))
    }

    return (
        <div className={classes.tagsinputcontainer}>
            { tags.length !== 0 && <p>Tags: </p> }
            { tags.map((tag, index) => (
                <div className={classes.tagitem} key={index}>
                    <span className="text">{tag}</span>
                    <span className="close" onClick={() => removeTag(index)}>&times;</span>
                </div>
            )) }
            <input onKeyDown={handleKeyDown} type="text" className="tags-input" placeholder="Enter to add tags..." />
        </div>
    )
}

export default Tags
import React, {useState} from 'react';

export const Star = (props) => {
    const star = (k) => <i key={k} className="material-icons ">star</i>
    const starHalf = (k) => <i key={k} className="material-icons">star_half</i>
    const starBorader = (k) => <i key={k} className="material-icons">star_border</i>
    let maxStars = props.maxStars
    let maxScore = props.maxScore
    let score = props.score
    let scorePerStar = maxScore / maxStars
    let returnItem = []
    let fullstar = Math.floor(score / scorePerStar)
    let halfstar = (score / scorePerStar) - fullstar;
    for (let i = 0; i < maxStars; i++) {
        if (fullstar > 0) {
            returnItem.push(star(i))
            fullstar--
        } else if (halfstar >= 0.5) {
            returnItem.push(starHalf(i))
            halfstar = halfstar - 0.5
        } else {
            returnItem.push(starBorader(i))
        }
    }
    return (<a className="stars amber-text text-darken-1">
        <span>{returnItem}</span>
    </a>)

}
export const StarWithInteraction = (props) => {
   
    let maxStars = props.maxStars
    let maxScore = props.maxScore
    let callback = props.callback
    let styles = props.className?props.className:""
    let score = props.score?props.score:0
    let scorePerStar = maxScore / maxStars
    let returnItem = []
    let fullstar = Math.floor(score / scorePerStar)
    const [currentStar,setCurrentStar]=useState(score)
    const [starCount,setStarCount]=useState(score)
    let halfstar = (score / scorePerStar) - fullstar;
    const star = (k) => <i key={k}  onMouseEnter={()=>{ handleHoverOn(k)}} onClick={()=>{handleClick(k)}} onMouseLeave={()=>{ handleHoverOff(k)}}className="material-icons ">{currentStar>=k?"star":"star_border"}</i>
    const handleHoverOn =(n)=>{setCurrentStar(n)}
    const handleHoverOff =(n)=>{setCurrentStar(starCount)}
    const handleClick =(n)=>{
        setCurrentStar(n)
        setStarCount(n) 
        callback(n)
    }
    fullstar=starCount
    for (let i = 1; i < maxStars+1; i++) {
        if (fullstar > 0) {
            returnItem.push(star(i))
            fullstar--
        }else{
            returnItem.push(star(i))
        }
    }
    return (<a className={styles}>
        <span>{returnItem}</span>
    </a>)

}
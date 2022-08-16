import '../../styles/Like.css'                                      //css import
import AuthService from '../../services/auth-serv'                  //AuthService service import
import LikeService from '../../services/like-serv'                  //LikeService service import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'    //Like icon import
import { faHeart } from '@fortawesome/free-solid-svg-icons'         //Like icon style import
import React, { useState, useEffect } from 'react'                  //React import (useState, useEffect)
import { useParams } from 'react-router-dom'                        //React router dom import (useParams)

const RatePost = () => {                                            //RatePost component creation
    const { id } = useParams()                                      //Id recovery
    const currentUser = AuthService.getCurrentUser()                //Current user recovery
    const currentPostId = id
    const [likes, setLikes] = useState([])                          //Definition of state

    useEffect(() => {                                               //Existing like's recovery
        async function getLikes() {
            const response = await LikeService.getAll(id)
            setLikes(response)
        }
        getLikes()
    }, [id])

    function handleLike(e) {                                        //Like managment
        e.preventDefault()
        const data = {
            postId: currentPostId,
            userId: currentUser.id,
        }
        LikeService
        .like(id, data)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
        window.location.reload()
    }
    
    return (                                                        //RatePost component render (display)
        <div className="block-like">
            <FontAwesomeIcon
                    icon={faHeart}
                    className="icon-like"
                    alt="Icone pour liker le post"
                    onClick={handleLike}
                />
            <p className="number-like">{likes.length}</p>
        </div>
    )
}

export default RatePost                                            //RatePost component export
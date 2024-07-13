import React,{useState,useEffect} from 'react'
import { Container,PostForm } from '../components'
import appwriteServide from "../appwrite/conf"
import { useNavigate, useParams } from 'react-router-dom'


function EditPost() {

    const[post, setPosts] = useState(null)
// url se kuch value nikalne ke liye useparm
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if(slug){
            appwriteServide.getPost(slug).then((post)=>{
                setPosts(post)
            })
        }else{
            navigate('/')
        }
    },[slug,navigate])

  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post}/>
        </Container>

    </div>
  ) : null
}
  


export default EditPost
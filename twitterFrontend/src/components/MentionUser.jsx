import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function MentionUser({description,id, ptype}) {
    
    const {mentionData} = useSelector((state) => state.mention);

    const renderPostWithMentions = (text, postId)  => {
        if(!text) return null;
    
        const mentionPost = mentionData?.find((m) => m?.type_id == postId && m?.type == ptype);
    
        return text.split(/(@\w+)/).map((part,index) => {
            if(part.startsWith("@")){
              const mention = mentionPost?.mentions?.find((m) => m?.slug == part); 

              if(mention){
                return (
                <Link
                   key={index}
                   to={`http://localhost:5173/profile/${mention?.id}`} 
                >
                  <span className='text-blue-500 hover:underline'>{part}</span>
                </Link>
              );
            }
             }
            return part;
          });
      }
    
return (
    renderPostWithMentions(
        description,
        id
    )
         
)
}

export default MentionUser

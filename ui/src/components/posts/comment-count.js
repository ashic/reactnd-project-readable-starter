import React from 'react'


export default ({ count }) => (
    <span className='comment-count'>
        <span className='glyphicon glyphicon-user'></span>
        {count || 0}
    </span>
)
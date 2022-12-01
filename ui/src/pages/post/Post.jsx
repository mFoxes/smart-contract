import React, { useEffect, useState } from 'react'

import './post.scss';
import { Context } from '../..';
import { useContext } from 'react';
import { history } from '../../history/history';
export const Post = () => {
    const [content, setContent] = useState('');
    const [tag, setTag] = useState('');

    const { generalStore } = useContext(Context);
	const getEventsPost =  async () => {
		await generalStore.contract.methods.post(content, tag).send({from: generalStore.account});
	}

    useEffect(() => {
        if (!generalStore.account) {
            history.push('/');
        }
    }, [])
    

    return (
        <div className='post'>
            <div className="post__container">
                <button onClick={getEventsPost}>Post</button>
                <form className="post__form">
                    <input type="text" value={tag} onChange={(event) => {
                        setTag(event.target.value)
                    }} placeholder='Тег...'/>
                    <input type="text" value={content} onChange={(event) => {
                        setContent(event.target.value)
                    }} placeholder='Сообщение...'/>
                </form>
            </div>
        </div>
    )
}

import { useEffect, useState } from 'react';

import { useContext } from 'react';
import { Context } from '../..';
import { history } from '../../history/history';
import './logs.scss';

export const Logs = () => {
	const { generalStore } = useContext(Context);
	
	const [tagSearch, setTagSearch] = useState('');

    const [posts, setPosts] = useState([])

	const filterPosts = posts.filter((item) => {
		if (tagSearch !== '') {
			return generalStore.web3.utils.sha3(tagSearch) === item.returnValues.tag
		}
		return true
	})

    const initLogs = async () => {
        const posts = await getPastEvents({event: "NewPost", fromBlock: 29419940, chunkLimit: 998 })
        setPosts(posts.events);
		console.log('posts', posts);
    }

    const getPastEvents = async ({
		event,
		fromBlock,
		toBlock = "latest",
		chunkLimit = 0,
		tag = 'tag'
	  }) => {
		try {	
		  const fromBlockNumber = +fromBlock
		  const toBlockNumber =
			toBlock === "latest" ? +(await generalStore.web3.eth.getBlockNumber()) : +toBlock
		  const totalBlocks = toBlockNumber - fromBlockNumber
		  const chunks = []
	
		  if (chunkLimit > 0 && totalBlocks > chunkLimit) {
			const count = Math.ceil(totalBlocks / chunkLimit)
			let startingBlock = fromBlockNumber
	
			for (let index = 0; index < count; index++) {
			  const fromRangeBlock = startingBlock
			  const toRangeBlock =
				index === count - 1 ? toBlockNumber : startingBlock + chunkLimit
			  startingBlock = toRangeBlock + 1
	
			  chunks.push({ fromBlock: fromRangeBlock, toBlock: toRangeBlock })
			}
		  } else {
			chunks.push({ fromBlock: fromBlockNumber, toBlock: toBlockNumber })
		  }
	
		  const events = []
		  const errors = []
		  for (const chunk of chunks) {
			await generalStore.contract.getPastEvents(
			  event,
			  {
				filter: {
				},
				fromBlock: chunk.fromBlock,
				toBlock: chunk.toBlock
			  },
			  async function (error, chunkEvents) {
				if (chunkEvents?.length > 0) {
				  events.push(...chunkEvents)
				}
	
				if (error) errors.push(error)
			  }
			)
		  }
	
		  return { events, errors, lastBlock: toBlockNumber }
		} catch (error) {
		  return { events: [], errors: [error], lastBlock: null }
		}
	  }
	  

	  useEffect(() => {
        if (!generalStore.account) {
            history.push('/');
        } else {
            initLogs();
        }
    }, [])
    
  return (
    <div className='logs'>
        <div className="logs__container">
			<input type="text" value={tagSearch} onChange={(event) => {setTagSearch(event.target.value)}} placeholder='Тег...'/>
			<div className="logs__table">
				
			</div>
			<table>
				<tr>
					<th>Текст</th>
					<th>Тег</th>
					<th>Аккаунт</th>
				</tr>
				{filterPosts.map((item) => {
					return <tr className='logs__item' key={item.blockNumber}>
					<td>{item.returnValues.content}</td>
					<td>{item.returnValues.tag}</td>
					<td>{item.returnValues.user}</td>
				</tr>
				})}
			</table>
        </div>
    </div>
  )
}

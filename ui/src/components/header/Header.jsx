import React from 'react'
import contractABI from '../../contracts/Poster.json';

import Web3 from 'web3';
import { Link } from "react-router-dom";
import './header.scss';
import { Context } from '../..';
import { useContext } from 'react';
import { observer } from 'mobx-react-lite';

export const Header = observer(() => {
	const { generalStore } = useContext(Context);

    const navigateLink = [{
        name: 'Post',
        to: '/post'
    },{
        name: 'Logs',
        to: '/logs'
    }];

    const handleConnect = async () => {
		const web3 = new Web3(window.ethereum);
		const [address] = await window.ethereum.enable();
		generalStore.setAccount(address);
		generalStore.setWeb3(web3);
		const contract = new web3.eth.Contract(contractABI, '0x4017645cd66C4bEbe5ABAD1BcE9FbC7c207D9282', {from: address});
		generalStore.setContract(contract);
	};

    return (
    <div className="header">
        <div className='header__container'>
            <div className="header__links">
                {navigateLink.map((item) => {
                    return generalStore.account && <Link to={item.to} key={item.to}>{item.name}</Link>
                })}
            </div>
            <div className="header__account">
                {
                    generalStore.account ? 
                    <>
                        account: {generalStore.account}
                    </> 
                        :
				    <button onClick={handleConnect}>Connect</button>
                }
            </div>
        </div>
    </div>
  )
})

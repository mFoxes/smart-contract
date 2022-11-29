import './home.scss';
import { useState } from 'react';
import Web3 from 'web3';

export const Home = (): JSX.Element => {
	const [web3, setWeb3] = useState<Web3 | undefined>(undefined);
	const [userAddress, setUserAddress] = useState<string | undefined>(undefined);
	const handleConnect = async () => {
		const web3 = new Web3(window.ethereum);
		const [address] = await window.ethereum.enable();
		setUserAddress(address);
		setWeb3(web3);
	};

	return (
		<div className='home__container'>
			<button onClick={handleConnect}>Connect</button>
			<address>{userAddress}</address>
		</div>
	);
};

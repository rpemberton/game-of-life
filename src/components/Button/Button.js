import React from 'react';
import styles from './Button.module.css';

const Button = ({ btnTxt, onClick }) => {
	return(
		<button
			className={styles.button}
			onClick={onClick}>
			{btnTxt}
		</button>
	);
}

export default Button;

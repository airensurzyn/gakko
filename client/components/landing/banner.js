import React, { useState, useEffect } from 'react';
import styles from '../styles/banner.module.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { BookPerson } from '../../assets/book-person';
import { fadeIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';

const FadeIn = styled.div`
	animation: 4s ${keyframes`${fadeIn}`} infinite;
`;
const Banner = () => {
	const [word, setWord] = useState('Learn');

	const wordLibrary = ['Learn', 'Teach', 'Collaborate'];
	let count = 0;

	useEffect(() => {
		setInterval(() => {
			setWord(wordLibrary[count]);
			if (count === wordLibrary.length - 1) {
				count = 0;
			} else {
				count += 1;
			}
		}, 4000);
	}, []);

	return (
		<Container className={styles.root} fluid>
			<Row>
				<Col className={styles.leftSide}>
					<Container className={styles.titleContainer}>
						<Row style={{ lineHeight: 1.5 }}>
							<span className={styles.bannerTitle}>Gakko</span>
						</Row>
						<Row style={{ lineHeight: 1, marginBottom: '2rem' }}>
							<span className={styles.bannerSubTitle}>
								A curated online learning community
							</span>
						</Row>
						<Row>
							<Form.Group>
								<InputGroup>
									<Form.Control type="email" placeholder="Enter email" />
									<InputGroup.Append>
										<Button className={styles.getStartedButton}>
											Get Started
										</Button>
									</InputGroup.Append>
								</InputGroup>
							</Form.Group>
						</Row>
					</Container>
				</Col>
				<Col
					className={styles.rightSide}
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<div>
						<Row style={{ marginBottom: '32px' }}>
							<BookPerson style={{ margin: 'auto' }} />
						</Row>
						<Row
							style={{
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<div style={{ display: 'flex' }}>
								<span className={styles.subtitle}>{`I'm here to `}</span>
								<div
									style={{
										display: 'flex',
										borderBottom: '2px solid #444444',
										paddingLeft: '8px',
										paddingRight: '8px',
										width: '200px',
										justifyContent: 'center',
									}}
								>
									<FadeIn>
										<span className={styles.rotatingSubtitle}>{word}</span>
									</FadeIn>
								</div>
							</div>
						</Row>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default Banner;

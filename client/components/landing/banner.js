import styles from '../styles/banner.module.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { BookPerson } from '../../assets/book-person';

export default () => {
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
					style={{ display: 'flex', justifyContent: 'center' }}
				>
					<BookPerson />
				</Col>
			</Row>
		</Container>
	);
};

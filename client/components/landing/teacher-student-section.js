import React from 'react';
import styles from '../styles/teacher-student.module.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Teacher } from '../../assets/teacher';
import { Students } from '../../assets/students';

export default () => {
	return (
		<Container className={styles.root} fluid>
			<Row>
				<Col>
					<div className={styles.titleDiv}>
						<span>I am a ...</span>
					</div>
				</Col>
			</Row>
			<Row>
				<Col className={styles.leftSide}>
					<Row className={styles.columnRow}>
						<Col xs={6}>
							<div className={styles.internalColumn}>
								<span>
									<Students />
								</span>
							</div>
						</Col>
						<Col xs={6}>
							<div className={styles.internalColumn}>Student</div>
						</Col>
					</Row>
					<Row style={{ width: '100%', alignItems: 'center', height: '100px' }}>
						<Col xs={6}>
							<div className={styles.internalColumn}>
								<span>sadf</span>
							</div>
						</Col>
						<Col xs={6}>
							<div className={styles.internalColumn}>Student</div>
						</Col>
					</Row>
				</Col>

				<Col className={styles.rightSide}>
					<Row style={{ width: '100%', alignItems: 'center', height: '250px' }}>
						<Col xs={6}>
							<div className={styles.internalColumn}>
								<span>Teacher</span>
							</div>
						</Col>
						<Col xs={6}>
							<div className={styles.internalColumn}>
								<Teacher />
							</div>
						</Col>
					</Row>
					<Row style={{ width: '100%' }}>
						<Col xs={6}>
							<div className={styles.internalColumn}>
								<span></span>
							</div>
						</Col>
						<Col xs={6}>
							<div className={styles.internalColumn}>Student</div>
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	);
};

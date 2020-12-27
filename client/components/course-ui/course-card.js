import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const CourseCard = ({ title, content, imageSource }) => {
	return (
		<Card
			style={{
				width: '16rem',
				fontWeight: 'normal',
				fontSize: '14px',
				marginRight: '2rem',
			}}
		>
			<Card.Img variant="top" src={imageSource} />
			<Card.Body>
				<Card.Title>{title}</Card.Title>
				<Card.Text>{content}</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default CourseCard;

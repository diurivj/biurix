import { Container } from '~/components/Container';

export async function loader() {
	const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
	await wait(5000);
	return null;
}

export default function Contact() {
	return (
		<Container>
			<h1>Contact</h1>
		</Container>
	);
}

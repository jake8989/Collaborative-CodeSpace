import Image from 'next/image';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
import HomePage from '../components/Home/Home';

export default function Home() {
	return (
		<main>
			<HomePage />
		</main>
	);
}

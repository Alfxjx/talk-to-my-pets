import Head from "next/head";
import { useRouter } from "next/router";
import { Layout } from "../components/Layout";

export default function Home() {
	const router = useRouter();
	const handleClick = () => router.push("/talk");
	return (
		<>
			<Head>
				<title>T2P</title>
				<meta name="description" content="Talk to your pets using AI" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Layout>
				<p className="text-xl pb-4">
					Talk to your pets using <strong>GPT-3</strong>
				</p>
				<button className="btn btn-primary" onClick={handleClick}>
					Start
				</button>
			</Layout>
		</>
	);
}

import Head from "next/head";
import Image from "next/image";
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
				<Image
					src={"/dog.png"}
					width={200}
					height={200}
					className="rounded-lg"
					alt="Cozy photo of dog sitting between sofa and fireplace in oil painting style with intimacy"
				></Image>
				<p className="text-xl py-4">
					Talk to your pets using <strong>GPT-3</strong>
				</p>
				<button className="btn btn-primary" onClick={handleClick}>
					Start
				</button>
			</Layout>
		</>
	);
}

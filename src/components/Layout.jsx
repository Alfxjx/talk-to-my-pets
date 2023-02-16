import { FaDog } from "react-icons/fa";
import Link from "next/link";

export const Layout = ({ children }) => {
	return (
		<main className="flex flex-col items-center justify-center w-full min-h-screen">
			<div className="flex-1 flex flex-col items-center justify-center">
				<div className="w-full absolute top-0 left-0 flex justify-center my-4">
					<Link href="/">
						<FaDog className="text-gray-300 text-xl" />
					</Link>
				</div>
				{children}
			</div>
			<div className="flex-0 bg-[#191919] text-gray-300 w-full text-center py-2">
				Created by
				<a
					className="ml-1 text-[#973cc1]"
					href="https://github.com/Alfxjx/talk-to-my-pets"
					target={"_blank"}
					rel={"noreferrer"}
				>
					Alfxjx
				</a>
				. Inspired by
				<a
					className="ml-1 text-[#973cc1]"
					href="https://www.xiaohongshu.com/user/profile/5a19e2264eacab68093ff50e"
					target="_blank"
					rel="noopener noreferrer"
				>
					Jellicle
				</a>
			</div>
		</main>
	);
};

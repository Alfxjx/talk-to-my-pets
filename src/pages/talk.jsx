import { useState } from "react";
import { Formik, Field } from "formik";

import { Layout } from "@/components/Layout";
import { generatePrompt } from "@/pages/api/talk";

export default function Talk() {
	const [step, setStep] = useState(0);

	const [val, setVal] = useState("");

	const handleStartOK = () => setStep(1);

	const Step1 = () => (
		<section className="flex flex-col items-center justify-center">
			<div className="pb-4">
				{"Before talk, we need some information of your pets"}
			</div>
			<button className="btn btn-primary" onClick={handleStartOK}>
				{"Let's GO"}
			</button>
		</section>
	);

	const Step2 = () => {
		const handleSubmit = async (values, { setSubmitting }) => {
			const prompt = generatePrompt(values);
			try {
				const response = await fetch("/api/talk", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(values),
				});

				setVal(prompt);

				const data = await response.json();
				if (response.status !== 200) {
					throw (
						data.error ||
						new Error(`Request failed with status ${response.status}`)
					);
				}

				setSubmitting(false);
				setStep(2);
				setVal(`${prompt}${data.result}`);
			} catch (error) {
				// Consider implementing your own error handling logic here
				console.error(error);
				alert(error.message);
			}
		};

		const [initialVal, setInitialVal] = useState({
			petType: "cat",
			petName: "",
			otherInfo: "",
		});

		const handleTest = () => {
			setInitialVal({
				petType: "dog",
				petName: "Pepe",
				otherInfo: "He is my dog, he passed away last year. I missed him a lot",
			});
		};
		return (
			<section className="flex flex-col items-center justify-center w-64">
				<Formik
					initialValues={initialVal}
					enableReinitialize={true}
					validate={(values) => {
						const errors = {};
						if (!values.petName) {
							errors.petName = "Pet's name Required";
						}
						if (values.petName.length > 50) {
							errors.petName = "Pet's name too long";
						}
						if (values.otherInfo.length > 500) {
							errors.petName = "Sorry we cannot hold more info";
						}
						return errors;
					}}
					onSubmit={handleSubmit}
				>
					{({
						values,
						errors,
						handleChange,
						handleBlur,
						handleSubmit,
						isSubmitting,
					}) => {
						return (
							<form
								onSubmit={handleSubmit}
								className="flex flex-col items-start w-full"
							>
								<div
									role="group"
									aria-labelledby="my-radio-group"
									className="flex items-center w-full mb-2"
								>
									<label className="flex items-center">
										<Field
											type="radio"
											name="petType"
											value="cat"
											className="radio radio-primary mr-1"
										/>
										Cat
									</label>
									<label className="ml-2 flex items-center">
										<Field
											type="radio"
											name="petType"
											value="dog"
											className="radio radio-primary mr-1"
										/>
										Dog
									</label>
								</div>
								<div className="form-control w-full">
									<label className="label">
										<span className="label-text">{"Your pet's name"}</span>
										<span className="label-text-alt text-red-300">
											Required
										</span>
									</label>
									<input
										className={`input input-bordered w-full ${
											errors.petName ? "input-error" : ""
										}`}
										placeholder={errors.petName}
										type="text"
										name="petName"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.petName}
									/>
								</div>

								<div className="form-control w-full mt-2">
									<label className="label">
										<span className="label-text">{"More information"}</span>
										<span className="label-text-alt">max 500</span>
									</label>
									<textarea
										className="textarea textarea-bordered w-full"
										placeholder={errors.otherInfo}
										name="otherInfo"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.otherInfo}
									/>
								</div>

								<div className="flex justify-start items-center mt-4">
									<button
										type="submit"
										disabled={isSubmitting}
										className={`btn btn-primary  ${
											isSubmitting ? "loading" : ""
										}`}
										onClick={handleStartOK}
									>
										start talking
									</button>
									<button
										className="btn btn-secondary ml-2"
										onClick={handleTest}
										type="button"
									>
										Test
									</button>
								</div>
							</form>
						);
					}}
				</Formik>
			</section>
		);
	};
	const Step3 = () => {
		const handleChat = async (val, { setSubmitting }) => {
			try {
				const response = await fetch("/api/chat", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						ctx: val.chat,
					}),
				});

				const data = await response.json();
				if (response.status !== 200) {
					throw (
						data.error ||
						new Error(`Request failed with status ${response.status}`)
					);
				}
				setSubmitting(false);
				setVal(`${val.chat}${data.result}`);
			} catch (error) {
				// Consider implementing your own error handling logic here
				console.error(error);
				alert(error.message);
			}
		};
		return (
			<section className="flex flex-col items-center justify-center w-full h-screen px-4 mt-8">
				<Formik initialValues={{ chat: val }} onSubmit={handleChat}>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
						isSubmitting,
					}) => {
						return (
							<form onSubmit={handleSubmit} className="w-full h-full">
								<textarea
									name="chat"
									id="theChatTextArea"
									className="textarea textarea-bordered w-full h-[80%] my-4"
									onBlur={handleBlur}
									value={values.chat}
									onChange={handleChange}
								></textarea>
								<button
									className={`btn btn-primary  ${
										isSubmitting ? "loading" : ""
									}`}
									type="submit"
								>
									submit / continue
								</button>
							</form>
						);
					}}
				</Formik>
			</section>
		);
	};

	return (
		<Layout>
			{step === 0 && <Step1 />}
			{step === 1 && <Step2 />}
			{step === 2 && <Step3 />}
		</Layout>
	);
}

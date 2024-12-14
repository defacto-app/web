import type React from "react";

const JsonDisplay = ({ data }:any) => {
	interface JsonDisplayProps {
		data: any;
	}

	const formatJSON = (obj: any): string => {
		try {
			const parsedObj = typeof obj === "string" ? JSON.parse(obj) : obj;
			return JSON.stringify(parsedObj, null, 2);
		} catch (error) {
			return String(obj);
		}
	};

	const renderJSONWithSyntaxHighlighting = (jsonString: string) => {
		const tokens = jsonString
			.split(/(".*?"|{|}|\[|\]|,|\n|\s+)/g)
			.filter(Boolean);

		return tokens.map(
			(
				token:
					| string
					| number
					| bigint
					| boolean
					| React.ReactElement<any, string | React.JSXElementConstructor<any>>
					| Iterable<React.ReactNode>
					| Promise<React.AwaitedReactNode>
					| null
					| undefined,
				index: React.Key | null | undefined,
			) => {
				// Strings (in quotes)
				if (/^".*"$/.test(token)) {
					const isKey = tokens[index + 1]?.trim() === ":";
					return (
						<span
							key={index}
							className={
								isKey
									? "text-purple-600 dark:text-purple-400"
									: "text-green-600 dark:text-green-400"
							}
						>
							{token}
						</span>
					);
				}
				// Numbers
				if (/^-?\d+\.?\d*$/.test(token)) {
					return (
						<span key={index} className="text-blue-600 dark:text-blue-400">
							{token}
						</span>
					);
				}
				// Boolean and null
				if (["true", "false", "null"].includes(token)) {
					return (
						<span key={index} className="text-red-600 dark:text-red-400">
							{token}
						</span>
					);
				}
				// Brackets and braces
				if (/[{}\[\]]/.test(token)) {
					return (
						<span key={index} className="text-gray-600 dark:text-gray-400">
							{token}
						</span>
					);
				}
				// Everything else (whitespace, commas, etc)
				return <span key={index}>{token}</span>;
			},
		);
	};

	return (
		<pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto font-mono text-sm">
			<code className="block whitespace-pre">
				{renderJSONWithSyntaxHighlighting(formatJSON(data))}
			</code>
		</pre>
	);
};

export default JsonDisplay;

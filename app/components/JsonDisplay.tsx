import type { ReactNode } from "react";

interface JsonDisplayProps {
	data: unknown;
}

const JsonDisplay = ({ data }: JsonDisplayProps) => {
	const formatJSON = (obj: unknown): string => {
		try {
			if (typeof obj === "string") {
				return JSON.stringify(JSON.parse(obj), null, 2);
			}
			return JSON.stringify(obj, null, 2);
		} catch (error) {
			return String(obj);
		}
	};

	const renderJSONWithSyntaxHighlighting = (
		jsonString: string,
	): ReactNode[] => {
		const tokens = jsonString
			.split(/(".*?"|{|}|\[|\]|,|\n|\s+)/g)
			.filter(Boolean);

		return tokens.map((token, index) => {
			// Use unique key based on token and position
			const key = `${token}-${index}`;

			// Strings (in quotes)
			if (typeof token === "string" && /^".*"$/.test(token)) {
				const isKey = tokens[index + 1]?.trim() === ":";
				return (
					<span
						key={key}
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
			if (typeof token === "string" && /^-?\d+\.?\d*$/.test(token)) {
				return (
					<span key={key} className="text-blue-600 dark:text-blue-400">
						{token}
					</span>
				);
			}
			// Boolean and null
			if (
				typeof token === "string" &&
				["true", "false", "null"].includes(token)
			) {
				return (
					<span key={key} className="text-red-600 dark:text-red-400">
						{token}
					</span>
				);
			}
			// Brackets and braces
			if (typeof token === "string" && /[{}\[\]]/.test(token)) {
				return (
					<span key={key} className="text-gray-600 dark:text-gray-400">
						{token}
					</span>
				);
			}
			// Everything else (whitespace, commas, etc)
			return <span key={key}>{token}</span>;
		});
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

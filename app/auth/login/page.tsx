import React from "react";

export default function LoginPage() {
	return (
		<div>
			<h2 className="text-2xl font-bold mb-6 text-center">
				Sign in to your account
			</h2>
			<form className="space-y-4">
				<div>
					<label
						htmlFor="email"
						className="block text-sm font-medium text-gray-700"
					>
						Email address
					</label>
					<input
						type="email"
						id="email"
						name="email"
						required
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					/>
				</div>

				<div>
					<label
						htmlFor="password"
						className="block text-sm font-medium text-gray-700"
					>
						Password
					</label>
					<input
						type="password"
						id="password"
						name="password"
						required
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					/>
				</div>

				<button
					type="submit"
					className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
				>
					Sign In
				</button>
			</form>

			<div className="mt-6 text-center">
				<p className="text-sm text-gray-600">
					Don't have an account?{" "}
					<a
						href="/auth/register"
						className="font-semibold text-indigo-600 hover:text-indigo-500"
					>
						Sign up
					</a>
				</p>
			</div>
		</div>
	);
}

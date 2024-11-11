import React, { useState } from "react";
import Image from "next/image";

type PackageImageUploaderProps = {
	onImageSelect: (base64Image: string) => void;
};

function PackageImageUploader({ onImageSelect }: PackageImageUploaderProps) {
	const [preview, setPreview] = useState<string | null>(null);

	const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const base64Image = await convertToBase64(file);
			setPreview(URL.createObjectURL(file)); // Preview URL for display
			onImageSelect(base64Image); // Pass the base64 image to the parent component
		}
	};

	const handleRemoveImage = () => {
		setPreview(null);
		onImageSelect(""); // Clear the image in the parent component
	};

	const convertToBase64 = (file: File): Promise<string> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = error => reject(error);
		});
	};

	return (
		<div className={`flex justify-start`}>
			<div className="w-full max-w-xs mx-auto bg-gray-100 p-2 rounded-lg">
				<h3 className="text-sm font-semibold mb-4">Upload Package Image</h3>
				{preview ? (
					<div className="relative">
						<Image
							width={100}
							height={100}
							src={preview}
							alt="Preview"
							className="w-full h-20 object-cover rounded-lg"
						/>
						<button
							onClick={handleRemoveImage}
							className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
						>
							&times;
						</button>
					</div>
				) : (
					<label className="block cursor-pointer">
						<div className="border border-dashed border-gray-400 rounded-lg p-4 text-center">
							Select Image
						</div>
						<input
							type="file"
							accept="image/*"
							onChange={handleImageChange}
							className="hidden"
						/>
					</label>
				)}
			</div>
		</div>
	);
}

export default PackageImageUploader;

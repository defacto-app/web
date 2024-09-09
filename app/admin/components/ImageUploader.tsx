import type React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { $admin_api } from "@/http/admin-endpoint";
import { toast } from "react-toastify"; // Adjust path

function ImageUploader({
	params,
	onUploadComplete,
}: { params: { id: string }; onUploadComplete: () => void }) {
	const [file, setFile] = useState<File | null>(null);
	const [uploading, setUploading] = useState(false);
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files ? event.target.files[0] : null;
		if (selectedFile) {
			setFile(selectedFile);
			setError(null);
		}
	};

	const handleUpload = async () => {
		if (!file) {
			setError("No file selected");
			return;
		}

		setUploading(true);

		const formData = new FormData();
		formData.append("image", file); // Use "image" as the key to match the Multer setup

		try {
			const response = await $admin_api.restaurants.image(params.id, formData); // Upload using your admin_api setup

			console.log("Response", response);
			if (response) {
				setError(null);
				onUploadComplete();
			} else {
				setError("Upload failed");
			}
			toast.success(response.message);
		} catch (error) {
			console.error("Error uploading file:", error);
			setError("Error uploading file");
		} finally {
			setUploading(false);
		}
	};

	return (
		<div>
			<div className="grid w-full max-w-sm items-center gap-1.5">
				<Label htmlFor="picture">Picture</Label>
				<Input
					id="picture"
					type="file"
					accept="image/*"
					onChange={handleFileChange}
				/>
				{error && <p className="text-red-500">{error}</p>}
				<Button
					className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
					onClick={handleUpload}
					disabled={!file || uploading}
				>
					{uploading ? "Uploading..." : "Upload"}
				</Button>
			</div>
		</div>
	);
}

export default ImageUploader;

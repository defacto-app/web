import type React from "react";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { $admin_api } from "@/http/admin-endpoint";
import { toast } from "react-toastify";
import {
	AlertDialog,

	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function ImageUploader({
	id,
	onUploadComplete,
}: {
	id: string;
	onUploadComplete: () => void;
}) {
	const [file, setFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [uploading, setUploading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [open, setOpen] = useState(false);

	const fileInputRef = useRef<HTMLInputElement | null>(null);

	// Handle file selection
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files ? event.target.files[0] : null;
		if (selectedFile) {
			setFile(selectedFile);
			setError(null);
			// Generate a preview URL for the selected file
			setPreviewUrl(URL.createObjectURL(selectedFile));
		}
	};

	// Trigger file input click
	const handleButtonClick = () => {
		fileInputRef.current?.click();
	};

	// Cancel the upload process
	const cancelUpload = () => {
		setOpen(false);
		setFile(null);
		setError(null);
		setPreviewUrl(null); // Clear the preview
	};

	// Handle file upload
	const handleUpload = async () => {
		if (!file) {
			setError("No file selected");
			return;
		}

		setUploading(true);

		const formData = new FormData();
		formData.append("image", file); // Append the file as "image"

		try {
			const response = await $admin_api.restaurants.image(id, formData); // Upload the image using the API

			if (response) {
				setError(null);
				onUploadComplete();
				setOpen(false);
				setPreviewUrl(null); // Clear the preview after successful upload
			} else {
				setError("Upload failed");
			}
			toast.success("Image uploaded successfully");
		} catch (error) {
			console.error("Error uploading file:", error);
			setError("Error uploading file");
		} finally {
			setUploading(false);
		}
	};

	return (
		<div className="h-80">
			<AlertDialog open={open} onOpenChange={setOpen}>
				<AlertDialogTrigger asChild>
					<Button
						className="mt-4 text-blue-500"
						onClick={() => setOpen(true)}
						variant="outline"
					>
						Update Restaurant Image
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Upload Restaurant Image</AlertDialogTitle>
						<AlertDialogDescription>
							<div className="grid w-full items-center gap-1.5">
								<Label htmlFor="picture"></Label>

								{/* Display the preview if an image is selected */}
								{previewUrl ? (
									<div className="mt-4">
										<img
											src={previewUrl}
											alt="Selected preview"
											className="w-full h-40 object-contain"
										/>
										<Button
											variant="ghost"
											onClick={() => {
												setFile(null);
												setPreviewUrl(null); // Clear the preview
											}}
											className="mt-2 text-center"
										>
											Change Image
										</Button>
									</div>
								) : (
									<div
										onClick={handleButtonClick}
										onKeyDown={(e: any) =>
											e.key === "Enter" && handleButtonClick()
										}
										tabIndex={0} // Makes the div focusable with the keyboard
										role="button" // Ensures assistive technologies recognize it as a clickable element
										className="mt-2 flex cursor-pointer justify-center rounded-lg border border-dashed border-gray-900/25 px-6 h-40"
									>
										<div className="text-center">
											<Input
												ref={fileInputRef}
												id="picture"
												type="file"
												accept="image/*"
												className="sr-only"
												onChange={handleFileChange}
											/>
											{error && <p className="text-red-500">{error}</p>}
										</div>

										<p className="flex flex-col justify-center">
											{!previewUrl && "Click to Upload"}
										</p>
									</div>
								)}

								<p className="text-xs leading-5 text-gray-600 text-center">
									PNG, JPG, GIF up to 10MB
								</p>
							</div>
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<Button variant="outline" onClick={cancelUpload}>
							Cancel
						</Button>
						<Button
							variant="primary"
							onClick={handleUpload}
							disabled={!file || uploading}
						>
							{uploading ? "Uploading..." : "Upload Image"}
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}

export default ImageUploader;

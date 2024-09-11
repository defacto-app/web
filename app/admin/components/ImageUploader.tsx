import type React from "react";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { $admin_api } from "@/http/admin-endpoint";
import { toast } from "react-toastify"; // Adjust path
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
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
	const [uploading, setUploading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [open, setOpen] = useState(true);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files ? event.target.files[0] : null;
		if (selectedFile) {
			setFile(selectedFile);
			setError(null);
		}
	};

	const fileInputRef = useRef<any>(null);

	const handleButtonClick = () => {
		// Trigger the file input click
		fileInputRef.current.click();
	};

	const cancelUpload = () => {
		setOpen(false);
		setFile(null);
		setError(null);
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
			const response = await $admin_api.restaurants.image(id, formData); // Upload using your admin_api setup

			if (response) {
				setError(null);
				onUploadComplete();
				setOpen(false);
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
		<div className={`absolute right-4 bottom-4 h-80`}>
			<AlertDialog open={open} defaultOpen={open}>
				<AlertDialogTrigger asChild>
					<Button
						className={`mt-4 text-blue-500`}
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
							<div className="grid w-full  items-center gap-1.5">
								<Label htmlFor="picture"></Label>

								<div
									onClick={handleButtonClick}
									onKeyDown={(e:any) => e.key === "Enter" && handleButtonClick()}
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
											className={`sr-only`}
											onChange={handleFileChange}
										/>
										{error && <p className="text-red-500">{error}</p>}
									</div>
									<p className="flex flex-col justify-center ">
										Click to Upload{" "}
									</p>
								</div>
								<p className="text-xs leading-5 text-gray-600 text-center">
									PNG, JPG, GIF up to 10MB
								</p>
							</div>
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<Button variant={"outline"} onClick={cancelUpload}>
							Cancel
						</Button>
						<Button
							variant={`primary`}
							className=""
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

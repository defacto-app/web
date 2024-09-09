import type React from "react";
import { useState } from "react";
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
	params,
	onUploadComplete,
}: { params: { id: string }; onUploadComplete: () => void }) {
	const [file, setFile] = useState<File | null>(null);
	const [uploading, setUploading] = useState(false);
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [open, setOpen] = useState(false);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files ? event.target.files[0] : null;
		if (selectedFile) {
			setFile(selectedFile);
			setError(null);
		}
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
			const response = await $admin_api.restaurants.image(params.id, formData); // Upload using your admin_api setup

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
		<div>
			<AlertDialog open={open} defaultOpen={open}>
				<AlertDialogTrigger asChild>
					<Button className={`mt-4 text-blue-500`} onClick={() => setOpen(true)} variant="outline">
					Update Restaurant Image
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Upload Restaurant Image</AlertDialogTitle>
						<AlertDialogDescription>
							<div className="grid w-full  items-center gap-1.5">
								<Label htmlFor="picture"></Label>
								<Input
									id="picture"
									type="file"
									accept="image/*"
									onChange={handleFileChange}
								/>
								{error && <p className="text-red-500">{error}</p>}
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

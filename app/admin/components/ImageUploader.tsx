import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
						   handleUpload, // Accept handleUpload function as a prop
					   }: {
	id: string;
	onUploadComplete: () => void;
	handleUpload: (file: File | null, id: string, setPreviewUrl: (url: string | null) => void, setOpen: (open: boolean) => void) => Promise<void>; // Use this function for custom upload logic
}) {
	const [file, setFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [open, setOpen] = useState(false);

	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files ? event.target.files[0] : null;
		if (selectedFile) {
			setFile(selectedFile);
			setPreviewUrl(URL.createObjectURL(selectedFile));
		}
	};

	const handleButtonClick = () => {
		fileInputRef.current?.click();
	};

	const cancelUpload = () => {
		setOpen(false);
		setFile(null);
		setPreviewUrl(null);
	};

	return (
		<div>
			<AlertDialog open={open} onOpenChange={setOpen}>
				<AlertDialogTrigger asChild>
					<Button onClick={() => setOpen(true)} variant="primary">
						Update Restaurant Image
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent className="h-96">
					<AlertDialogHeader>
						<AlertDialogTitle>Upload Restaurant Image</AlertDialogTitle>
						<AlertDialogDescription>
							<div className="grid w-full items-center gap-1.5">
								<Label htmlFor="picture"></Label>

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
												setPreviewUrl(null);
											}}
											className="mt-2 text-center"
										>
											Change Image
										</Button>
									</div>
								) : (
									// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
<div
										onClick={handleButtonClick}
										tabIndex={0}
										role="button"
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
							onClick={() => handleUpload(file, id, setPreviewUrl, setOpen)}
							disabled={!file}
						>
							Upload Image
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}

export default ImageUploader;

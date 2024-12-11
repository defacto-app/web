"use client";
import type React from "react";
import {useEffect, useState} from "react";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import DateTimePicker from "@/components/user/DateTimePicker";
import type {addressSelectionType, DeliveryPayloadType} from "@/lib/types";
import {calculateDistance, formatPrice} from "@/utils";
import DeliveryMap from "@/components/delivery/DeliveryMap";
import PackageImageUploader from "@/components/delivery/PackageImage";
import {$api} from "@/http/endpoints";
import envData, {isDev} from "@/config/envData";
import BackButton from "@/app/components/BackButton";
import {
    DropOffAddress,
    PickupAddress,
    ReceiverDetails,
    Summary,
} from "@/app/user/send-package/component";
import {AlertCircle} from "lucide-react";
import {ErrorMessage} from "@/app/components/ErrorMessage";
import {toast} from "react-toastify";
import ScheduleTimePicker from "@/components/user/ScheduleTimePicker";

export default function Page() {
    const [loading, setLoading] = useState(false);

    const RATE_PER_KM = 300; // Price per kilometer

    const [pickModalOpen, setPickModalOpen] = useState(false);
    const [dropOffModalOpen, setDropOffModalOpen] = useState(false);
    const [distance, setDistance] = useState<number>();
    const [validationErrors, setValidationErrors] = useState<{
        [key: string]: string;
    }>({});

    const deliveryFee = distance ? distance * RATE_PER_KM : 0;

    // Add this function to scroll to first error
    const scrollToError = () => {
        const firstErrorElement = document.querySelector(".error-message");
        if (firstErrorElement) {
            firstErrorElement.scrollIntoView({behavior: "smooth", block: "center"});
        }
    };

    const ErrorSummary = ({errors}: { errors: Record<string, string> }) => {
        const errorCount = Object.keys(errors).length;

        if (errorCount === 0) return null;

        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 text-red-600 font-medium mb-2">
                    <AlertCircle className="h-5 w-5"/>
                    <span>
						Please fix the following {errorCount}{" "}
                        {errorCount === 1 ? "error" : "errors"}:
					</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-sm text-red-600">
                    {Object.entries(errors).map(([field, message]) => (
                        <li key={field}>{message}</li>
                    ))}
                </ul>
            </div>
        );
    };

    // Handle API error response
    const handleSubmitError = (errorResponse: any) => {
        if (errorResponse.error) {
            setValidationErrors(errorResponse.error);
            scrollToError();
        }
    };

    // Add error display component

    const [payload, setPayload] = useState<DeliveryPayloadType>({
        description: isDev ? "This is a test package" : "",
        package_image: "",
        charge: deliveryFee,
        pickupDate: new Date(),
        pickupDetails: {
            address: {
                address: "",
                additionalDetails: "",
                location: {lat: 0, lng: 0},
            },
        },
        dropOffDetails: {
            address: {
                address: "",
                additionalDetails: "",
                location: {lat: 0, lng: 0},
            },
            name: "",
            phone: "",
            email: "",
        },
    });

    const handleImageSelect = (base64Image: string) => {
        setPayload((prevPayload) => ({
            ...prevPayload,
            package_image: base64Image,
        }));
    };

    const handleDateSelect = (date: Date) => {
        setPayload({
            ...payload,
            pickupDate: date,
        });
    };

    const getSavedPickupAddress = () => {
        const savedData = sessionStorage.getItem("pickupAddress");

        return savedData ? JSON.parse(savedData) : null;
    };

    const setPickupAddress = (addressData: addressSelectionType) => {
        sessionStorage.setItem("pickupAddress", JSON.stringify(addressData));

        setPayload({
            ...payload,
            pickupDetails: {
                ...payload.pickupDetails,
                address: addressData,
            },
        });
    };

    const handlePickupAddressConfirm = (addressData: addressSelectionType) => {
        setPickupAddress(addressData);
        setPickModalOpen(false);
    };

    // Drop-off address functions
    const getSavedDropOffAddress = () => {
        const savedData = sessionStorage.getItem("dropOffAddress");
        return savedData ? JSON.parse(savedData) : null;
    };

    const setDropOffAddress = (addressData: addressSelectionType) => {
        sessionStorage.setItem("dropOffAddress", JSON.stringify(addressData));
        setPayload({
            ...payload,
            dropOffDetails: {
                ...payload.dropOffDetails,
                address: addressData,
            },
        });
    };

    const handleDropOffAddressConfirm = (addressData: addressSelectionType) => {
        setDropOffAddress(addressData);
        setDropOffModalOpen(false);
    };

    useEffect(() => {
        const savedPickupAddress = getSavedPickupAddress();
        if (savedPickupAddress) {
            setPayload((prevPayload) => ({
                ...prevPayload,
                pickupDetails: {
                    ...prevPayload.pickupDetails,
                    address: savedPickupAddress,
                },
            }));
        }

        const savedDropOffAddress = getSavedDropOffAddress();
        if (savedDropOffAddress) {
            setPayload((prevPayload) => ({
                ...prevPayload,
                dropOffDetails: {
                    ...prevPayload.dropOffDetails,
                    address: savedDropOffAddress,
                },
            }));
        }
    }, []);

    useEffect(() => {
        const {lat: pickLat, lng: pickLng} =
            payload.pickupDetails.address.location;
        const {lat: dropLat, lng: dropLng} =
            payload.dropOffDetails.address.location;

        if (pickLat && pickLng && dropLat && dropLng) {
            const calculatedDistance = calculateDistance(
                pickLat,
                pickLng,
                dropLat,
                dropLng,
            );
            setDistance(calculatedDistance);
        }
    }, [
        payload.pickupDetails.address.location,
        payload.dropOffDetails.address.location,
    ]);

    useEffect(() => {
        if (distance) {
            const deliveryFee = distance * RATE_PER_KM;
            setPayload((prevPayload) => ({
                ...prevPayload,
                charge: deliveryFee,
            }));
        }
    }, [distance]);

    const confirmOrder = async () => {
        setLoading(true);

        try {
            console.log(payload);
            const response = await $api.auth.user.order.package(payload);

            console.log(response);
            toast.success("Order placed successfully");
            setLoading(false);

            // clear errors
            setValidationErrors({});
        } catch (e: any) {
            console.log("error", e);

            setValidationErrors(e.error);
            // Scroll to first error
            const firstErrorElement = document.querySelector(".error-message");
            firstErrorElement?.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });

            toast.error("Error placing order");
            setLoading(false);

        }
    };

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.flutterwave.com/v3.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const initiatePayment = async () => {
        setLoading(true);

        try {
            const response = await $api.auth.user.order.package(payload);

            console.log(response);
        } catch (e) {
            console.log(e);
        }
        FlutterwaveCheckout({
            public_key: envData.flutter_wave.test.public_key, // Replace with your public key
            tx_ref: `txref-${Date.now()}`, // Unique transaction reference
            amount: deliveryFee, // Total amount calculated from the cart
            currency: "NGN", // Replace with your currency
            payment_options: "card, banktransfer, ussd", // Payment methods
            meta: {
                source: "NextJS-checkout",
                consumer_mac: "92a3-912ba-1192a",
            },
            customer: {
                email: "customer@example.com", // Replace with actual customer email
                phone_number: "08012345678", // Replace with actual customer phone number
                name: "Customer Name", // Replace with actual customer name
            },
            customizations: {
                title: "Defacto", // Replace with your store's title
                description: "Payment for your delivery package", // Custom description
                logo: envData.logo,
            },
            callback: (data: any) => {
                console.log("Payment callback:", data);
                if (data.status === "successful") {
                    // Handle successful payment here
                    console.log("Payment was successful!", data);
                    // Optionally: You can verify the transaction on the backend here
                } else {
                    console.log("Payment failed or was canceled.");
                }
            },
            onclose: () => {
                console.log("Payment process closed by user.");
            },
        });

        setLoading(false);
    };

    return (
        <div>
            <div className="md:container mx-auto">
                <div className="lg:grid lg:grid-cols-3 gap-x-10 items-start">
                    <div className={`col-span-2 pb-40 lg:px-20`}>
                        <div className={`flex items-center pb-4`}>
                            <BackButton/>
                            <div className="lg:text-3xl text-xl font-bold tracking-tight">
                                {" "}
                                Send Package
                            </div>
                        </div>
                        <div>
                            <ErrorSummary errors={validationErrors}/>
                            <div className="container mx-auto px-4  space-y-4">
                                <div>
                                    <Label className={`text-lg lg:text-2xl font-bold`}>
                                        What do you need to transport ?
                                    </Label>
                                    <Textarea
                                        className="mt-4"
                                        onChange={(e) =>
                                            setPayload({
                                                ...payload,
                                                description: e.target.value,
                                            })
                                        }
                                        placeholder={`briefly describe the item`}
                                        rows={7}
                                        value={payload.description}
                                    />
                                </div>

                                {/* Package Image Uploader */}
                                <div className={`flex justify-start`}>
                                    <PackageImageUploader onImageSelect={handleImageSelect}/>
                                </div>

                                <DeliveryMap
                                    pickupLocation={payload.pickupDetails.address.location}
                                    dropOffLocation={payload.dropOffDetails.address.location}
                                />

                                <div>
                                    <PickupAddress
                                        payload={payload}
                                        setPickModalOpen={setPickModalOpen}
                                        pickModalOpen={pickModalOpen}
                                        handlePickupAddressConfirm={handlePickupAddressConfirm}
                                        getSavedPickupAddress={getSavedPickupAddress}
                                        setPickupAddress={setPickupAddress}
                                    />
                                    <ErrorMessage
                                        validationErrors={validationErrors}
                                        fieldName="pickupDetails.address.address"
                                    />

                                    <div></div>

                                    <DropOffAddress
                                        payload={payload}
                                        setDropOffModalOpen={setDropOffModalOpen}
                                        dropOffModalOpen={dropOffModalOpen}
                                        handleDropOffAddressConfirm={handleDropOffAddressConfirm}
                                        getSavedDropOffAddress={getSavedDropOffAddress}
                                        setDropOffAddress={setDropOffAddress}
                                    />
                                    <ErrorMessage
                                        validationErrors={validationErrors}
                                        fieldName="dropOffDetails.address.address"
                                    />
                                </div>

                                <div>
                                    <Label>Pickup Time</Label>
                                    <DateTimePicker
                                        showTimeSelect={true}
                                        selected={payload.pickupDate}
                                        onSelect={handleDateSelect}
                                    />
                                    <ScheduleTimePicker
                                        selected={payload.pickupDate}
                                        onSelect={handleDateSelect}
                                    />

                                </div>
                            </div>

                            {/*receiver details*/}
                            <ReceiverDetails
                                validationErrors={validationErrors}
                                payload={payload}
                                setPayload={setPayload}
                            />

                            {/*receiver details*/}
                        </div>
                    </div>
                    <section className="sticky top-20 right-5 w-[350px] z-0 hidden lg:block">
                        <Summary
                            distance={distance}
                            deliveryFee={deliveryFee}
                            loading={loading}
                            confirmOrder={confirmOrder}
                            formatPrice={formatPrice}

                        />
                    </section>
                </div>
            </div>
        </div>
    );
}

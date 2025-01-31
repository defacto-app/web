import { EnvelopeOpenIcon } from "@radix-ui/react-icons";
import { Building2Icon, PhoneIcon } from "lucide-react";
import React from "react";

import ContactForm from "./contactForm";

export default function ContactPage() {
	return (
		<div className="relative isolate bg-white">
			<div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
				<div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
					<div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
						<div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2">
							<svg
								className="absolute inset-0 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
								aria-hidden="true"
							>
								<defs>
									<pattern
										id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
										width={200}
										height={200}
										x="100%"
										y={-1}
										patternUnits="userSpaceOnUse"
									>
										<path d="M130 200V.5M.5 .5H200" fill="none" />
									</pattern>
								</defs>
								<rect width="100%" height="100%" strokeWidth={0} fill="white" />
								{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
								<svg x="100%" y={-1} className="overflow-visible fill-gray-50">
									<path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
								</svg>
								<rect
									width="100%"
									height="100%"
									strokeWidth={0}
									fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
								/>
							</svg>
						</div>
						<h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-primary-600">
							Get in touch
						</h2>
						<p className="mt-6 text-lg leading-8 text-gray-600">
							We'd love to hear from you! Get in touch with us using the form
							below or through our contact information.
						</p>
						<dl className="mt-10 space-y-4 text-base leading-7 text-gray-600">
							<div className="flex gap-x-4">
								<dt className="flex-none">
									<span className="sr-only">Address</span>
									<Building2Icon
										className="h-7 w-6 text-gray-400"
										aria-hidden="true"
									/>
								</dt>
								<dd>
									Along Nnebisi Road By Oando F/Station
									<br />
									Asaba, Delta
								</dd>
							</div>
							{/*   <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Telephone</span>
                 <PhoneIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                </dt>
                <dd>
                  <a className="hover:text-gray-900" href="tel:+1 (555) 234-5678">
                    +1 (555) 234-5678
                  </a>
                </dd>
              </div> */}
							<div className="flex gap-x-4">
								<dt className="flex-none">
									<span className="sr-only">Email</span>
									<EnvelopeOpenIcon
										className="h-7 w-6 text-gray-400"
										aria-hidden="true"
									/>
								</dt>
								<dd>
									<a
										className="hover:text-gray-900"
										href="mailto:hello@example.com"
									>
										hello@defactoapp.com.ng
									</a>
								</dd>
							</div>
						</dl>
					</div>
				</div>

        <ContactForm/>

			</div>
		</div>
	);
}

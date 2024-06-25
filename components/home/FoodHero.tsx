import { ChevronRight } from 'lucide-react'
import React from 'react'
import PickupModal from '../user/PickupModal'
import { Button } from '../ui/button'

function FoodHero() {
  return (
    <div>
      <main>
        <div className="bg-gray-900 pt-10 sm:pt-16 lg:overflow-hidden lg:pb-14 lg:pt-8">
          <div className="mx-auto max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8">
              <div className="mx-auto max-w-md px-6 sm:max-w-2xl sm:text-center lg:flex lg:items-center lg:px-0 lg:text-left">
                <div className="lg:py-24">
                  <div className="hidden sm:mb-5 sm:flex sm:justify-center lg:justify-start">
                    <a
                      href="#"
                      className="flex items-center rounded-full bg-black p-1 pr-2 text-white hover:text-gray-200 sm:text-base lg:text-sm xl:text-base"
                    >
                      <span className="rounded-full text-primary-500 px-3 py-0.5 text-sm font-semibold leading-5 ">
                        Order from Restaurant
                      </span>
                      <span className="ml-4 text-sm">Visit our careers page</span>
                      <ChevronRight className="ml-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                    </a>
                  </div>
                  <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:mt-6 xl:text-6xl">
                    <span className="block">Feast your Senses</span>
                    <span className="block text-indigo-400">Fast and Fresh</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                   Enter your address to see what we deliver
                  </p>
                  <div className="mt-10 sm:mt-12">
                    <form action="#" className="sm:mx-auto sm:max-w-xl lg:mx-0">
                      <div className="sm:flex">
                        <div className="min-w-0 flex-1">
                          <label htmlFor="email" className="sr-only">
                            Email address
                          </label>
                          <PickupModal/>
                        </div>
                        <div className="mt-3 sm:ml-3 sm:mt-0">
                          <Button
                          variant="primary"
                            type="submit"
                            className="block w-full rounded-md px-4 py-3 font-medium text-white shadow  focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 focus:ring-offset-gray-900"
                          >
                           Make your order!
                          </Button>
                        </div>
                      </div>

                    </form>
                  </div>
                </div>
              </div>
              <div className="-mb-16 mt-12 sm:-mb-48 lg:relative lg:m-0">
                <div className="mx-auto max-w-md px-6 sm:max-w-2xl lg:max-w-none lg:px-0">
                  {/* Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ */}
                  <img
                    className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                    src="https://tailwindui.com/img/component-images/cloud-illustration-indigo-400.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* More main page content here... */}
      </main>
    </div>
  )
}

export default FoodHero